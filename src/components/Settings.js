import "../components/scss/settings.scss"
function Settings({card, setCard, image, setImage, startGame, setStartGame}) {
    const images = importAll(
        require.context("../components/img", false, /\.(|jpe?g|)$/)
      );
        function importAll(r) {
            return r.keys().map(r);
          }
       const handleChange = (x) => {
        setImage(x);
      };
const createPuzzle = (x) =>{
  console.log(x);
}
  return (
    <>
<>
<div className="containerSettings">
{images.map((i) => <label 
style={{backgroundImage: `url(${i})`}}
className={(`${(image == i) && "borderGreen" }`)} key={`${i}`} 
onChange={()=>setImage(i)}
>
<input
      type="radio"
      value={i}
      checked={image == {i}}
      onChange={()=>setImage(i)}
      />
</label>
  )}
</div>


</>  
<>





<button className="btn btn-default"
onClick={()=> {createPuzzle(image)}}
>

  Submit

</button>


<h2>{image}</h2>
</>
</>
  );
}

export default Settings;