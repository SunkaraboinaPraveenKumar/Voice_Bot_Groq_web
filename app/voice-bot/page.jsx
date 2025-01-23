"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

function VoiceBot() {
    const [responseText, setResponseText] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const recognition = useRef(null);
    const conversationEndRef = useRef(null); // Ref to the last message

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition.current = new SpeechRecognition();

        // Initial greeting when page loads
        setResponseText("Hello! How can I assist you today?");

        recognition.current.onstart = () => {
            setResponseText("Listening...");
        };

        recognition.current.onspeechend = () => {
            recognition.current.stop();
            setResponseText("");
            if (isRecording) {
                startRecognition();
            }
        };

        recognition.current.onresult = async (event) => {
            const userInput = event.results[0][0].transcript;
            setResponseText(`User: ${userInput}`);
        
            try {
                const fullPrompt = `${userInput} + Donot give any word with asterisk and summarize the response as concise and effective`;
        
                // Axios POST request
                const { data } = await axios.post('/api/groq', {
                    prompt: fullPrompt,
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });
        
                const cleanResponse = data?.message || "No response.";
                setResponseText(`AI Response: ${cleanResponse}`);
                setConversationHistory((prevHistory) => [
                    ...prevHistory,
                    { user: userInput, ai: cleanResponse },
                ]);
                speakResponse(cleanResponse); // Speak the response
            } catch (error) {
                console.error('Error processing request:', error);
                setResponseText("Error processing request.");
            }
        };        

        const handlePageLeave = () => {
            recognition.current.stop();
            setResponseText("Goodbye! See you next time.");
        };

        window.addEventListener("beforeunload", handlePageLeave);

        return () => {
            window.removeEventListener("beforeunload", handlePageLeave);
        };
    }, [isRecording]);

    useEffect(() => {
        // Scroll to the bottom of the conversation when new message is added
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversationHistory]);

    const startRecognition = () => {
        // Check if recognition is already in progress
        if (recognition.current && recognition.current.recognizing) {
            console.log("Recognition is already running");
            return;
        }

        try {
            setResponseText("Listening...");
            setIsRecording(true);
            recognition.current.start();
        } catch (error) {
            // Silently ignore the error and log it (optional)
            console.warn("Recognition already started, ignoring start call.");
        }
    };

    const stopRecognition = () => {
        recognition.current.stop();
        setIsRecording(false);
        setResponseText("Stopped listening.");
    };

    const speakResponse = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            // Restart recognition once speaking is done
            startRecognition();
        };
        synth.speak(utterance);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-6">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg p-5 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Voice Assistant
                </h2>

                {/* Conversation History */}
                <div
                    id="conversation-history"
                    className="overflow-y-auto h-64 bg-gray-50 p-8 rounded-lg mb-6 shadow-inner"
                >
                    {conversationHistory.length === 0 ? (
                        <p className="text-gray-500 text-center">No conversation yet.</p>
                    ) : (
                        conversationHistory.map((entry, index) => (
                            <div key={index} className="mb-4">
                                <div className="font-bold text-blue-600">YOU:</div>
                                <div className="italic text-gray-700">{entry.user}</div>
                                <div className="font-bold text-teal-600 mt-2">AI:</div>
                                <div className="italic text-gray-700">{entry.ai}</div>
                            </div>
                        ))
                    )}
                    {/* Ref for the last item to scroll into view */}
                    <div ref={conversationEndRef} />
                </div>

                {/* Voice Recording Button */}
                <div
                    id="start-record-btn"
                    onClick={isRecording ? stopRecognition : startRecognition}
                    className="px-8 py-4 text-lg font-semibold text-white focus:ring-opacity-50 transition-all duration-300 cursor-pointer"
                >
                    {isRecording ?
                        <div className="flex flex-col items-center justify-center">
                            <Image src={'/microphone.gif'} height={70} width={70} alt="stop" />
                            <h3 className="text-gray-400">Stop</h3>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center">
                            <Image src={'/start.png'} height={70} width={70} alt="stop" />
                            <h3 className="text-gray-400">Start</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default VoiceBot;
