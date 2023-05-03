function Pause({ image, setPause, setStartCount }) {
  console.log(image);
  return (
    <div className="containerPause">
      <img src={`${image}`} className="pause"></img>
      <span
        onClick={() => {
          setStartCount((prevState) => !prevState);
          setPause((prevState) => !prevState);
        }}
      >
        X
      </span>
    </div>
  );
}

export default Pause;
