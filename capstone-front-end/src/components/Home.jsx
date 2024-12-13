import { motion } from "framer-motion";
import quizImage from "../assets/imgs/Screenshot 2024-11-29 161637.png";
import learningImage from "../assets/imgs/Screenshot 2024-11-29 161548.png";
import TheoryImage from "../assets/imgs/Screenshot 2024-11-29 163029.png";
import Footer from "./Footer";

const Home = () => {
  console.log(process.env.REACT_APP_API_URL)
  return (
  
    <div className="home-bg-black min-vh-100">
      <main className="container-fluid p-0">
        {/* Hero Section */}
        <section className="row mx-0">
          <div
            className="col-12 d-flex justify-content-center align-items-center"
            style={{ height: "90vh" }}
          >
            <div className="home-text-center home-title-animation">
              <h1 className="home-mega-title mb-4">
                <span className="home-title-word text-white">Universal</span>
                <span className="home-title-word home-green-text"> Code</span>
              </h1>
              <p className="home-purple-text fs-2 mt-5 home-subtitle-animation">
                Learn How. Learn always
              </p>
            </div>
          </div>
        </section>

        {/* Text Sections */}
        {[
          "We own and operate leading digital products, including Universal Code and Quiz Master. And we develop the technology to power them.",
          "Transforming education through technology and gamification, creating immersive learning experiences for the next generation.",
          "Join our community of learners and innovators who are shaping the future of digital education and development.",
        ].map((text, index) => (
          <motion.section
            key={index}
            className="row mx-0"
            style={{ marginTop: "30vh", marginBottom: "30vh" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="col-lg-10 col-12 mx-auto">
              <h2 className="display-3 text-gradient-modern">{text}</h2>
            </div>
          </motion.section>
        ))}

        {/* Images Section */}
        <motion.section className="row mx-0 py-5">
          <div className="col-12">
            <div className="container">
              <div className="row g-4">
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <img
                    src={quizImage}
                    alt="Quiz Interface"
                    className="img-fluid rounded-3 shadow-lg hover-lift mb-4"
                  />
                </motion.div>
                <motion.div
                  className="col-md-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <img
                    src={learningImage}
                    alt="Learning Platform"
                    className="img-fluid rounded-3 shadow-lg hover-lift mb-4"
                  />
                  <img
                    src={TheoryImage}
                    alt="Theory Platform"
                    className="img-fluid rounded-3 shadow-lg hover-lift"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section
          className="stats-overlay-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="mega-number-container">
            <motion.h2
              className="mega-number"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              600
            </motion.h2>
            <motion.p
              className="overlay-text"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              quiz
            </motion.p>
          </div>
        </motion.section>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
