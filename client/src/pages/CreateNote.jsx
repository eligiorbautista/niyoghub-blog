import { useState } from "react";
import { TOAST_PREFERENCE } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access');
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes/`,
        { title, content },
        config
      );

      if (res.status === 200) {
        toast.success("New note created successfully.", TOAST_PREFERENCE);
      } else {
        toast.error("Error occurred while attempting to create note.", TOAST_PREFERENCE);
      }

      setTitle("");
      setContent("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.", TOAST_PREFERENCE);
    }
  };

  return (
    <div>
      <Navigation />

      <div className="h-screen">
        <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-sm shadow-md mb-20 ">
          <h1 className="max-w-2xl text-center bg-zinc-800 text-2xl font-semibold text-white mb-6 py-2 px-5 mt-10 mx-auto lg:rounded-md sm:rounded-sm">
            Create a New Note
          </h1>
          <form onSubmit={createNote} className="space-y-7">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Give your note a descriptive title.
              </p>
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-gray-700 font-medium mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={5}
                required
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-emerald-500"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                Enter the content of your note.
              </p>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-zinc-700 focus:outline-none"
            >
              Save
            </button>
          </form>
        </section>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default CreateNote;
