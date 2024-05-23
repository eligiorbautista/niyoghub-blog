import { useState, useEffect, useLocation } from "react";
import { useNavigate, Link, Form, Navigate } from "react-router-dom";
import { TOAST_PREFERENCE } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../components/Loader";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);


  const doPasswordsMatch = (password, confirmPassword) => password === confirmPassword;;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validEmail = validateEmail(username);
    const validPassword = validatePassword(password);
    const passwordsMatch = doPasswordsMatch(password, confirmPassword);

    if (!validEmail) {
      toast.error("Please enter a valid email address.", TOAST_PREFERENCE);
      return;
    }

    if (!validPassword) {
      toast.error(
        "Password must be at least 8 characters long and contain both letters and numbers.",
        TOAST_PREFERENCE
      );
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match.", TOAST_PREFERENCE);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('access');
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register/`,
        { username, password },
        config
      );

      if (res.data.status === 201) {

        navigate("/login", { state: { accountRegistered: true } });

      } else if (res.data.status === 409) {
        toast.error("Email address is already registered.", TOAST_PREFERENCE);
      }

    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again later.", TOAST_PREFERENCE);
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
          Sign up to NoteKeeper
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="email"
                autoComplete="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="current-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to={"/login"}
            className="font-semibold leading-6 text-gray-900 hover:text-gray-500 ml-1 text-sm "
          >
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
