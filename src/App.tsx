import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" Component={WelcomePage} />
        <Route path="/home" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
