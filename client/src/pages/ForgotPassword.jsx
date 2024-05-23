import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TOAST_PREFERENCE } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/password-reset/`, { username }); // Ensure username is being sent
      const data = res.data;
      console.log(data);
      if (data.message) {
        toast.success("Link sent successfully.", TOAST_PREFERENCE);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again later.", TOAST_PREFERENCE);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto "
          src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=400"
          alt="tail-wind-logo"
        />
        {loading && <Loader />}
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot password?
        </h2>
        <p className="mx-1 mt-4 text-center text-sm text-gray-500">
          Please enter your username and we'll send you a link to reset your password.
        </p>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Send
            </button>
          </div>
          <Link
            to={"/login"}
            className="mt-4 flex w-full justify-center rounded-md border border-gray-900 px-2 p-1 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-800 hover:border-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Back to sign in
          </Link>
        </form>

      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
