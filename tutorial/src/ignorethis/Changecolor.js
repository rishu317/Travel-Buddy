import { useState } from 'react';

function Changecolor() {
  const [Color, setBgColor] = useState(""); // default background color
  const [Text, setText]=useState("")

  const yellow = () => {
    setBgColor("yellow");
    setText("Yellow");
  };
  const red = () => {
    setBgColor("red");
    setText("Red");
  };
  const blue = () => {
    setBgColor("blue");
    setText("Blue");
  };
  const fuchsia = () => {
    setBgColor("fuchsia");
    setText("Fuchsia");
  };
  const purple = () => {
    setBgColor("purple");
    setText("Purple");
  };
  const black = () => {
    setBgColor("black");
    setText("Black");
  }

  return (
    <div className="w-screen h-screen" style={{ backgroundColor: Color, padding: '20px', color: 'white' }}>
      <div className="gap-4 bg-cyan-200 pt-3  flex justify-center mt-5" >
        <button className='bg-yellow-400 w-32 py-2 mb-3 rounded-full font-bold text-xl' onClick={yellow}>yellow</button>
        <button className='bg-red-400 w-32 py-2 mb-3 rounded-full font-bold text-xl' onClick={red}>Red</button>
        <button className='bg-indigo-400 w-32 py-2 mb-3 rounded-full font-bold text-xl' onClick={blue}>Blue</button>
        <button className='bg-fuchsia-400 w-32 py-2 mb-3 rounded-full font-bold text-xl' onClick={fuchsia}>Fuchsia</button>
        <button className='bg-purple-400 w-32 py-2 mb-3 rounded-full font-bold text-xl' onClick={purple}>Purple</button>
        <button className='bg-black w-32 py-2 mb-3 rounded-full font-bold text-xl' onClick={black}>Black</button>
      </div>
      <div className='h-screen w-screen text-white flex justify-center items-center font- text-5xl'>
          {Text}
      </div>
      
    </div>
  );
}

export default Changecolor;