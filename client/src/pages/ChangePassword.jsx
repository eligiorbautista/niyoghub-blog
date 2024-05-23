import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { TOAST_PREFERENCE } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import axios from "axios";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const validPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", TOAST_PREFERENCE);
      setLoading(false);
      return;
    }

    if (!validPassword) {
      toast.error(
        "Password must be at least 8 characters long and contain both letters and numbers.",
        TOAST_PREFERENCE
      );
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/password-reset-confirm/?uid=${uid}&token=${token}`,
        { new_password: password }
      );
      const data = res.data;
      console.log(data);
      if (data.message) {
        navigate("/login", { state: { passwordReset: true } });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.error) {
          toast.error(`Error: ${errorData.error}. ${errorData.details}`, TOAST_PREFERENCE);
        } else {
          toast.error("Oops! Something went wrong. Please try again later.", TOAST_PREFERENCE);
        }
      } else {
        toast.error("Oops! Something went wrong. Please try again later.", TOAST_PREFERENCE);
      }
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
          Change Password
        </h2>
        <p className="mx-1 mt-4 text-center text-sm text-gray-500">
          -
        </p>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
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
                Confirm New Password
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
              Reset password
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

export default ChangePassword;
