import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import "./Interface.css";

function Interface() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const isActivatedRef = useRef(isActivated);

  useEffect(() => {
    isActivatedRef.current = isActivated;
  }, [isActivated]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const { resultIndex, results } = event;
      const { transcript } = results[resultIndex][0];
      const { isFinal } = results[resultIndex];
      if (isFinal) {
        console.log("transcript", transcript);
        if (!isActivatedRef.current) {
          checkForActivationCommand(transcript);
        }
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  const checkForActivationCommand = (script: string) => {
    script = script.toLowerCase();
    const activationCommands = ["jarvis", "wake up", "daddy's home", "daddy is home"];

    const isActivationCommand = activationCommands.find((item) => item == script);
    if (isActivationCommand) {
      setIsActivated(true);
    }
  };

  return (
    <div className="container-interface jarvis-powered-off">
      <div id="record-btn" className="record-btn-container" onClick={startListening}>
        <FontAwesomeIcon icon={faMicrophone} size={"4x"} className="btn-record" />
      </div>
    </div>
  );
}

export default Interface;
