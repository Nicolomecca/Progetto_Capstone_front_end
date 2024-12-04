import React from "react";
import { motion } from "framer-motion";
import Animazione from "./Componenti per Stile/Animazione";
import ImageReact from "../assets/imgs/Screenshot 2024-11-29 183318.png";
import ImagePostrgreSql from "../assets/imgs/postgresql.png";
import ImageNextJs from "../assets/imgs/1713348835101.png";
import Footer from "./Footer";

const Technologies = () => {
  return (
    <div className="technologies-container bg-black overflow-x-hidden">
      <Animazione />
      <motion.div
        className="container mx-auto text-center py-32"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="tech-title-gradient">
          <span className="tech-word-dark">The</span>{" "}
          <span className="tech-word-gradient">Universal Code</span>{" "}
          <span className="tech-word-dark">Technologies</span>
        </h1>
      </motion.div>

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

      <motion.section
        className="row mx-0"
        style={{ marginTop: "10vh", marginBottom: "10vh" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="col-lg-10 col-12 mx-auto">
          <h2 className="display-3 tech-gradient-text">
            React: A JavaScript library for building user interfaces with
            reusable components, enabling the creation of large web applications
            that can change data without reloading the page.
          </h2>
        </div>
      </motion.section>

      <div className="w-full py-8">
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
        </div>
      </div>

      <motion.section
        className="row mx-0"
        style={{ marginTop: "10vh", marginBottom: "10vh" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="col-lg-10 col-12 mx-auto">
          <h2 className="display-3 tech-gradient-text">
            PostgreSQL: Powerful, open-source object-relational database system
            with a strong reputation for reliability, feature robustness, and
            performance.
          </h2>
        </div>
      </motion.section>

      <div className="w-full py-8">
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
        </div>
      </div>

      <motion.section
        className="row mx-0"
        style={{ marginTop: "10vh", marginBottom: "10vh" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="col-lg-10 col-12 mx-auto">
          <h2 className="display-3 tech-gradient-text">
            Next.js: React framework that enables server-side rendering and
            generating static websites for React based web applications,
            enhancing performance and SEO.
          </h2>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default Technologies;