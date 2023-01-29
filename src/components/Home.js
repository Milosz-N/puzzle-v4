import Settings from "./Settings";
import Game from "./Game";
import { useState, useEffect } from "react";
function Home() {
  const [card, setCard] = useState([]);
  const [images, setImages] = useState(
    require
      .context("../components/img", false, /\.(|jpe?g|)$/)
      .keys()
      .map(require.context("../components/img", false, /\.(|jpe?g|)$/))
  );
  const [image, setImage] = useState(undefined);
  const [startGame, setStartGame] = useState(false);
  const [currentCount, setCount] = useState(10);
  const [startCount, setStartCount] = useState(false);
  const [finish, setFinish] = useState(false)
  const timer = () => setCount(currentCount + 1);
  useEffect(() => {
    if (startCount) {
      const myInterval = setInterval(() => {
        setCount((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(myInterval);
    }
  }, [startCount]);
  useEffect(() => {
    document.body.style.backgroundImage =
        "linear-gradient(90deg, #A6DAF5 36%, #CCF998 100%)";
  }, []);
  // useEffect(() => {
  //   if(finish){
  //     setImage(undefined);
  //     setStartCount(0)
  //   }
  // }, [finish]);
 
  console.log(images);
  //koniec falsz start falsz
  //koniec falsz, start prawda
  //koniec prawda start falsz tutaj img ze zdjeciem rozwiazanym i w tle settings
  return (
    <>
    {(!finish && !startGame) &&   <Settings
      images = {images}
        image={image}
        setImage={setImage}
        setStartGame={setStartGame}
        setStartCount={setStartCount}
      />}
      
      <Game image={image} startGame={startGame} setStartCount={setStartCount} setFinish ={setFinish} />
      {/* <h2>{currentCount}</h2> */}
      <button
        className="btn btn-default"
        onClick={() => {
          setStartCount((prevState) => !prevState);
        }}
      >
        Submit
      </button>
      {finish &&
      <div className="divFinish">
      <Settings
      images = {images}
      image={image}
      setImage={setImage}
      setStartGame={setStartGame}
      setStartCount={setStartCount}
      />
      </div>
    }
    </>
  );
}

export default Home;
