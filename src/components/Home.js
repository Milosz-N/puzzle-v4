import Settings from "./Settings";
import Game from "./Game";
import { useState, useEffect } from "react";
import "../components/scss/main.scss";
function Home() {
  const [cardtest, setCardTest] = useState([]);
  const [images, setImages] = useState(
    require
      .context("../components/img", false, /\.(|jpe?g|)$/)
      .keys()
      .map(require.context("../components/img", false, /\.(|jpe?g|)$/))
  );
  const [image, setImage] = useState(undefined);
  const [startGame, setStartGame] = useState(false);
  const [currentCount, setCount] = useState(0); //licznik czasu
  const [startCount, setStartCount] = useState(false); //start stop na liczeniu czasu
  const [finish, setFinish] = useState(false);
  const [pause, setPause] = useState(false);
  // const timer = () => setCount(currentCount + 1);
  useEffect(() => {
    if (startCount) {
      const myInterval = setInterval(() => {
        setCount((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(myInterval);
    }
  }, [startCount]);
  useEffect(() => {
    const btn = document.querySelectorAll(`.part`);
    const container = document.querySelector(".cardsContainer");
    const image = document.querySelector(".image");
    if (pause) {
      for (Element of btn) {
        Element.disabled = true;
      }
      container.classList.add("opacity");
      image.classList.add("opacity");
      container.classList.remove("animation");
      image.classList.remove("animation");
    } else {
      for (Element of btn) {
        Element.disabled = false;
      }
      if (container !== null && container.classList.contains("opacity")) {
        container.classList.remove("opacity");
        image.classList.remove("opacity");
        container.classList.add("animation");
        image.classList.add("animation");
      }
    }
  }, [pause]);

  useEffect(() => {
    document.body.style.backgroundImage =
      "linear-gradient(90deg, #A6DAF5 36%, #CCF998 100%)";
  }, []);
  return (
    <>
      {!finish && !startGame && (
        <Settings
          images={images}
          image={image}
          setImage={setImage}
          setStartGame={setStartGame}
          setStartCount={setStartCount}
          setFinish={setFinish}
        />
      )}
      <Game
        image={image}
        startGame={startGame}
        setStartCount={setStartCount}
        setFinish={setFinish}
        currentCount={currentCount}
        cardtest={cardtest}
        setCardTest={setCardTest}
        setPause={setPause}
        pause={pause}
        setStartGame={setStartGame}
        setCount={setCount}
      />

      {finish && (
        <button
          className="buttonNewGame btnEndGame"
          disabled={!image}
          onClick={() => {
            setStartGame(false);
            setFinish(false);
            setCardTest([]);
            setCount(0);
          }}
        >
          Start new game
        </button>
      )}
      <></>
    </>
  );
}

export default Home;
