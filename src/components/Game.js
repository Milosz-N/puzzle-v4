import "../components/scss/game.scss";
import React, { useEffect } from "react";
import Pause from "./Pause";
function Game({
  image,
  startGame,
  setStartCount,
  setFinish,
  currentCount,
  cardtest,
  setCardTest,
  setPause,
  pause,
  setStartGame,
  setCount
}) {
  var arr = [];
  var arr2 = [];

  function handleSubmit(e) {
    const button = document.querySelectorAll(".part");
    if (arr.length == 0 || e.target.id != arr[arr.length - 1]) {
      arr.push(e.target.id);
      arr2.push(e.target.name);
      e.target.disabled = true;
      if (arr.length % 2 === 0) {
        const disabled = document.querySelectorAll(`.part[disabled]`);
        // console.log(disabled)
        for (Element of disabled) {
          if (Element.id == arr[arr.length - 1]) {
            // console.log(arr[arr.length - 2][0] - arr[arr.length - 1][0]);
            Element.setAttribute("id", `${arr[arr.length - 2]}`);
            let x = Number.parseInt(arr[arr.length - 2][0]);
            let y = Number.parseInt(arr[arr.length - 2][2]);

            Element.animate(
              [
                {
                  transform: `${`translate(${
                    (Number.parseInt(arr2[arr2.length - 2].charAt(0)) -
                      Number.parseInt(arr2[arr2.length - 1].charAt(0))) *
                    256
                  }px,${
                    (Number.parseInt(arr2[arr2.length - 2].charAt(2)) -
                      Number.parseInt(arr2[arr2.length - 1].charAt(2))) *
                    144
                  }px)`}`,
                },

                { transform: "translate(0)" },
              ],
              {
                duration:
                  Math.pow(
                    Math.pow(
                      Math.abs(
                        Number.parseInt(arr2[arr2.length - 2].charAt(2)) -
                          Number.parseInt(arr2[arr2.length - 1].charAt(2))
                      ),
                      2
                    ) +
                      Math.pow(
                        Math.abs(
                          Number.parseInt(arr2[arr2.length - 2].charAt(0)) -
                            Number.parseInt(arr2[arr2.length - 1].charAt(0))
                        ),
                        2
                      ),
                    1 / 2
                  ) * 100,
                iterations: 1,
              }
            );
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

            Element.animate(
              [
                {
                  transform: `${`translate(${
                    (Number.parseInt(arr2[arr2.length - 1].charAt(0)) -
                      Number.parseInt(arr2[arr2.length - 2].charAt(0))) *
                    256
                  }px,${
                    (Number.parseInt(arr2[arr2.length - 1].charAt(2)) -
                      Number.parseInt(arr2[arr2.length - 2].charAt(2))) *
                    144
                  }px)`}`,
                },

                { transform: "translate(0)" },
              ],
              {
                duration:
                  Math.pow(
                    Math.pow(
                      Math.abs(
                        Number.parseInt(arr2[arr2.length - 2].charAt(2)) -
                          Number.parseInt(arr2[arr2.length - 1].charAt(2))
                      ),
                      2
                    ) +
                      Math.pow(
                        Math.abs(
                          Number.parseInt(arr2[arr2.length - 2].charAt(0)) -
                            Number.parseInt(arr2[arr2.length - 1].charAt(0))
                        ),
                        2
                      ),
                    1 / 2
                  ) * 100,
                iterations: 1,
              }
            );
            // console.log( Math.pow(Math.pow(Math.abs(Number.parseInt(arr2[arr2.length-2].charAt(2)) - Number.parseInt(arr2[arr2.length-1].charAt(2))), 2) + Math.pow(Math.abs(Number.parseInt(arr2[arr2.length-2].charAt(0)) - Number.parseInt(arr2[arr2.length-1].charAt(0))), 2),1/2) * 100,)
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
          const btn = document.querySelectorAll(`.part`);
          const btnPause = document.querySelectorAll(`.btnPause`);
          for (Element of btnPause) {
            Element.disabled = true;
          }

          for (Element of btn) {
            Element.disabled = true;
          }
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
  function newGame() {
    var txt;
    if (window.confirm("Are you sure?")) {
       setStartGame(false);
            setFinish(false);
            setCardTest([]);
            setCount(0);
            setPause(false)
    } 
  }

  return (
    startGame === true && (
      <>
        <div className="cardsContainer">{cardtest}</div>
        <div className="items">
          <img src={`${image}`} className="image"></img>
          <div>
            <h2>
              {" "}
              Time: {Math.floor(currentCount / 60)} :{" "}
              {currentCount - Math.floor(currentCount / 60) * 60}
            </h2>

            <button
              className="buttonNewGame btnPause"
              onClick={() => {
                setStartCount((prevState) => !prevState);
                setPause((prevState) => !prevState);
              }}
            >
              Pause
            </button>
            <button
          className="buttonNewGame btnPause"
          disabled={!image}
          onClick={() => {
         
            onclick=newGame()
          }}
          
        >
          Start new game
        </button>
          </div>

          {pause && (
            <>
              <Pause
                image={image}
                setPause={setPause}
                setStartCount={setStartCount}
              />
            </>
          )}
        </div>
      </>
    )
  );
}

export default Game;
