import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/game");
  };

  return (
    <div className="homepage">
      <h1>Code Me Maybe !</h1>
      <p>
        Bienvenue sur <span>Code Me Maybe.</span>
        <br />
        Apprend les bases du langage CSS en t'amusant !
      </p>
      <button type="button" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}

export default HomePage;
