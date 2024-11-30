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
          srcSet={`${ImageReact} 300w, ${ImageReact} 600w, ${ImageReact} 900w, ${ImageReact} 1200w`}
          sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, (max-width: 1200px) 900px, 1200px"
          src={ImageReact} 
          alt="Universal Code Technologies" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-fullscreen-overlay-black"></div>
      </div>
      <div className="w-full py-8">
        <h2 className="text-center text-white mt-4 mb-8 text-xl md:text-2xl lg:text-3xl">HELLO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
              <img 
                srcSet={`${ImagePostrgreSql} 150w, ${ImagePostrgreSql} 300w, ${ImagePostrgreSql} 410w`}
                sizes="(max-width: 600px) 150px, (max-width: 900px) 300px, 450px"
                src={ImagePostrgreSql} 
                alt="PostgreSQL" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-center text-white mt-2 text-lg md:text-xl">PostgreSQL</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
              <img 
                srcSet={`${ImageNextJs} 150w, ${ImageNextJs} 300w, ${ImageNextJs} 380w`}
                sizes="(max-width: 600px) 150px, (max-width: 900px) 300px, 450px"
                src={ImageNextJs} 
                alt="Next.js" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-center text-white mt-2 text-lg md:text-xl">Next.js</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;