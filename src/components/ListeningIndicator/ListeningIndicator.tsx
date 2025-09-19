import ScaleLoader from "react-spinners/ScaleLoader";
import "./ListeningIndicator.css";

function ListeningComponent({ isListening, speech }: { isListening: boolean; speech: string }) {
  return isListening ? (
    <div className="listening-indicator">
      <ScaleLoader height={36} width={9} radius={50} margin={5} color={"#f00"} />
      <h3 className="ml-2" style={{ color: "#ccc" }}>
        {speech?.length > 0 ? speech : "Listening..."}
      </h3>
    </div>
  ) : null;
}

export default ListeningComponent;
