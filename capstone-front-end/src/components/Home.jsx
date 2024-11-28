const Home = () => {
  return (
    <div className="home-bg-black min-vh-100">
      <main className="container-fluid p-0">
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
      </main>
    </div>
  );
};
export default Home