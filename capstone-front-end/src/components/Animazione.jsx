import { useEffect, useState } from 'react';

const Animazione= ()=> {
      const [isRotating, setIsRotating] = useState(true);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsRotating(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);
    
      return (
        <div className="bg-black min-vh-100">
          <main className="container-fluid p-0">
            <section className="row mx-0">
              <div
                className="col-12 d-flex justify-content-center align-items-center"
                style={{ height: "90vh" }}
              >
                <div className={`cube-container ${isRotating ? 'rotating' : ''}`}>
                  <div className="cube">
                    <div className="face front">
                      <span className="title-word text-white">Universal</span>
                      <span className="title-word green-gradient-text">Code</span>
                    </div>
                    <div className="face back">
                      <span className="purple-gradient-text">Learn How</span>
                    </div>
                    <div className="face right">
                      <span className="green-gradient-text">Learn Code</span>
                    </div>
                    <div className="face left">
                      <span className="title-word text-white">Develop</span>
                    </div>
                    <div className="face top">
                      <span className="purple-gradient-text">Create</span>
                    </div>
                    <div className="face bottom">
                      <span className="green-gradient-text">Build</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      );
    };
    
export default Animazione