import "../components/scss/settings.scss";
function Settings({
  images,
  image,
  setImage,
  setStartGame,
  setStartCount,
}) {
 
  return (
    <>
      <>
        <div className="containerSettings">
          {images.map((i) => (
            <label
              style={{ backgroundImage: `url(${i})` }}
              className={`${image == i ? "label borderGreen" : 'label'}`}
              key={`${i}`}
              onChange={() => setImage(i)}
            >
              <input
                type="radio"
                value={i}
                checked={image == { i }}
                onChange={() => setImage(i)}
              />
            </label>
          ))}
 <button
          className="buttonNewGame"
          disabled= {!image}
          onClick={() => {
            setStartGame(true);
            setStartCount(true);
          }}
        >
          Start game
        </button>
        </div>
      </>
      <>
       

      </>
    </>
  );
}

export default Settings;
