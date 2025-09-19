import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import Audio from "../../components/Audio/Audio";
import ListeningIndicator from "../../components/ListeningIndicator/ListeningIndicator";
import MessageContext from "../../contexts/MessageContext";
import "./Interface.css";

const speech = new SpeechSynthesisUtterance();
speech.volume = 1;
speech.rate = 1;

function Interface() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [command, setCommand] = useState("");
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
      greetingMsg = selectRandomItem(greetings.morning);
    } else if (hour >= 12 && hour < 16) {
      greetingMsg = selectRandomItem(greetings.noon);
    } else if (hour >= 16 && hour < 24) {
      greetingMsg = selectRandomItem(greetings.evening);
    } else {
      greetingMsg = "It's late, not getting sleep?";
    }
    setTimeout(() => {
      speak(greetingMsg);
    }, 750);
  }

  const selectRandomItem = (itemList: string[]) => itemList[Math.floor(Math.random() * itemList.length)];

  function speak(message: string) {
    speech.text = message;
    window.speechSynthesis.speak(speech);
  }

  function checkForActivationCommand(script: string) {
    script = script.toLowerCase();
    const activationCommands = ["jarvis", "wake up", "daddy's home", "daddy is home"];
    const isActivationCommand = activationCommands.find((item) => item == script);
    if (isActivationCommand) {
      activateJarvis();
    } else {
      const activationErrorMsg = "Sorry but I'm afraid I'm not activated.";
      speak(activationErrorMsg);
    }
  }

  function fetchTime(): string {
    const date = new Date();
    const timeString = date.toLocaleTimeString("en-US", { hour12: true });
    const [time, meridian] = timeString.split(" ");
    const [hr, min] = time.split(":");
    return `It's ${hr} ${min} ${meridian}`;
  }

  function processCommand(command: string): void {
    let speechOutput: string;
    if (command.includes("time")) {
      speechOutput = fetchTime();
    } else {
      speechOutput = "Sorry, I didn't get you";
    }
    speak(speechOutput);
  }

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const { resultIndex, results } = event;
      const { transcript } = results[resultIndex][0];
      const { isFinal } = results[resultIndex];
      setCommand(transcript);
      if (isFinal) {
        console.log("transcript", transcript);
        if (!isActivatedRef.current) {
          checkForActivationCommand(transcript);
        } else {
          processCommand(transcript.toLowerCase());
        }
      }
    };
    recognition.onend = () => {
      setCommand("");
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    recognitionRef.current?.start();
    setIsListening(true);
  };

  return (
    <div className={`container-interface ${isActivated ? "jarvis-activated" : "jarvis-powered-off"}`}>
      <ListeningIndicator isListening={isListening} speech={command} />
      <div id="record-btn" className="record-btn-container" onClick={startListening}>
        <FontAwesomeIcon icon={faMicrophone} size={"4x"} className="btn-record" />
      </div>
      <Audio ref={audioRef} source={audioSource} />
    </div>
  );
}

export default Interface;
