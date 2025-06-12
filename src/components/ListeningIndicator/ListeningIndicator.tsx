import "./ListeningIndicator.css";

function ListeningComponent({ isListening }: { isListening: boolean }) {
  return isListening ? (
    <div className="listening-indicator">
      <h3 className="ml-2" style={{ color: "#ccc" }}>
        Listening...
      </h3>
    </div>
  ) : null;
}

export default ListeningComponent;
