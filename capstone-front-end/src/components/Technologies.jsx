import React from "react";
import Animazione from "./Animazione";
import ImageReact from "../assets/imgs/Screenshot 2024-11-29 183318.png";
import ImagePostrgreSql from "../assets/imgs/postgresql.png";
import ImageNextJs from "../assets/imgs/1713348835101.png";

const Technologies = () => {
  return (
    <div className="technologies-container bg-black overflow-x-hidden">
      <Animazione />
      <div className="container mt-5 px-4">
        <h1 className="text-center mb-5 text-2xl md:text-3xl lg:text-4xl">
          <span className="text-purple">The Universal Code</span> Technologies
        </h1>
      </div>
      <div className="full-width-image-container relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src={ImageReact} 
          alt="Universal Code Technologies" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-fullscreen-overlay-black"></div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-center text-white mt-4 mb-8 text-xl md:text-2xl lg:text-3xl">HELLO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <img 
              src={ImagePostrgreSql} 
              alt="PostgreSQL" 
              className="w-full max-w-[300px] h-auto object-contain mb-4"
            />
            <h3 className="text-center text-white mt-2 text-lg md:text-xl">PostgreSQL</h3>
          </div>
          <div className="flex flex-col items-center">
            <img 
              src={ImageNextJs} 
              alt="Next.js" 
              className="w-full max-w-[300px] h-auto object-contain mb-4"
            />
            <h3 className="text-center text-white mt-2 text-lg md:text-xl">Next.js</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;