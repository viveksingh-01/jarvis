import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  return (
    <div className="container-interface jarvis-powered-off">
      <div id="record-btn" className="record-btn-container">
        <FontAwesomeIcon
          icon={faMicrophone}
          size={"4x"}
          className="btn-record"
        />
      </div>
    </div>
  );
}

export default Interface;
