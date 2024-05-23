import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { TOAST_PREFERENCE } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "../components/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.passwordReset) {
            toast.success("Password changed successfully. Please log in with your new password.", TOAST_PREFERENCE);
        }
        if (location.state && location.state.accountRegistered) {
          toast.success("Hooray! You've successfully registered.", TOAST_PREFERENCE);
      }
    }, [location.state]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/token/`,
        { username, password }
      );
  
      const data = res.data;
      console.log(data);
  
      if (data.access) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        navigate("/");
        toast.success(`Welcome back! ${username}`, TOAST_PREFERENCE);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password.", TOAST_PREFERENCE);
      } else {
        toast.error("Oops! Something went wrong. Please try again later.", TOAST_PREFERENCE);
        console.error(error);
      }
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
          Sign in to NoteKeeper
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
              <div className="text-sm">
                <Link
                  to="/recovery"
                  className=" text-sm font-semibold text-emerald-600 hover:text-emerald-500"
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

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to={"/register"}
            className="font-semibold leading-6 text-gray-900 hover:text-gray-500 ml-1 text-sm "
          >
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
