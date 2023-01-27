import Settings from "./Settings";
import "../components/scss/game.scss";
import React, { useState, useEffect } from "react";
function Game({ image, startGame }) {
  const [card, setCard] = useState([]);
  const [counter, setCounter] = useState(0);
  const [clicked, setClicked] = useState([]);
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
                 backgroundImage: `url(${image})`,
                  backgroundPositionX: `${1280 - randomNum[0] * 256}px`,
                  backgroundPositionY: `${720 - randomNum[1] * 144}px`,
                width: `256px`,
                height: `144px`,
              },
              className: `board`,
              key: arrboard[x],
              id: randomNum,

              onClick: handleSubmit,
            },
            [
              React.createElement("div", {
                style: {
                 
                  width: `256px`,
                  height: `144px`,
                },
                className: `part`,
                key: arrboard[x],
                id: arrboard[x],

              }),
            ]
          ),
        ]);
      }
    }
    function handleSubmit(e) {
      setCounter((prevState) => prevState + 1);
      clicked.push(e.target.parentNode.id);
      e.target.parentElement.disabled = true;
      console.log(e.target.parentElement.disabled);
      console.log(e);
       if(clicked.length % 2 == 0) {
        console.log("sprawdzam");
        console.log(clicked);
        const firstChecked = document.querySelectorAll(
          `.board[disabled='']`
        );
     
        console.log(firstChecked[0]);
       
     
          firstChecked[0].setAttribute("id", `${clicked[clicked.length-2]}`);
          firstChecked[1].setAttribute("id", `${clicked[clicked.length-1]}`);
      
          for(Element of firstChecked){
              Element.disabled = false
          }
      }
    console.log(clicked)
    }
  }, [startGame]);
  return (
    <>
      <div className="cardsContainer">{card}</div>
      <h2>{counter % 2}</h2>
    </>
  );
}

export default Game;
