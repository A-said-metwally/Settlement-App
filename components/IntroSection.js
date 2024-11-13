// components/IntroSection.js
import { useState, useEffect } from "react";

export default function IntroSection() {
    const [text, setText] = useState('');
    const fullText = "Welcome to the BI & Solutions Unit! We’re here to support you every step of the way. Rest assured, everything will be handled with care and precision. Thank you for trusting us. "; 
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        setText((prev) => prev + fullText[index]);
        index += 1;
        if (index === fullText.length) clearInterval(interval);
      }, 100); // typing speed
    }, []);
  
    return (
      <div className="container flex flex-col items-center p-4">
        <h1 className="mb-2 text-6xl font-bold text-gray-500 animate-fadeInScale">Hello!</h1>
        <p className="w-4/5 text-3xl font-bold leading-relaxed text-center text-gray-500 break-words whitespace-normal border-r-2 border-transparent border-gray-700 animate-typewriter">
          {text}
        </p>
      </div>
    );
  }