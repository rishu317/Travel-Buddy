import { useState, useEffect } from "react";

function CountdownTimer() {
    const [text,setText]=useState("Alert⚠️")
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(20);
    const [isBlast, setIsBlast] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(interval);
                setIsBlast(true);
                setText("🤣")
            } else {
                if (seconds > 0) {
                    setSeconds(prev => prev - 1);
                } else {
                    if (minutes > 0) {
                        setMinutes(prev => prev - 1);
                        setSeconds(59);
                    } else if (hours > 0) {
                        setHours(prev => prev - 1);
                        setMinutes(59);
                        setSeconds(59);
                    } else if (days > 0) {
                        setDays(prev => prev - 1);
                        setHours(23);
                        setMinutes(59);
                        setSeconds(59);
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval); // cleanup
    }, [days, hours, minutes, seconds]);

    const format = (val) => String(val).padStart(2, '0');

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white space-y-6">
            <div className="text-6xl font-bold mb-10" >
                {text}
            </div>

            <div className="text-5xl font-bold">
                {format(days)} : {format(hours)} : {format(minutes)} : {format(seconds)}
            </div>

            {isBlast && (
                <img
                    src="https://media.tenor.com/47fzvR-_FkAAAAAM/chal-bhosdike-tenor.gif"
                    alt="Bomb blast"
                    className="w-64 h-64 object-contain mt-4"
                />
                

            )}
        </div>
    );
}

export default CountdownTimer;
