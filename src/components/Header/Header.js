"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import AllKnowing from "@/public/images/allKnowing.png";

const Header = () => {
  const directories = [
    { name: "Home", path: "/" },
    { name: "Chat", path: "/chat" },
    {
      name: "Create Image",
      path: "/createImage",
    },
    { name: "Summarize", path: "/summarize" },
    { name: "Translate", path: "/translate" },
    { name: "Context", path: "/context" },
  ];

  const [showNav, setShowNav] = useState(false);

  const excludedDivRef = useRef(null);

  const handleNavSwitchState = () => {
    if (showNav) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        excludedDivRef.current &&
        !excludedDivRef.current.contains(event.target)
      ) {
        setShowNav(false);
      }
    }

    if (showNav) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showNav]);
  return (
    <header className="w-full flex justify-center items-center border-b border-b-[#e6ebf4] px-10 sm:px-5">
      <div className="w-full mx-4 my-4 flex justify-between items-center sm:mx-2">
        <div className="flex justify-center items-center">
          <h1 className=" font-bold text-3xl mr-5 sm:w-min">AI Hub Central</h1>
          <Link href="/">
            <Image
              alt="N/A"
              src={AllKnowing}
              className="w-[40px] aspect-square"
            />
          </Link>
        </div>

        <div className="relative w-fit flex justify-center items-center rounded-lg sm:hidden">
          <div
            className={`absolute bg-black h-full rounded-lg transition-all ease-in-out duration-500`}
          ></div>

          {directories.map((directory, index) => (
            <NavButton
              key={index}
              href={directory.path}
              text={directory.name}
            />
          ))}
        </div>

        <div ref={excludedDivRef} className="hidden sm:visible sm:block">
          <Hamburger action={handleNavSwitchState} showNav={showNav} />

          <div
            className={`${
              showNav ? "w-[50%]" : " w-0"
            } fixed flex justify-center items-center overflow-hidden item z-10 top-[50vh] transform translate-y-[-50%] h-[100vh] right-0 bg-slate-300 transition-all ease-in-out duration-200`}
          >
            <div className="relative flex justify-center items-center w-full h-max">
              <div className="w-full flex flex-col justify-center items-center ">
                {directories.map((directory, index) => (
                  <MobileNavButton
                    key={index}
                    href={directory.path}
                    text={directory.name}
                    showNav={showNav}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

const NavButton = ({ href, text }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${pathname === href && "text-white bg-black"} 
    
      px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium `}
    >
      {text}
    </Link>
  );
};

const MobileNavButton = ({ href, text, showNav }) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`${pathname === href && "text-white bg-black"} ${
        showNav ? "left-0" : "left-[200px]"
      } w-full py-3 relative z-10 h-fit font-medium text-center transition-all ease-in-out duration-[200ms]`}
    >
      {text}
    </Link>
  );
};

const Hamburger = ({ action, showNav }) => {
  return (
    <button
      onMouseUp={action}
      className="relative z-20 flex flex-col justify-evenly items-center aspect-square w-14 border-4 border-black"
    >
      <div
        className={` w-[80%] h-1 bg-black rounded-lg transition-all ease-in-out duration-200 ${
          showNav
            ? "transform rotate-[45deg] translate-x-[0] translate-y-[13px]"
            : "transform translate-x-0 opacity-1"
        }`}
      ></div>
      <div
        className={` w-[80%] h-1 bg-black rounded-lg transition-all ease-in-out duration-200 ${
          showNav
            ? "transform translate-x-[-50%] opacity-0"
            : "transform translate-x-0 opacity-1"
        }`}
      ></div>
      <div
        className={` w-[80%] h-1 bg-black rounded-lg transition-all ease-in-out duration-200 ${
          showNav
            ? "transform rotate-[-45deg] translate-x-[0] translate-y-[-13px]"
            : "transform translate-x-0 opacity-1"
        }`}
      ></div>
    </button>
  );
};
