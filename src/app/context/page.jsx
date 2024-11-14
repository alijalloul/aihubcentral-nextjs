"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";

import LoadingDots from "../../components/LoadingDots/LoadingDots.js";

const Context = () => {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContextualizedQuestion = async (e) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/openai/context`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question, url: url }),
      });

      const data = await res.json();

      console.log("data: ", data);

      setAnswer(data.chatResponse);

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
              Ask Questions In Context From Any URL Or Text
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center w-full mb-5 ">
                <span className="mr-5">URL/Text: </span>
                <textarea
                  rows="3"
                  placeholder="e.g. https://www.allrecipes.com/recipe/17481/simple-white-cake"
                  onChange={(e) => {
                    setUrl(e.target.value);
                  }}
                  style={{ scrollbarWidth: "thin " }}
                  className={`w-[80%] rounded-lg px-5 py-2 border-2 border-gray-300 row-auto break-words`}
                ></textarea>
              </div>
              <div className="flex justify-between items-center w-full mb-5">
                <span className="mr-5">Question: </span>
                <textarea
                  rows="3"
                  placeholder="e.g. Give me the ingredients for this recipe and turn them into metric"
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  style={{ scrollbarWidth: "thin " }}
                  className={`w-[80%] rounded-lg px-5 py-2 border-2 border-gray-300 break-words`}
                ></textarea>
              </div>
              <div
                onClick={handleContextualizedQuestion}
                className=" relative w-full h-full px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer"
              >
                <h2 className="relative z-[1] pointer-events-none">Ask</h2>
                <div className="absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgb(234,121,0)] bg-[linear-gradient(45deg,rgba(234,121,0,1)_0%,rgba(236,199,0,1)_34%,rgba(201,0,255,1)_66%,rgba(0,87,255,1)_100%)] bg-[length:300%_300%] bg-left  hover:bg-right hover:rotate-180 transition-all ease-in-out duration-500"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-fit h-max-[40%] mt-3">
            <div
              style={{ scrollbarWidth: "thin" }}
              className="w-full h-full px-5 py-5 flex flex-col border border-3 border-black rounded-md overflow-y-scroll"
            >
              {loading ? (
                <div>
                  <span>Asking the Question</span>
                  <LoadingDots />
                </div>
              ) : (
                <div className="ml-4">{<div>{answer}</div>}</div>
              )}
            </div>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Context;
