import { useEffect, useState } from 'react';

const Animazione = () => {
    const [isRotating, setIsRotating] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsRotating(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="cube-bg-black min-vh-100">
        <main className="container-fluid p-0">
          <section className="row mx-0">
            <div
              className="col-12 d-flex justify-content-center align-items-center"
              style={{ height: "90vh" }}
            >
              <div className={`cube-container ${isRotating ? 'cube-rotating' : ''}`}>
                <div className="cube">
                  <div className="cube-face cube-front">
                    <span className="cube-text text-white">Universal</span>
                    <span className="cube-text cube-green-text">Code</span>
                  </div>
                  <div className="cube-face cube-back">
                    <span className="cube-purple-text">Learn How</span>
                  </div>
                  <div className="cube-face cube-right">
                    <span className="cube-green-text">Learn Code</span>
                  </div>
                  <div className="cube-face cube-left">
                    <span className="cube-text text-white">Develop</span>
                  </div>
                  <div className="cube-face cube-top">
                    <span className="cube-purple-text">Create</span>
                  </div>
                  <div className="cube-face cube-bottom">
                    <span className="cube-green-text">Build</span>
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