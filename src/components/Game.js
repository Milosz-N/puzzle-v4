import Settings from "./Settings";
import "../components/scss/game.scss"
import React, { useState, useEffect } from "react";
function Game({ image, startGame }) {
  const [card, setCard] = useState([]);
  const [counter, setCounter] = useState(0);
  const [clicked, setClicked] = useState([])
  useEffect(() => {
    let arr = [];
    let arrboard = [];

    if (startGame === true) {
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          arrboard.push([y, x]);
          arr.push([y, x]);
        }
      }

      for (let x = 0; x < 25; x++) {
        var random = Math.floor(Math.random() * arr.length);
        let randomNum = arr[random];
        arr = arr.filter(function (e) {
          return e !== arr[random];
        });

        setCard((prevState) => [
          ...prevState,
          React.createElement(
            "button",
            {
              style: {
                width: `256px`,
                height: `144px`,
              },
              className: `board`,
              key: arrboard[x],
              id: arrboard[x],
              onClick: handleSubmit,

            },
            [
              React.createElement("div", {
                style: {
                  backgroundImage: `url(${image})`,
                  backgroundPositionX: `${1280 - randomNum[0] * 256}px`,
                  backgroundPositionY: `${720 - randomNum[1] * 144}px`,
                  width: `256px`,
                  height: `144px`,
                },
                className: `part`,
                id: randomNum,
                key: arrboard[x],
              }),
            ]
          ),
        ]);
      }
      
    }
    function handleSubmit(e) {
      setCounter(prevState => prevState + 1);
      clicked.push(e);
      console.log(e.target);
      if(clicked.length%2 == 1){
        console.log('jest jeden')
        //na zero sprawdzanie
      }
      else{
        console.log('jest zero')
        console.log(clicked[clicked.length-1].target.id)
        console.log(clicked[clicked.length-2].target.id)
        const firstChecked = document.querySelectorAll(
          `.part[id='${clicked[clicked.length - 1].target.id}']`
        );
        const secondChecked = document.querySelectorAll(
          `.part[id='${clicked[clicked.length - 2].target.id}']`
        );
          console.log(firstChecked[0].style.backgroundPositionX);
          console.log(firstChecked[0].style.backgroundPositionY);
        

      }


    }

  }, [startGame]);
  return (<>
    <div className="cardsContainer">
      {card}
    </div>
    <h2>{counter%2}</h2>
    </>
  );
}

export default Game;
