function Button(prop){    
    return(
        <div className="py-2">
            <button className="bg-violet-500 hover:bg-violet-700 rounded-lg px-9 py-2 text-white font-bold"
            type="button" 
            >
                {prop.text}
                
            </button> 
            
        </div>
    )
}
export default Button;