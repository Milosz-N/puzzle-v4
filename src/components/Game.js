import "../components/scss/game.scss";
import React, { useEffect } from "react";
function Game({
  image,
  startGame,
  setStartCount,
  setFinish,
  currentCount,
  cardtest,
  setCardTest,
}) {
  var arr = [];
  var arrAnimations = [];

  function handleSubmit(e) {
    const button = document.querySelectorAll(".part");
    if (arr.length == 0 || e.target.id != arr[arr.length - 1]) {
      arr.push(e.target.id);
      arrAnimations.push(e.target.name);
      console.log(arrAnimations);

      e.target.disabled = true;
      if (arr.length % 2 === 0) {
        const disabled = document.querySelectorAll(`.part[disabled]`);

        for (Element of disabled) {
          if (Element.id == arr[arr.length - 1]) {
            console.log(arr[arr.length - 2][0] - arr[arr.length - 1][0]);
            Element.setAttribute("id", `${arr[arr.length - 2]}`);
            let x = Number.parseInt(arr[arr.length - 2][0]);
            let y = Number.parseInt(arr[arr.length - 2][2]);

            // Element.animate(
            //   [
            //     { transform: `${`translate(${256 * (arrAnimations[arr.length - 2][0] -arrAnimations[arr.length - 1][0])  }px, ${144 * (arrAnimations[arr.length - 2][2] -arrAnimations[arr.length - 1][2])}px)`}`,
            //   },

            //   ],
            //   {

            //     duration: 1000,
            //   }
            // );
            Element.style.backgroundPositionY = `${720 - y * 144}px`;
            Element.style.backgroundPositionX = `${1280 - x * 256}px`;
            Element.disabled = false;
          } else if (Element.id == arr[arr.length - 2]) {
            // console.log("pierwszy klikniety element")
            Element.setAttribute("id", `${arr[arr.length - 1]}`);
            // console.log(Element.style.backgroundPositionX);
            let x = Number.parseInt(arr[arr.length - 1][0]);
            let y = Number.parseInt(arr[arr.length - 1][2]);

            Element.disabled = false;
            // Element.animate(
            //   [

            //     { transform: `${`translate(${256 * (arrAnimations[arr.length - 1][0] -arrAnimations[arr.length - 2][0])  }px, ${144 * (arrAnimations[arr.length - 1][2] -arrAnimations[arr.length - 2][2])}px)`}`,

            //   },

            //   ],
            //   {
            //     // timing options
            //     duration: 1000,
            //   }
            // );

            Element.style.backgroundPositionY = `${720 - y * 144}px`;
            Element.style.backgroundPositionX = `${1280 - x * 256}px`;
          }
        }
        function isBigEnough(element) {
          return element.id === element.name;
        }
        if ([...button].every(isBigEnough)) {
          // console.log("ulozone");
          setStartCount(false);
          setFinish(true);
          // setCardTest([]);
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
        <h2>
          {" "}
          Time: {Math.floor(currentCount / 60)} :{" "}
          {currentCount - Math.floor(currentCount / 60) * 60}
        </h2>
      </>
    )
  );
}

export default Game;
