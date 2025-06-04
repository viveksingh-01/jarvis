import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import Audio from "../../components/Audio/Audio";
import "./Interface.css";

function Interface() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const isActivatedRef = useRef(isActivated);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isActivatedRef.current = isActivated;
  }, [isActivated]);

  // Use useCallback to memoize the function
  const checkForActivationCommand = useCallback((script: string) => {
    script = script.toLowerCase();
    const activationCommands = ["jarvis", "wake up", "daddy's home", "daddy is home"];
    const isActivationCommand = activationCommands.find((item) => item == script);
    if (isActivationCommand) {
      activateJarvis();
    }
  }, []);

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
  }, [checkForActivationCommand]);

  const startListening = () => {
    recognitionRef.current?.start();
  };

  function activateJarvis(): void {
    setIsActivated(true);
    setAudioSource("power-on");
    audioRef.current?.play();
  }

  return (
    <div className={`container-interface ${isActivated ? "jarvis-activated" : "jarvis-powered-off"}`}>
      <div id="record-btn" className="record-btn-container" onClick={startListening}>
        <FontAwesomeIcon icon={faMicrophone} size={"4x"} className="btn-record" />
      </div>
      <Audio ref={audioRef} source={audioSource} />
    </div>
  );
}

export default Interface;
