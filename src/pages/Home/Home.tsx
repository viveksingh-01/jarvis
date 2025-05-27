import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/img/stark-industries-logo.png";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="container-si-logo">
        <img src={logo} alt="Stark Industries Logo" className="si-logo" />
      </div>
      <div className="home-container">
        <div className="container-power-btn">
          <FontAwesomeIcon
            icon={faPowerOff}
            size={"4x"}
            className="power-btn"
          />
        </div>
      </div>
      ;
    </>
  );
}

export default Home;
