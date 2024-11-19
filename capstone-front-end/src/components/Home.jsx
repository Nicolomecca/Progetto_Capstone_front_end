import MyNavbar from "./MyNavbar"

const Home = () => {
  return (
    <div className="bg-linear-gradient min-vh-100">
      <MyNavbar />
      <main className="container-fluid p-0">
        <section className="row mx-0">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{height: "80vh"}}>
            <div className="text-center">
              <h1>
                <span className="display-1 fw-bold text-white">Universal</span>
                <span className="display-1 fw-bold" style={{color: "#1ED760"}}> Code</span>
              </h1>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home