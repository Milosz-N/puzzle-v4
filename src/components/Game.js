import Settings from "./Settings";
import "../components/scss/game.scss";
import React, { useState, useEffect } from "react";
function Game({ image, startGame, setStartCount }) {
  const [card, setCard] = useState([]);
  const [cardtest, setCardTest] = useState([]);
  var arr = [];

  function handleSubmit(e) {
    const button = document.querySelectorAll(".part");
    if (arr.length == 0 || e.target.id != arr[arr.length - 1]) {
      arr.push(e.target.id);
      e.target.disabled = true;
      console.log(e.target);
      if (arr.length % 2 === 0) {
        const disabled = document.querySelectorAll(`.part[disabled]`);
        console.log(disabled);
        for (Element of disabled) {
          if (Element.id == arr[arr.length - 1]) {
            Element.setAttribute("id", `${arr[arr.length - 2]}`);
            let x = Number.parseInt(arr[arr.length - 2][0]);
            let y = Number.parseInt(arr[arr.length - 2][2]);
            Element.style.backgroundPositionY = `${720 - y * 144}px`;
            Element.style.backgroundPositionX = `${1280 - x * 256}px`;
            Element.disabled = false;
          } else if (Element.id == arr[arr.length - 2]) {
            // console.log("pierwszy klikniety element")
            Element.setAttribute("id", `${arr[arr.length - 1]}`);
            // console.log(Element.style.backgroundPositionX);
            let x = Number.parseInt(arr[arr.length - 1][0]);
            let y = Number.parseInt(arr[arr.length - 1][2]);
            Element.style.backgroundPositionY = `${720 - y * 144}px`;
            Element.style.backgroundPositionX = `${1280 - x * 256}px`;
            Element.disabled = false;
          }
        }
        function isBigEnough(element) {
          return element.id === element.name;
        }
        console.log([...button].every(isBigEnough));
        if([...button].every(isBigEnough)){
          console.log('ulozone');
          setStartCount(false);

        }
      }
    }
  }

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
        // console.log(asd);
        arr = arr.filter(function (e) {
          return e !== arr[random];
        });

        setCardTest((prevState) => [
          ...prevState,
          React.createElement("button", {
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
            name: arrboard[x],
            onClick: handleSubmit,
          }),
        ]);
      }
    }
  }, [startGame]);

  return (
    startGame === true && (
      <>
        <div className="cardsContainer">{cardtest}</div>
      </>
    )
  );
}

export default Game;
