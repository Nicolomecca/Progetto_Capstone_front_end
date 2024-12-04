
const Logo = () => {
    return (
      <div className="logo-container">
        <div className="logo-circle"></div>
        <div className="logo-code"></div>
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        <div className="logo-title">
          <span className="title-main">Universal</span>
          <span className="title-accent">Code</span>
        </div>
      </div>
    );
  };
  export default Logo