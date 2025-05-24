import { Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" Component={WelcomePage} />
      </Routes>
    </div>
  );
}

export default App;
