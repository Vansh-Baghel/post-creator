"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@public/default-profile.webp";
import logo from "@public/Vansh-logo.png";

const Nav = () => {
  const { data: session } = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src={logo}
          alt='logo'
          width={45}
          height={45}
          className='object-contain rounded-full'
        />
        <p className='logo_text text-white'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-post' className='black_btn'>
              Create Post
            </Link>

            <button
              type='button'
              onClick={() => signOut()}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session.image ?? defaultImage}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href='/signIn' className='black_btn'>
              Sign in
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session ? (
          <div className='flex'>
            <Image
              src={session?.image ?? defaultImage}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-post'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href='/signIn' className='black_btn'>
              Sign in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
