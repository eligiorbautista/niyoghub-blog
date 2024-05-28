import express from "express";
import { setupControllers } from "../controllers/controllers.js";

export function setupRoutes(app) {
  const router = express.Router();
  const controllers = setupControllers();

  // Send reset password link
  router.post("/reset-password", controllers.sendResetPasswordLink);

  // Update user password
  router.post("/update-password", controllers.updatePassword);

  // Register user
  router.post("/register", controllers.registerUser);

  // Login user
  router.post("/login", controllers.loginUser);

  // User profile
  router.get("/profile", controllers.getUserProfile);

  // Logout user
  router.post("/logout", controllers.logoutUser);

  // Create user's a post
  router.post("/post", controllers.createPost);

  // Get user's posts
  router.get("/post", controllers.getPosts);

  // Get a single user's post
  router.get("/post/:id", controllers.getSinglePost);

  // Update a user's post
  router.put("/post", controllers.updatePost);

  // Delete a user's post
  router.delete("/post/:id", controllers.deletePost);

  app.use(router);
}
