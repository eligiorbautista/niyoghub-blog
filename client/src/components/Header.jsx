import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { Dialog } from '@headlessui/react';
import { FaBars, FaTimes, FaLongArrowAltRight } from 'react-icons/fa';

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
  }, [userInfo]);

  const getUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/profile', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.email) {
          setUserInfo(data);
        }
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setUserInfo(null);
        navigate('/login');
        setMobileMenuOpen(false);
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const username = userInfo?.displayName;

  return (
    <header>
      <nav className="p-8 sm:px-10 lg:px-20 xl:px-60 bg-gray-50 mx-auto flex items-center justify-between" aria-label="Global">
        <div className="-m-1.5 p-1.5 flex items-center">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">NiyogHub</span>
            <img className="h-10 w-auto mr-2" src="../../niyoghub.png" alt="NiyogHub Logo" />
            <span className="text-black font-semibold text-xl">NiyogHub</span>
          </Link>

        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {userInfo ? (
            <>
              <span className="text-lg leading-6 text-black mr-10">Welcome, {username && (username.split(' ')[0])}</span>
              <Link to="/create" className="text-sm font-semibold leading-6 text-black mr-4">
                Create post
              </Link>
              <button onClick={logout} className="text-sm font-semibold leading-6 text-black flex items-center">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold leading-6 text-black mr-4 flex items-center">
                Login
              </Link>
              <Link to="/register" className="text-sm font-semibold leading-6 text-black flex items-center">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-50 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <div className="flex lg:flex-1 items-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">NiyogHub</span>
                <img className="h-8 w-auto mr-2" src="../../niyoghub.png" alt="NiyogHub" />
                <span className="text-black font-bold text-xl">NiyogHub</span>
              </Link>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <FaTimes className="h-4 w-4 text-black" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {userInfo ? (
                <>
                  <div className="space-y-2 py-6">
                    <span className="text-lg leading-6 text-black mr-10">Welcome, {username && (username.split(' ')[0])}</span>
                  </div>
                  <div className="space-y-2 py-6">
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to="/create"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-800 hover:text-white"
                    >
                      Create post
                    </Link>
                  </div>
                  <div className="py-6">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-1 -mx-3 block rounded-sm px-3 py-2.5 text-base font-semibold leading-7 text-black hover:bg-gray-800 hover:text-white pr-5"
                    >
                      Logout <FaLongArrowAltRight className="ml-1" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="py-6">
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to="/login"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-800 hover:text-white"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="py-6">
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to="/register"
                      className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-800 hover:text-white"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
