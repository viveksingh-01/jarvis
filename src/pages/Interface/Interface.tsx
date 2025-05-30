import { useEffect } from "react";
import "./Interface.css";

function Interface() {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
  }, []);

  return <div className="container-interface jarvis-powered-off"></div>;
}

export default Interface;
