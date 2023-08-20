'use client';
import { useEffect, useState, useRef } from "react";
import { Collapse } from "flowbite";
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation'
import type { CollapseOptions, CollapseInterface } from "flowbite";
import Link from "next/link";
import { useMsAccountStore, usePlayerStore } from "@/app/(store)/store";
/*
* $targetEl: required
* $triggerEl: optional
* options: optional
*/

function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [ source ] = usePlayerStore(state => [state.source])
  const [ msName, msAvatar ] = useMsAccountStore(state => [state.name, state.avatar])
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const menuRef = useRef<CollapseInterface>()
  useEffect(() => {
    // optional options with default values and callback functions
    const options: CollapseOptions = {
      onCollapse: () => {
        console.log('element has been collapsed')
      },
      onExpand: () => {
        console.log('element has been expanded')
        // show the target element
        // collapse.expand();
      },
      onToggle: () => {
        console.log('element has been toggled')
      }
    };
    // set the target element that will be collapsed or expanded (eg. navbar menu)
    const $targetEl = document.getElementById('mobile-menu');
    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = document.getElementById('triggerEl');
    const collapse: CollapseInterface = new Collapse($targetEl, $triggerEl)//, options)
    menuRef.current = collapse
  }, [])
  useEffect(() => {
    if (session) {
      const url = session.user?.image
      if (url) {
        setAvatarUrl(url)
      }
    }
  }, [session])

  const closeMenu = () => {
    menuRef.current?.toggle()
  }
  let name
  let avatarSrc = ''
  if (pathname.indexOf('/baidu') === 0 || source === 'baidu') {
    name = session?.user?.name
    const url = session?.user?.image
    if (url) {
      avatarSrc = url
    }
  }
  if (pathname.indexOf('/onedrive') === 0 || source === 'onedrive') {
    name = msName
    if (msAvatar) {
      avatarSrc = URL.createObjectURL(msAvatar)
    }
  }
  const avatar = <button type="button" className={`${session ? 'block' : 'hidden'} flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`} id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
    <span className="sr-only">Open user menu</span>
    { avatarSrc ? <img className="w-8 h-8 rounded-full" src={avatarSrc} alt="user photo" /> : null}
  </button>
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 flex-shrink-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href={ process.env.NEXT_PUBLIC_HOST } className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cloud Player</span>
        </a>
        <div className="flex items-center md:order-2">
          {avatar}
          <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
              {/* <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span> */}
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>
          <button id='triggerEl' data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link onClick={closeMenu} href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link onClick={closeMenu} href="/about" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header