import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_PREFERENCE } from "../constants";
import { UserContext } from "../components/UserContext";
import Loader from "../components/Loader";
import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons/fa

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.passwordReset) {
      toast.success(
        "Password changed successfully. Please log in with your new password.",
        TOAST_PREFERENCE
      );
    }
    if (location.state?.accountRegistered) {
      toast.success(
        "Hooray! You've successfully registered.",
        TOAST_PREFERENCE
      );
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        toast.success("Login successful!", TOAST_PREFERENCE);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        const data = await response.json();
        toast.error(data.message, TOAST_PREFERENCE);
      }
    } catch (error) {
      toast.error(error.message, TOAST_PREFERENCE);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info(
      "Google login is not available at the moment.",
      TOAST_PREFERENCE
    );
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto "
          src="../../niyoghub.png"
          alt="NiyogHub Logo"
        />
        {loading && <Loader />}
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to NiyogHub
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="mt-6 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          <FaGoogle className="mr-2 mt-1" /> Sign in with Google
        </button>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?
          <Link
            to={"/register"}
            className="font-semibold leading-6 text-gray-900 hover:text-gray-500 ml-1 text-sm"
          >
            Register
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
