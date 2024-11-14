"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";

import useIsVisible from "../functions/useIsVisible";

const Home = () => {
  const excludedDivRef = useRef(null);
  const [expandFunctions, setExpandFunctions] = useState(false);

  const [headerText, setHeaderText] = useState("");
  const text =
    "AI Hub Central is a platform that brings together multiple AI technologies, making it easy for users to explore and implement AI in their projects for free and without the need to login.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setHeaderText(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
      }
    }, 3000 / text.length);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    // Event listener for clicks outside of the excluded div
    function handleClickOutside(event) {
      if (
        excludedDivRef.current &&
        !excludedDivRef.current.contains(event.target)
      ) {
        setExpandFunctions(false);
      }
    }

    // Add event listener when component mounts
    if (expandFunctions) {
      window.addEventListener("click", handleClickOutside);
    }

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [expandFunctions]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 flex flex-col justify-between items-center my-5 mx-10"
      >
        <div className="flex  items-start flex-col w-full sm:mb-5">
          <h2 className="text-6xl mt-5 sm:text-6xl sm:text-6xl font-bold mb-10 ">
            Welcome to AI Hub Central
          </h2>

          <h2 className="text-4xl mt-5 sm:text-5xl leading-[1.2] sm:text-4xl">
            {headerText}
          </h2>
        </div>

        <div className="w-full flex justify-between items-center sm:flex-col sm:space-y-4">
          <HomeCard type={1} />
          <HomeCard type={2} />
          <HomeCard type={3} />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Home;

const HomeCard = ({ type }) => {
  let bgColor, borderColor, title, description;

  switch (type) {
    case 1:
      bgColor = "bg-green-500";
      borderColor = "border-green-500";
      title = "Start Chatting";
      description =
        "Experience the GPT-4o model for free! Seamlessly import your chats from yourOpenAI account and organize your ideas with the ability to create multiple chat threads.";
      break;
    case 2:
      bgColor = "bg-purple-500";
      borderColor = "border-purple-500";
      title = "Generate Images";
      description =
        "Unleash your creativity with the GPT-4o model! Generate stunning images effortlessly and explore endless possibilities.";
      break;
    case 3:
      bgColor = "bg-orange-500";
      borderColor = "border-orange-500";
      title = "Summarize Articles";
      description =
        "Transform lengthy articles into concise summaries! Enter a text or website link, and let the GPT-4o model simplify your reading experience.";
      break;
    default:
      return null; // Handle the default case if needed
  }

  return (
    <Link
      href={type === 1 ? "/chat" : type === 2 ? "/createImage" : "/summarize"}
      className={`flex justify-start items-center flex-col w-[30%] h-[300px] sm:w-full bg-white rounded shadow-lg border-2 ${borderColor} group relative transition-all p-0 hover:p-6`}
    >
      <div
        className={`w-full h-[300px] flex justify-center items-center text-2xl px-10 py-4 ${bgColor} text-white font-semibold rounded transition-all group-hover:mb-6 group-hover:h-[100px] group-hover:w-[95%]`}
      >
        {title}
      </div>

      <p className="h-0 leading-8 overflow-hidden text-xl transition-all group-hover:h-[500px]">
        {description}
      </p>
    </Link>
  );
};
