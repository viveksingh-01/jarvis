import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import Audio from "../../components/Audio/Audio";
import MessageContext from "../../contexts/MessageContext";
import "./Interface.css";

const speech = new SpeechSynthesisUtterance();
speech.volume = 1;
speech.rate = 1;

function Interface() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const isActivatedRef = useRef(isActivated);
  const audioRef = useRef<HTMLAudioElement>(null);
  const messages = useContext(MessageContext);

  useEffect(() => {
    isActivatedRef.current = isActivated;
  }, [isActivated]);

  function activateJarvis(): void {
    setIsActivated(true);
    setAudioSource("power-on");
    audioRef.current?.play();
    greetUser();
  }

  function greetUser() {
    const { greetings } = messages;
    const hour = new Date().getHours();
    let greetingMsg = "";
    if (hour >= 4 && hour < 12) {
      greetingMsg = greetings.morning[0];
    } else if (hour >= 12 && hour < 16) {
      greetingMsg = greetings.noon[0];
    } else if (hour >= 16 && hour < 24) {
      greetingMsg = greetings.evening[0];
    } else {
      greetingMsg = "It's late, not getting sleep?";
    }
    speech.text = greetingMsg;
    setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 750);
  }

  function checkForActivationCommand(script: string) {
    script = script.toLowerCase();
    const activationCommands = ["jarvis", "wake up", "daddy's home", "daddy is home"];
    const isActivationCommand = activationCommands.find((item) => item == script);
    if (isActivationCommand) {
      activateJarvis();
    }
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
  };

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
