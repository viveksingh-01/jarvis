import logo from "../../assets/img/stark-industries-logo.png";
import "./Home.css";

function Home() {
  return (
    <>
      <div>
        <img src={logo} alt="Stark Industries Logo" className="si-logo" />
      </div>
      <div className="home-container"></div>;
    </>
  );
}

export default Home;
