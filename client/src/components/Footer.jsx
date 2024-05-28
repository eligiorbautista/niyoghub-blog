import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 ">
            <div className="w-full mx-auto md:py-5 bg-gray-50 p-8 sm:px-10 lg:px-20 xl:px-60 ">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link
                        to="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <img className="h-10 w-auto" src="../../niyoghub.png" alt="NiyogHub" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                            NiyogHub
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="/about" className="hover:underline me-4 md:me-6 text-sm font-semibold leading-6 text-black hover:text-black">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-4 border-gray-700 sm:mx-auto" />
                <span className="mt-6 block text-sm text-black sm:text-center dark:text-gray-400">
                    NiyogHub Team © 2024. All rights reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer
