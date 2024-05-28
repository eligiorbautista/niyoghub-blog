import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TOAST_PREFERENCE } from "../constants";
import Loader from "../components/Loader";

const PasswordRecovery = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { storedToken } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", TOAST_PREFERENCE);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/update-password", {
        method: "POST",
        body: JSON.stringify({
          newPassword,
          token: storedToken,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      navigate("/login", { state: { passwordReset: true } });
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(
        "An error occurred. Please try again later.",
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
          className="mx-auto h-20 w-auto"
          src="../../niyoghub.png"
          alt="NiyogHub Logo"
        />
        {loading && <Loader />}
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Password Recovery
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 p-2"
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm New Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Re-enter your new password"
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
              Reset Password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PasswordRecovery;
