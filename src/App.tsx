import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Interface from "./pages/Interface/Interface";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" Component={WelcomePage} />
        <Route path="/home" Component={Home} />
        <Route path="/on" Component={Interface} />
      </Routes>
    </div>
  );
}

export default App;
