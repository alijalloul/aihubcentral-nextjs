'use client';

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { LazyMotion, domAnimation, m } from "framer-motion";

import LoadingDots from '../components/LoadingDots/LoadingDots';

import useIsVisible from '../functions/useIsVisible';

const Home = () => {
    const chatRef = useRef(null);
    const createImageRef = useRef(null);
    const summarizeRef = useRef(null);
    const translateRef = useRef(null);
    const textToSpeechRef = useRef(null);

    const [isChatVisible, setIsChatVisible] = useState(null);
    const [isCreateImageVisible, setIsCreateImageVisible] = useState(null);
    const [isSummarizeVisible, setIsSummarizeVisible] = useState(null);
    const [isTranslateVisible, setisTranslateVisible] = useState(null);
    const [isTextToSpeechVisible, setIsTextToSpeechVisible] = useState(null);

    useIsVisible(chatRef, setIsChatVisible);
    useIsVisible(createImageRef, setIsCreateImageVisible);
    useIsVisible(summarizeRef, setIsSummarizeVisible);
    useIsVisible(translateRef, setisTranslateVisible);
    useIsVisible(textToSpeechRef, setIsTextToSpeechVisible);

    const excludedDivRef = useRef(null);
    const selectionRef = useRef(null);

    const aiFunctions = ['Chat', 'Create Image', 'Summarize', 'Translate', 'Text-to-Speech', 'Speech-to-Text'];

    const [selectedFunction, setSelectedFunction] = useState("Chat");
    const [selectionHeight, setSelectionHeight] = useState(0);
    const [expandFunctions, setExpandFunctions] = useState(false);


    const [chat, setChat] = useState([]);
    const [chatResponses, setChatResponses]= useState([]);
        const [message, setMessage] = useState({
        role: "",
        content: ""
    });

    const [loading, setLoading] = useState(false);

    const [headerText, setHeaderText] = useState("");
    const text = "AI Hub Central is a platform   that brings together multiple AI technologies, making it easy for users to explore and implement AI in their projects for free and without the need to login.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setHeaderText(text.slice(0, i));
            i++;

            if (i > text.length){
                clearInterval(interval)
            };
        }, 3000 / text.length);
    
        return () => clearInterval(interval);
      }, [text]);

    const handleChange = (e) => {
        setMessage({role:"user", content:e.target.value});
    }
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            setChat((prevChat) => [...prevChat, message])
            setMessage({role:"", content:""});
        }        
    };

    useEffect(() => {
        const Chat = async() => {
                try {
                setLoading(true);

                const res = await fetch(`/api/openai/chatGPT`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chat: chat }),
                });
                
                const data = await res.json();

                setChatResponses([...chatResponses, data.chatResponse]);
                
                //chat[chat.length - 1].content = `[Chat]: ${chat[chat.length - 1].content}`;

                setLoading(false);
            } catch (error) {
                console.log(error);

                setLoading(false);
            } finally{
                setLoading(false);
            }
        }
        const CreateImage = async() => {
            try {
                setLoading(true);

                const res = await fetch(`/api/openai/dalle`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ prompt: chat.length ? chat[chat.length -1].content : null , nbImages: 1, resolution: 256 }),
                });
                
                const data = await res.json();
                        
                setChatResponses([...chatResponses, data.images[0]]);
                //chat[chat.length - 1].content = `[Create Image]: ${chat[chat.length - 1].content}`;

                setLoading(false);
              } catch (error) {
                console.log(error);
                setLoading(false);
              } finally {
                setLoading(false);
              }
        }
        const Summarize = async() => {
            try {
                setLoading(true);
          
                const res = await fetch(`/api/openai/summarize`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({url: chat.length ? chat[chat.length -1].content : null}),
                });
                
                const data = await res.json();
          
                setChatResponses([...chatResponses, data]);
          
                //chat[chat.length - 1].content = `[Summarize]: ${chat[chat.length - 1].content}`;
                setLoading(false);
              } catch (error) {
                console.log(error);
          
                setLoading(false);
              } finally {
                setLoading(false);
              }
        }
        const Translate = async() => {
            try {
                setLoading(true);
                chat[chat.length - 1].content = `Translate ${chat[chat.length - 1].content}`;

                const res = await fetch(`/api/openai/chatGPT`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chat: chat }),
                });
                
                const data = await res.json();

                setChatResponses([...chatResponses, data.chatResponse]);
                
                //chat[chat.length - 1].content = `[Translate]: ${chat[chat.length - 1].content.substr(chat[chat.length - 1].content.indexOf(" ") + 1)}`;
                setLoading(false);
            } catch (error) {
                console.log(error);

                setLoading(false);
            } finally{
                setLoading(false);
            }
        }
        const TextToSpeech = async() => {}
        const SpeechToText = async() => {}

        if(chat.length > 0) {
            if(selectedFunction === "Chat"){
                Chat();
            } else if(selectedFunction === "Create Image"){
                CreateImage();
            } else if(selectedFunction === "Summarize"){
                Summarize();
            } else if(selectedFunction === "Translate"){
                Translate();
            } else if(selectedFunction === "Text-to-Speech"){
                TextToSpeech();
            } else if(selectedFunction === "Speech-to-Text"){
                SpeechToText();
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[chat]);

    const handleExpandFunctions = () => {
        if(expandFunctions){
            setExpandFunctions(false);
        }else{
            setExpandFunctions(true);
            setSelectionHeight(selectionRef.current.scrollHeight);
        }
    }

    const handleChooseFunction = (e) => {
        setSelectedFunction(e.target.value);
        setExpandFunctions(false);
    }

    useEffect(() => {
        // Event listener for clicks outside of the excluded div
        function handleClickOutside(event) {
            if (excludedDivRef.current && !excludedDivRef.current.contains(event.target)) {
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
                className='min-h-[calc(100vh-73x)] flex flex-col justify-center items-center mx-10'>
        <div className='w-full h-fit mb-5 min-h-[calc(100vh)] px-28 md:min-h-[calc(80vh)] sm:min-h-[calc(110vh)] md:px-0'>
            <h2 className='text-8xl mt-5 md:text-6xl sm:text-6xl font-bold mb-10 '>Welcome to AI Hub Central </h2>
            <h2 className='text-6xl mt-5 md:text-5xl leading-[1.2] sm:text-4xl'>{headerText}</h2>
        </div>

        <div className='w-full h-fit min-h-[calc(80vh)] flex px-5 md:h-fit md:min-h-[calc(100vh)] md:px-0 md:flex-col'>
            <div className='w-[30%] h-full mr-10 md:w-full'>
                <h2 className='text-5xl md:text-4xl md:mb-5 sm:3xl'>You can explore all the AI tools here:</h2>
            </div>
            <div className='w-[70%] border-4 border-black shadow-xl shadow-gray-300 md:w-full md:h-[80vh] sm:border-none sm:shadow-none'>
                <div style={{scrollbarWidth: "none"}} className='w-full h-[85%] overflow-y-scroll'>
                {
                        (chat.length > 0) && (
                            chat.map((message, index1) => (
                                <div className='w-full h-fit' key={index1} >
                                    <div className='userMessages px-48 bg-white w-full py-8 border-b-2 border-gray-200 md:px-10 sm:px-0 md:py-5'>
                                        {message.content}
                                    </div>

                                    <div className='gptMessages font-semibold px-48 border-b-2 border-gray-200 text-black w-full py-8 md:px-10 sm:px-0 md:py-5'>
                                        {
                                            (!chatResponses[index1]) ? (
                                                <div className=' text-3xl tracking-widest'>
                                                    <LoadingDots />
                                                </div>
                                            ) : (
                                                (chatResponses[index1].includes("data:image/jpeg;base64") && chatResponses[index1].length > 200) ? (
                                                    <img src={chatResponses[index1]} />
                                                ) : (
                                                    chatResponses[index1].includes('```') ? (
                                                        chatResponses[index1].split('```').map((e, index2) => (
                                                            (index2 % 2 === 0) ? (
                                                                {e}
                                                            ) : (
                                                                <CodeEditor code={e} language="javascript"  />   
                                                            )
                                                        ))
                                                    ) : (
                                                        chatResponses[index1]
                                                    )
                                                )
                                                
                                            )
                                            //chatResponses[index1]
                                        }
                                    </div>
                                </div>
                            ))
                        )   
                    }
                </div>

                <div className='w-full h-12 flex justify-center items-center md:absolute md:w-[80%] sm:w-[95%] md:left-[50%] md:transform md:translate-x-[-50%]'>
                    <div ref={excludedDivRef} className='relative w-[20%] h-full mr-5 md:w-[40%]'>
                        <div className='absolute border-2  w-full flex flex-col justify-center items-center bottom-0 overflow-hidden rounded-xl'>
                            <div ref={selectionRef} style={{height: expandFunctions ? `${selectionHeight}px` : "0px"}} className={`w-full transition-height ease-in-out duration-200`}>
                                        {
                                    aiFunctions.map((func, index) => (
                                        <button key={index} value={func} onClick={ handleChooseFunction } className='w-full px-5 py-2  bg-gray-50 mr-2 border-b-2 hover:bg-gray-100 transition-all ease-in-out'>{func}</button>
                                    ))
                                }
                            </div>
                            <button onMouseUp={ handleExpandFunctions } className='h-full w-full px-5 py-2 bg-gray-100 rounded-b-lg hover:bg-gray-200 transition-all ease-in-out'>{selectedFunction}</button>
                        </div>
                    </div>

                    <input onChange={ handleChange } onKeyDown={handleKeyDown} value={message.content}  disabled={loading} className='w-[75%] h-full px-3 py-3 shadow-lg shadow-gray-400 border-2 bg-gray-50 rounded-lg focus:outline-none md-[60%]'></input>
                </div> 
            </div>
        </div>
        <div className='min-h-[calc(100vh-100px)] flex flex-col justify-center items-center mx-10'>
            <div ref={chatRef} className={`${isChatVisible ? "opacity-1" : "opacity-0"} relative h-fit min-h-[100vh] border-black my-10 py-10 md:flex-col md:w-fit transition-all ease-in-out duration-[1200ms] md:min-h-fit`}>
                <div className='w-[60%] md:w-full md:mb-16'>
                    <h2 className=' text-9xl md:text-6xl'>Create Images From Prompts With DALLE-E</h2>
                </div>

                <div className='w-[25%] float-right flex justify-center items-center md:w-full md:absolute md:bottom-0 md:transform md:translate-y-[50%]'>
                    <Link href="/createImage" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer md:relative md:w-full md:translate-y-0'>
                        <h2 className='relative z-[1] pointer-events-none'>Start Drawing!</h2>
                        <div style={{"background":"linear-gradient(45deg, rgba(0,56,234,1) 0%, rgba(255,0,151,1) 100%)"}}  className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-[1200ms]'></div>
                    </Link>
                </div>
            </div>

            <div ref={createImageRef} className={`${isCreateImageVisible ? "opacity-1" : "opacity-0"} relative h-fit min-h-[100vh] border-black my-10 py-10 md:flex-col md:w-fit transition-all ease-in-out duration-[1200ms] md:min-h-fit`}>
                <div className='w-[60%] float-right md:w-full md:mb-5'>
                    <h2 className=' text-9xl md:text-6xl'>Chat with CHAT-GPT 3.5 NOW</h2>
                </div>  
                
                <div className='w-[25vw]  flex  justify-center items-center md:w-full md:absolute md:bottom-0 md:transform md:translate-y-[50%]'>
                    <Link href="/chatBot" className='absolute bottom-0 trasnform translate-y-[-50%]  w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer md:relative md:w-full md:translate-y-0'>
                        <h2 className='relative z-[1] pointer-events-none'>Start Chatting!</h2>
                        <div style={{"background":"linear-gradient(45deg, rgba(45,172,1,1) 0%, rgba(78,255,250,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-[1200ms]'></div>
                    </Link>
                </div>
            </div>

            <div ref={summarizeRef}  className={`${isSummarizeVisible ? "opacity-1" : "opacity-0"} relative h-fit min-h-[100vh] border-black my-10 py-10 md:flex-col md:w-fit transition-all ease-in-out duration-[1200ms] md:min-h-fit`}>
                <div className='w-[60%] md:w-full md:mb-16'>
                    <h2 className=' text-9xl md:text-6xl'>Summarize any Online Article OR Text</h2>
                </div>
                
                <div className='w-[25vw] float-right h-[10vw] flex justify-center items-center md:w-full md:absolute md:bottom-0 md:transform md:translate-y-[50%]'>
                    <Link href="/summarizeURL" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer md:relative md:w-full md:translate-y-0'>
                        <h2 className='relative z-[1] pointer-events-none'>Start Summarizing!</h2>
                        <div style={{"background":"linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(241,255,0,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-[1200ms]'></div>
                    </Link>
                </div>
            </div>

            <div ref={translateRef} className={`${isTranslateVisible ? "opacity-1" : "opacity-0"} relative h-fit min-h-[100vh] border-black my-10 py-10 md:flex-col md:w-fit transition-all ease-in-out duration-[1200ms] md:min-h-fit`}>            
                <div className='w-[60%] float-right md:w-full md:mb-5'>
                    <h2 className=' text-9xl md:text-6xl'>Translate To And From Over 50+ Languages</h2>
                </div>

                <div className='w-[25vw]  flex  justify-center items-center md:w-full md:absolute md:bottom-0 md:transform md:translate-y-[50%]'>
                    <Link href="/translator" className='absolute bottom-0 trasnform translate-y-[-50%] w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer md:relative md:w-full md:translate-y-0'>
                        <h2 className='relative z-[1] pointer-events-none'>Start Translating!</h2>
                        <div style={{"background":"linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,0,237,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-[1200ms]'></div>
                    </Link>
                </div>
            </div>

            <div ref={textToSpeechRef} className={`${isTextToSpeechVisible ? "opacity-1" : "opacity-0"} relative h-fit min-h-[100vh] border-black my-10 py-10 md:flex-col md:w-fit transition-all ease-in-out duration-[1200ms] md:min-h-fit md:mb-28`}>
                <div className='w-[60%] md:w-full md:mb-16'>
                    <h2 className=' text-9xl md:text-6xl'>Transcribe Any Audio Using WHISPER AI</h2>
                </div>

                <div className='w-[25vw] float-right flex  justify-center items-center md:w-full md:absolute md:bottom-0 md:transform md:translate-y-[50%]'>
                    <Link href="/TSST" className='absolute bottom-0 trasnform translate-y-[-50%]  w-[25vw] h-[10vw] px-4 py-3 rounded-md font-bold text-gray-50 overflow-hidden flex justify-center items-center cursor-pointer md:relative md:w-full md:translate-y-0'>
                        <h2 className='relative z-[1] pointer-events-none'>Start Transcribing!</h2>
                        <div style={{"background":"linear-gradient(45deg, rgba(255,252,0,1) 0%, rgba(255,175,0,1) 100%)"}} className='absolute w-[110%] aspect-square top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[length:300%_300%] bg-left hover:bg-right hover:rotate-180 transition-all ease-in-out duration-[1200ms]'></div>
                    </Link>
                </div>
            </div>
        </div>
    </m.div >
    </LazyMotion>
  )
}

export default Home