import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./assets/img/stark-industries-logo.png";
import Home from "./pages/Home/Home";
import Interface from "./pages/Interface/Interface";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

function WithLogoLayout() {
  return (
    <>
      <div className="container-si-logo">
        <img src={logo} alt="Stark Industries Logo" className="si-logo" />
      </div>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" Component={WelcomePage} />
        <Route element={<WithLogoLayout />}>
          <Route path="/home" Component={Home} />
          <Route path="/on" Component={Interface} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
