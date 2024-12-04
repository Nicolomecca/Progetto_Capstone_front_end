import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container d-flex flex-column align-items-center mt-5">
      <Logo />
      <div className="auth-options d-flex justify-content-center align-items-center gap-4 mt-5 pt-5">
        <button 
          onClick={() => navigate('/signup')} 
          className="auth-link"
        >
          Sign-up
        </button>
        <span className="text-white">or</span>
        <button 
          onClick={() => navigate('/login')} 
          className="auth-link"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Welcome;