import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate("home");
    }, 1800);
    return () => clearTimeout(timerId);
  }, [navigate]);

  return <div className="stark-container"></div>;
}

export default WelcomePage;
