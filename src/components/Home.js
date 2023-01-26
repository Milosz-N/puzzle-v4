import Settings from './Settings';
import Game from './Game'
import { useState } from "react";
function Home() {
    const [card, setCard] = useState([]);
    const [image, setImage] = useState(undefined);
    const [startGame, setStartGame] = useState(false);


  return (
<><Settings
card ={card}
setCard={setCard}
image={image}
setImage={setImage}
startGame={startGame}
setStartGame={setStartGame}
/>
<Game image={image}/>
</>  
  );
}

export default Home;
