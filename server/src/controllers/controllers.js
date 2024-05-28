import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import fs from "fs";
import {
  sendRegistrationEmail,
  sendResetPasswordEmail,
} from "../utils/SendEmail.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import multer from "multer";

const secret = process.env.JWT_SECRET || "1234";

const uploadMiddleWare = multer({ dest: "src/uploads/" });

export function setupControllers() {
  return {
    registerUser: async (req, res) => {
      const { displayName, email, password } = req.body;

      try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(409).json({ message: "Email already exists" });
        }

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
          displayName,
          email,
          password: hashedPassword,
        });

        sendRegistrationEmail(email, displayName);

        res.status(201).json(user);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
    },

    loginUser: async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(409).json({ message: "Email not registered" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          jwt.sign(
            { id: user.id, displayName: user.displayName, email },
            secret,
            { algorithm: "HS256" },
            (err, token) => {
              if (err) {
                return res.status(500).json({
                  message: "Token generation failed",
                  error: err.message,
                });
              }
              res.cookie("token", token).json({
                id: user.id,
                email: user.email,
              });
            }
          );
        } else {
          return res
            .status(401)
            .json({ message: "Invalid username or password" });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      }
    },

    sendResetPasswordLink: async (req, res) => {
      const { email } = req.body;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetLink = `http://localhost:5173/recovery/${resetToken}`;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires =
          Date.now() + 3600000; /* 1 hour expiration */

        await user.save();

        sendResetPasswordEmail(email, resetLink);

        res
          .cookie("emailToReset", email)
          .status(200)
          .json({ message: "Reset link sent successfully" });
      } catch (error) {
        console.error("Error sending reset link:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    },

    updatePassword: async (req, res) => {
      const { newPassword, token } = req.body;
      const emailToReset = req.cookies.emailToReset;

      try {
        const user = await User.findOne({ email: emailToReset });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        if (user.resetPasswordToken !== token) {
          return res.status(404).json({ message: "Invalid or expired token" });
        }

        if (Date.now() > user.resetPasswordExpires) {
          return res.status(401).json({ message: "Token expired" });
        }

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res
          .cookie("emailToReset", "")
          .status(200)
          .json({ message: "Password updated successfully" });
      } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    },

    getUserProfile: async (req, res) => {
      const { token } = req.cookies;
      jwt.verify(token, secret, {}, (err, info) => {
        if (err)
          return res.status(401).json({ message: "Unauthorized access" });
        res.json(info);
      });
    },

    logoutUser: async (req, res) => {
      res.clearCookie("token");
      res.json({ message: "Logged out successfully" });
    },

    createPost: async (req, res) => {
      uploadMiddleWare.single("file")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res
            .status(500)
            .json({ message: "File upload error", error: err.message });
        } else if (err) {
          return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
        }

        const { file } = req;
        if (!file) {
          return res.status(400).json({ message: "File is missing" });
        }

        const { originalname, path } = file;
        const filename = originalname.split(".");
        const extension = filename[filename.length - 1];
        const newPath = path + "." + extension;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
          if (err)
            return res.status(401).json({ message: "Unauthorized access" });
          const { title, summary, content } = req.body;
          try {
            const post = await Post.create({
              title,
              summary,
              content,
              cover: newPath.replace(/\\/g, "/"),
              author: info.id,
            });
            res.status(201).json(post);
          } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ message: "Internal server error" });
          }
        });
      });
    },

    getPosts: async (req, res) => {
      try {
        const posts = await Post.find()
          .populate("author", "displayName")
          .sort({ createdAt: -1 })
          .limit(9);
        res.json(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    },

    getSinglePost: async (req, res) => {
      const { id } = req.params;
      const post = await Post.findById(id).populate("author", "displayName");
      res.json(post);
    },

    updatePost: async (req, res) => {
      uploadMiddleWare.single("file")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res
            .status(500)
            .json({ message: "File upload error", error: err.message });
        } else if (err) {
          return res
            .status(500)
            .json({ message: "Internal server error", error: err.message });
        }

        let newPath = null;
        if (req.file) {
          const { originalname, path } = req.file;
          const filename = originalname.split(".");
          const extension = filename[filename.length - 1];
          newPath = path + "." + extension;
          fs.renameSync(path, newPath);
        }

        const { token } = req.cookies;
        jwt.verify(token, secret, {}, async (err, info) => {
          if (err)
            return res.status(401).json({ message: "Unauthorized access" });

          const { id, title, summary, content } = req.body;
          try {
            const post = await Post.findById(id);
            if (!post) {
              return res.status(404).json({ message: "Post not found" });
            }
            const isAuthor =
              JSON.stringify(post.author) === JSON.stringify(info.id);
            if (!isAuthor) {
              return res.status(403).json({ message: "Unauthorized access" });
            }

            post.title = title;
            post.summary = summary;
            post.content = content;
            if (newPath) {
              post.cover = newPath.replace(/\\/g, "/");
            }

            const updatedPost = await post.save();
            res.json(updatedPost);
          } catch (error) {
            console.error("Error updating post:", error);
            res.status(500).json({ message: "Internal server error" });
          }
        });
      });
    },

    deletePost: async (req, res) => {
      const { token } = req.cookies;
      jwt.verify(token, secret, {}, async (err, info) => {
        if (err)
          return res.status(401).json({ message: "Unauthorized access" });

        const { id } = req.params;
        try {
          const post = await Post.findById(id);
          if (!post) {
            return res.status(404).json({ message: "Post not found" });
          }
          const isAuthor =
            JSON.stringify(post.author) === JSON.stringify(info.id);
          if (!isAuthor) {
            return res.status(403).json({ message: "Unauthorized access" });
          }

          await Post.deleteOne({ _id: id });
          res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
          console.error("Error deleting post:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      });
    },
  };
}
