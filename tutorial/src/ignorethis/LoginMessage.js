import { useState } from "react";

function SecretMessage() {
  const [name, setName] = useState("")
  const [submitname, setSubmitname]=useState("")
  const click = () =>{
    setSubmitname(name);
    alert("Submitted Name!");
  }
  
return (
  <div className="bg-red-400 w-screen h-screen">
    <div className="flex justify-center items-center text-4xl  bg-amber-200 w-auto h-20">
      {submitname}
    </div>
    
    <input className="font-semibold pl-5 pr-32 py-2 rounded-full   text-red-600"
      placeholder="enter your name"
      type="text"
      onChange={(e)=>setName(e.target.value)}
    >
    </input>
    <button className="h-10 w-32 bg-slate-500 text-white flex justify-center items-center mt-2 rounded-full font-bold" onClick={click}> 
      Submit
    </button>
    
  </div>
);

}
export default SecretMessage;