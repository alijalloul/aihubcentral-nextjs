"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";

import LoadingDots from "../../components/LoadingDots/LoadingDots.js";

const SummarizeURL = () => {
  const MAX_WORDS = 4000;

  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [words, setWords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(1);

  const handleChange = (e) => {
    setUrl(e.target.value);
    setWords(e.target.value.split(" ").length - 1);
  };

  const handleSummarize = async (e) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/openai/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await res.json();

      setSummary(data.chatResponse);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-fit min-h-[calc(100vh-73px)] flex justify-center"
      >
        <div className="w-[40%] h-full mt-0 flex flex-col items-center mb-10 sm:w-[80%]">
          <div className="w-full">
            <div
              style={{ textOverflow: "word-break" }}
              className=" text-6xl mb-5 leading-[5rem] sm:text-5xl"
            >
              <span className="inline-block bg-[rgb(255,132,0)] bg-[linear-gradient(45deg,rgba(255,132,0,1)_0%,rgba(255,215,0,1)_100%)] bg-clip-text text-transparent font-bold">
                Summarize &nbsp;{" "}
              </span>
              <span className="inline-block">any &nbsp; </span>
              <span className="bg-[rgb(16,120,252)] bg-[linear-gradient(45deg,rgba(16,120,252,1)_0%,rgba(149,0,255,1)_100%)] bg-clip-text text-transparent font-bold">
                Article &nbsp;{" "}
              </span>
              <span className="inline-block">from &nbsp; </span>
              <span className="inline-block">a &nbsp; </span>
              <span className="inline-block">URL &nbsp; </span>
              <span className="inline-block">using &nbsp; </span>
              <span className="inline-block text-[#1abb98] font-bold">
                CHAT-GPT &nbsp;{" "}
              </span>
            </div>
            <div className="flex">
              <div className=" relative w-[80%] mr-5 py-2 px-2 rounded-md border-2 border-gray-300 items-center">
                <textarea
                  rows="1"
                  placeholder="e.g. https://en.wikipedia.org/wiki/Deer"
                  onChange={(e) => {
                    handleChange(e);
                    e.target.rows = 1;
                    e.target.rows = rows;
                    setRows(
                      e.target.scrollHeight / 24 > 6
                        ? 6
                        : e.target.scrollHeight / 24
                    );
                  }}
                  style={{ scrollbarWidth: "none " }}
                  className={`${
                    rows === 6 ? "overflow-y-scroll" : "overflow-hidden"
                  } w-[80%] h-auto ml-5 mb-5 overflow-scroll whitespace-pre-wrap border-none outline-none resize-none `}
                ></textarea>
                <div className="absolute bottom-0 right-0 mr-2 mb-2 opacity-50">
                  {words}/{MAX_WORDS}
                </div>
              </div>
              <div
                onClick={handleSummarize}
                className=" relative w-fit h-full px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer"
              >
                <h2 className="relative z-[1] pointer-events-none">
                  Summarize
                </h2>
                <div className="absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgb(234,121,0)] bg-[linear-gradient(45deg,rgba(234,121,0,1)_0%,rgba(236,199,0,1)_34%,rgba(201,0,255,1)_66%,rgba(0,87,255,1)_100%)] bg-[length:300%_300%] bg-left  hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-fit h-max-[40%] mt-3">
            <div className="w-full h-full px-5 py-2 flex flex-col border border-3 border-black rounded-md overflow-y-scroll">
              <div className="text-xl mb-2">Summary: </div>
              {loading ? (
                <div>
                  <span>Summarizing Article</span>
                  <LoadingDots />
                </div>
              ) : (
                <div className="ml-4">{<div>{summary}</div>}</div>
              )}
            </div>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default SummarizeURL;
