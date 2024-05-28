import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_PREFERENCE } from "../constants";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Reset link sent successfully!", TOAST_PREFERENCE);
      } else {
        const data = await response.json();
        toast.error(
          data.message || "Failed to send reset link",
          TOAST_PREFERENCE
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending the reset link",
        TOAST_PREFERENCE
      );
    } finally {
      setLoading(false);
    }
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
          Forgot Password
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

          <div>
            <button
              type="submit"
              className="mt-6 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Send Link
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-gray-900 hover:text-gray-500 ml-1 text-sm"
          >
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
