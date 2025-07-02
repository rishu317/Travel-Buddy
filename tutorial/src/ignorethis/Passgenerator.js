 /* The code was done on date June 18 2025 by Rishu kumar , generates random password of so many 
    different types like- with number, without number, with spacial character,without 
    character ets which depends on your choice */
import { useState, useCallback, useEffect,useMemo,useRef } from "react";
function Passgenerator() {
    const [length, setLength] = useState(4);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState('');

    const passwordRef = useRef(null);
    const characterSet = useMemo(() => {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if (numAllowed) chars += '0123456789';
        if (charAllowed) chars += '!@#$%^&*-_+={}[]~';
        return chars;
    }, [numAllowed, charAllowed]);

    const generatePassword = useCallback(() => {
        let pass = '';
        const chars = characterSet;
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            pass += chars[index];
        }
        setPassword(pass);
    }, [length, characterSet]);

    const copyPasswordToClipboard = useCallback(() => {
        if (passwordRef.current) {
            passwordRef.current.select();
            passwordRef.current.setSelectionRange(0, password.length);
            navigator.clipboard.writeText(password);
        }
    }, [password]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);


    return (
        <>
            <div className="bg-gray-900 h-screen w-full flex justify-center items-center text-white">
                <div className="bg-gray-300 h-auto w-1/2 justify-center items-center">
                    <h1 className="text-center text-5xl font-extrabold py-5 text-black">
                        Password generator
                    </h1>
                    <div className="flex justify-center">
                        <input
                            type="text"
                            readOnly
                            value={password}
                            ref={passwordRef}
                            className=" pl-5 w-2/3 my-5 h-11 text-black font-bold text-2xl rounded-l-2xl"
                        />
                        <div className="  w-20 my-5 h-11 text-white font-bold text-2xl bg-blue-500 pt-1 flex justify-center rounded-r-2xl cursor-pointer hover:bg-blue-700" onClick={copyPasswordToClipboard} >
                            Copy
                        </div>
                    </div>
                    <div className="flex gap-3 justify-center mb-4">
                        <div className="font-bold max-w-64  flex justify-center items-center p-1 gap-2 text-2xl text-black">
                            <input
                                type="range"
                                min={1}
                                max={30}
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}

                                className="cursor-pointer"
                            />
                            <lable>Length:{length}</lable>
                        </div>
                        <div className="font-bold max-w-60  flex justify-center items-center p-1 gap-3 text-2xl text-black">
                            <input
                                type="checkbox"
                                checked={numAllowed}
                                id="numberInput"
                                onChange={() => setNumAllowed((prev) => !prev)}

                            />
                            <lable htmlFor="numberInput" >Numbers</lable>
                        </div>
                        <div className="font-bold max-w-60  flex justify-center items-center p-1 gap-3 text-2xl text-black ">
                            <input
                                type="checkbox"
                                checked={charAllowed}
                                id="characterInput"
                                onChange={() => setCharAllowed((prev) => !prev)}

                            />
                            <lable htmlFor="characterInput" >Characters</lable>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Passgenerator;