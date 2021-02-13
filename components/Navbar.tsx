import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/client';
import { useSession } from 'next-auth/client';
import { useState } from 'react';

export interface NavbarMenuProps {
  href: string;
  label: string;
}

export interface NavbarProps {
  menus?: NavbarMenuProps[];
  profileMenus?: NavbarMenuProps[];
  openLogin: () => void;
}

export const Navbar = (props: NavbarProps): JSX.Element => {
  const { menus, profileMenus, openLogin } = props;
  const [session] = useSession();
  const router = useRouter();
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const isCurrent = (href: string) => {
    return router.pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative z-10 flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              className={`${
                menus.length === 0 ? 'hidden' : ''
              } inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* <!-- Icon when menu is closed. -->
          <!--
            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
              <svg
                className={`${
                  isMobileDropdownOpen ? 'hidden' : 'block'
                } h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* <!-- Icon when menu is open. -->
          <!--
            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          --> */}
              <svg
                className={`${
                  !isMobileDropdownOpen ? 'hidden' : 'block'
                } h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <Link href="/">
                <a className="block h-9">
                  <Image
                    src="/images/logo.svg"
                    width="166.4"
                    height="36"
                    alt="JayakornK"
                    priority
                    quality="100"
                  />
                </a>
              </Link>
              {/* <img
                className="block w-auto h-8 lg:hidden"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden w-auto h-8 lg:block"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              /> */}
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                {menus &&
                  menus.map((menu) => (
                    <Link key={`${menu.href}-${menu.label}`} href={menu.href}>
                      <a
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          isCurrent(menu.href)
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {menu.label}
                      </a>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* <!-- Profile dropdown --> */}
            <div className="relative z-10 ml-3">
              {session ? (
                <Menu>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button
                          className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          id="user-menu"
                        >
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="w-8 h-8 rounded-full"
                            width={32}
                            height={32}
                            src={session.user.image}
                            alt={session.user.name}
                            priority
                          />
                        </Menu.Button>
                      </div>
                      {/* <!--
                      Profile dropdown panel, show/hide based on dropdown state.

                      Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                      Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    --> */}
                      <Transition
                        show={open}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg focus:outline-none ring-1 ring-black ring-opacity-5"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          {profileMenus.map((profileMenu) => (
                            <Menu.Item
                              key={`${profileMenu.href}-${profileMenu.label}-profile`}
                            >
                              <Link href={profileMenu.href}>
                                <a
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  role="menuitem"
                                >
                                  {profileMenu.label}
                                </a>
                              </Link>
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            <button
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ) : (
                <button
                  className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={openLogin}
                  type="button"
                >
                  <span className="sr-only">Open user menu</span>
                  {/* <img
                    className="w-8 h-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /> */}
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
      <div className={`${isMobileDropdownOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          {menus &&
            menus.map((menu) => (
              <Link key={`${menu.href}-${menu.label}-mobile`} href={menu.href}>
                <a
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isCurrent(menu.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {menu.label}
                </a>
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  profileMenus: [
    // { label: 'Your Profile', href: '/' },
    // { label: 'Settings', href: '/' },
  ],
};
