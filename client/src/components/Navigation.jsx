import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { FaBars, FaTimes, FaLongArrowAltRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

 
export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-zinc-800">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1 items-center">
                    <Link to="/" className="-m-1.5 p-1.5 flex items-center">
                        <span className="sr-only">NoteKeeper</span>
                        <img className="h-8 w-auto mr-2" src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=500" alt="" />
                        <span className="text-emerald-400 font-semibold text-2xl">NoteKeeper</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <FaBars className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Link to="/" className="text-sm font-semibold leading-6 text-white">
                        Home
                    </Link>
                    <Link to="/my-notes" className="text-sm font-semibold leading-6 text-white">
                        Browse
                    </Link>
                    <Link to="/new-note" className="text-sm font-semibold leading-6 text-white">
                        Create
                    </Link>

                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    <Link
                        to="/logout"
                        className="text-sm font-semibold leading-6 text-white"
                    >
                        Sign out
                    </Link>
                    <FaLongArrowAltRight className="ml-2 text-white mt-1" />

                </div>
            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-zinc-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <div className="flex lg:flex-1 items-center">
                            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
                                <span className="sr-only">NoteKeeper</span>
                                <img className="h-8 w-auto mr-2" src="https://tailwindui.com/img/logos/mark.svg?color=emerald&shade=500" alt="" />
                                <span className="text-emerald-400 font-bold text-2xl">NoteKeeper</span>
                            </Link>
                        </div>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-whit"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <FaTimes className="h-4 w-4 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-emerald-300 hover:text-gray-900"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/my-notes"
                                    className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-emerald-300 hover:text-gray-900"
                                >
                                    Browse
                                </Link>
                                <Link
                                    href="/new-note"
                                    className="-mx-3 block rounded-sm px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-emerald-300 hover:text-gray-900"
                                >
                                    Create
                                </Link>

                            </div>
                            <div className="py-6">
                                <div className="flex items-center gap-1">
                                    <Link
                                        to="/logout"
                                        className="w-screen flex items-center gap-1 -mx-3 block rounded-sm px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-emerald-300 hover:text-gray-900 pr-5"
                                    >
                                        Sign out<FaLongArrowAltRight className="ml-1  " />
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
