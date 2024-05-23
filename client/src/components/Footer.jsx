import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900">
            <div className="w-full mx-auto p-8 md:py-8 bg-zinc-800 p-10">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link
                        to="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <svg className="fill-current h-8 w-8 mr-2 text-emerald-500" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                        </svg>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-400">
                            NoteKeeper
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="#" className="hover:underline me-4 md:me-6 text-white hover:text-emerald-400">
                                About
                            </Link>
                        </li>

                        <li>
                            <Link to="https://www.eligiobautista.site/src/pages/contact.html" className="hover:underline hover:text-emerald-400 text-white">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-4 border-gray-700 sm:mx-auto" />
                <span className="block text-sm text-white sm:text-center dark:text-gray-400">
                    © 2024{' '}
                    <Link to="https://github.com/eligiorbautista" className="hover:underline hover:text-emerald-400 text-white text-sm">
                        Eli Bautista
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer
