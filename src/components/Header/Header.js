"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import decode from "jwt-decode";

import { logout } from "../../app/GlobalRedux/User.js";
import AllKnowing from "../../img/allKnowing.png";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const [leftPosition, setLeftPosition] = useState(0);
  const [topPosition, setTopPosition] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [user, setUser] = useState(
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("profile"))
  );

  const homeBtnRef = useRef(null);
  const createImageBtnRef = useRef(null);
  const chatBtnRef = useRef(null);
  const tsstBtnRef = useRef(null);
  const summarizeBtnRef = useRef(null);
  const translateBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const contextBtnRef = useRef(null);

  const excludedDivRef = useRef(null);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime())
        logout(router, dispatch);
    }

    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("profile")));
    }

    if (pathname === "/") {
      setLeftPosition(0);
      setTopPosition(48 * 0);
      setButtonWidth(homeBtnRef.current.getBoundingClientRect().width);
    } else if (pathname === "/chatBot") {
      setLeftPosition(chatBtnRef.current.offsetLeft);
      setTopPosition(48 * 1);
      setButtonWidth(chatBtnRef.current.getBoundingClientRect().width);
    } else if (pathname === "/createImage") {
      setLeftPosition(createImageBtnRef.current.offsetLeft);
      setTopPosition(48 * 2);
      setButtonWidth(createImageBtnRef.current.getBoundingClientRect().width);
      console.log("hello");
    } else if (pathname === "/summarizeURL") {
      setLeftPosition(summarizeBtnRef.current.offsetLeft);
      setTopPosition(48 * 3);
      setButtonWidth(summarizeBtnRef.current.getBoundingClientRect().width);
    } else if (pathname === "/translator") {
      setLeftPosition(translateBtnRef.current.offsetLeft);
      setTopPosition(48 * 4);
      setButtonWidth(translateBtnRef.current.getBoundingClientRect().width);
    } else if (pathname === "/context") {
      setLeftPosition(contextBtnRef.current.offsetLeft);
      setTopPosition(48 * 5);
      setButtonWidth(contextBtnRef.current.getBoundingClientRect().width);
    } else if (pathname === "/TSST") {
      setLeftPosition(tsstBtnRef.current.offsetLeft);
      setTopPosition(48 * 6);
      setButtonWidth(tsstBtnRef.current.getBoundingClientRect().width);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function handleResize() {
      if (pathname === "/") {
        setLeftPosition(0);
        setTopPosition(48 * 0);
        setButtonWidth(homeBtnRef.current.getBoundingClientRect().width);
      } else if (pathname === "/chatBot") {
        setLeftPosition(chatBtnRef.current.offsetLeft);
        setTopPosition(48 * 1);
        setButtonWidth(chatBtnRef.current.getBoundingClientRect().width);
      } else if (pathname === "/createImage") {
        setLeftPosition(createImageBtnRef.current.offsetLeft);
        setTopPosition(48 * 2);
        setButtonWidth(createImageBtnRef.current.getBoundingClientRect().width);
      } else if (pathname === "/summarizeURL") {
        setLeftPosition(summarizeBtnRef.current.offsetLeft);
        setTopPosition(48 * 3);
        setButtonWidth(summarizeBtnRef.current.getBoundingClientRect().width);
      } else if (pathname === "/translator") {
        setLeftPosition(translateBtnRef.current.offsetLeft);
        setTopPosition(48 * 4);
        setButtonWidth(translateBtnRef.current.getBoundingClientRect().width);
      } else if (pathname === "/context") {
        setLeftPosition(contextBtnRef.current.offsetLeft);
        setTopPosition(48 * 5);
        setButtonWidth(contextBtnRef.current.getBoundingClientRect().width);
      } else if (pathname === "/TSST") {
        setLeftPosition(tsstBtnRef.current.offsetLeft);
        setTopPosition(48 * 6);
        setButtonWidth(tsstBtnRef.current.getBoundingClientRect().width);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout(router, dispatch);
    setUser(null);
  };

  const handleLocationChange = () => {};
  const handleNavSwitchState = () => {
    if (showNav) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  };

  useEffect(() => {
    // Event listener for clicks outside of the excluded div
    function handleClickOutside(event) {
      if (
        excludedDivRef.current &&
        !excludedDivRef.current.contains(event.target)
      ) {
        setShowNav(false);
        console.log("cat");
      }
    }

    // Add event listener when component mounts
    if (showNav) {
      window.addEventListener("click", handleClickOutside);
    }

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showNav]);
  return (
    <header className="w-full h-fit min-h-[73px] flex justify-center items-center flex-col bg-white border-b border-b-[#e6ebf4] md:min-h-[100px] md:px-5">
      <div className="w-full h-fit px-4 py-4 flex justify-between items-center md:px-2">
        <div className="flex justify-center items-center">
          <h1 className=" font-bold text-3xl mr-5 md:w-min">AI Hub Central</h1>
          <Link
            href="/"
            onClick={() => {
              setLeftPosition(0);
              setTopPosition(0);
              setButtonWidth(homeBtnRef.current.getBoundingClientRect().width);
            }}
          >
            <Image
              alt="N/A"
              src={AllKnowing}
              className="w-[40px] aspect-square"
            />
          </Link>
        </div>

        <div className="relative w-fit flex justify-center items-center rounded-lg md:hidden">
          <div
            style={{ left: leftPosition, width: buttonWidth }}
            className={`absolute bg-black h-full rounded-lg transition-all ease-in-out duration-500`}
          ></div>
          <Link
            href="/"
            ref={homeBtnRef}
            onClick={(e) => {
              setLeftPosition(e.target.offsetLeft);
            }}
            className={`${
              pathname === "/" && "text-white"
            } px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}
          >
            Home
          </Link>
          <Link
            href="/chatBot"
            ref={chatBtnRef}
            onClick={(e) => {
              setLeftPosition(e.target.offsetLeft);
            }}
            className={`${
              pathname === "/chatBot" && "text-white"
            } px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}
          >
            Chat
          </Link>
          <Link
            href="/createImage"
            ref={createImageBtnRef}
            onClick={(e) => {
              setLeftPosition(e.target.offsetLeft);
            }}
            className={`${
              pathname === "/createImage" && "text-white"
            } px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}
          >
            Create Image
          </Link>
          <Link
            href="/summarizeURL"
            ref={summarizeBtnRef}
            onClick={(e) => {
              setLeftPosition(e.target.offsetLeft);
            }}
            className={`${
              pathname === "/summarizeURL" && "text-white"
            } px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}
          >
            Summarize
          </Link>
          <Link
            href="/translator"
            ref={translateBtnRef}
            onClick={(e) => {
              setLeftPosition(e.target.offsetLeft);
            }}
            className={`${
              pathname === "/translator" && "text-white"
            } px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}
          >
            Translate
          </Link>
          <Link
            href="/context"
            ref={contextBtnRef}
            onClick={(e) => {
              setLeftPosition(e.target.offsetLeft);
            }}
            className={`${
              pathname === "/context" && "text-white"
            } px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}
          >
            Ask From Context
          </Link>
          {
            // (user) ? (
            //   <div className="flex">
            //       <button onClick={ handleLogout } className="font-medium bg-[rgb(217,217,217)] text-black px-4 py-2 rounded-md mr-2"></button>
            //       <Image alt="N/A" src={user?.result?.picture} alt={user?.result?.name} className=" rounded-full w-10"/>
            //   </div>
            // ) : (
            //   <Link href="/auth" ref={loginBtnRef} onClick={(e) => {setLeftPosition(e.target.offsetLeft); setButtonWidth(e.target.getBoundingClientRect().width); }} className={`${(subdomain === "auth")    && ("text-white")} px-5 py-3 relative z-10 h-fit mr-5 rounded-lg font-medium text-center transition-all ease-in-out`}>Login</Link>
            // )
          }
        </div>

        <div ref={excludedDivRef} className="hidden md:visible md:block">
          <button
            onMouseUp={handleNavSwitchState}
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

          <div
            className={`${
              showNav ? "w-[50%]" : " w-0"
            } fixed flex justify-center items-center overflow-hidden item z-10 top-[50vh] transform translate-y-[-50%] h-[100vh] right-0 bg-slate-300 transition-all ease-in-out duration-200`}
          >
            <div className="relative flex justify-center items-center w-full h-max">
              <div
                style={{ top: topPosition, width: "100%" }}
                className={`absolute bg-black h-[14%] transition-all ease-in-out duration-500`}
              ></div>
              <div className="w-full flex flex-col justify-center items-center ">
                <Link
                  href="/"
                  onClick={(e) => {
                    setTopPosition(e.target.offsetTop);
                  }}
                  className={`${pathname === "/" && "text-white"} ${
                    showNav ? "left-0" : "left-[100px]"
                  } w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[100ms]`}
                >
                  Home
                </Link>
                <Link
                  href="/chatBot"
                  onClick={(e) => {
                    setTopPosition(e.target.offsetTop);
                  }}
                  className={`${pathname === "/chatBot" && "text-white"} ${
                    showNav ? "left-0" : "left-[200px]"
                  } w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[200ms]`}
                >
                  Chat
                </Link>
                <Link
                  href="/createImage"
                  onClick={(e) => {
                    setTopPosition(e.target.offsetTop);
                  }}
                  className={`${pathname === "/createImage" && "text-white"} ${
                    showNav ? "left-0" : "left-[300px]"
                  } w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[300ms]`}
                >
                  Create Image
                </Link>
                <Link
                  href="/summarizeURL"
                  onClick={(e) => {
                    setTopPosition(e.target.offsetTop);
                  }}
                  className={`${pathname === "/summarizeURL" && "text-white"} ${
                    showNav ? "left-0" : "left-[400px]"
                  } w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[400ms]`}
                >
                  Summarize
                </Link>
                <Link
                  href="/translator"
                  onClick={(e) => {
                    setTopPosition(e.target.offsetTop);
                  }}
                  className={`${pathname === "/translator" && "text-white"} ${
                    showNav ? "left-0" : "left-[500px]"
                  } w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[500ms]`}
                >
                  Translate
                </Link>
                <Link
                  href="/context"
                  onClick={(e) => {
                    setTopPosition(e.target.offsetTop);
                  }}
                  className={`${pathname === "/context" && "text-white"} ${
                    showNav ? "left-0" : "left-[600px]"
                  } w-full py-3 relative z-10 h-fit rounded-lg font-medium text-center transition-all ease-in-out duration-[600ms]`}
                >
                  Context
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative w-ful px-40 bg-yellow-100 md:px-10 md:py-2"
        style={{ display: showWarning ? "static" : "none" }}
      >
        <button
          onClick={() => setShowWarning(false)}
          className="absolute right-0 mr-5"
        >
          x
        </button>
        <p className=" opacity-75">
          Hello and welcome to aihubcentral.org. Thanks for taking interest in
          this project. This website utilizes the free tier of the openAI API
          and the Render server deployment, therefore you might expreience some
          prolonged loading screens because of the limited API requests
          available as of now. Please try again at a later time. Thanks.
        </p>
      </div>
    </header>
  );
};

export default Header;
