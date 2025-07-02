import { useState, useEffect } from "react";

function Timercounter() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev === 59) {
                    setMinutes(m => {
                        if (m === 59) {
                            setHours(h => {
                                if (h === 23) {
                                    setDays(d => d + 1);
                                    return 0;
                                }
                                return h + 1;
                            });
                            return 0;
                        }
                        return m + 1;
                    });
                    return 0;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const format = (val) => String(val).padStart(2, '0');

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white space-y-6">
            <div className="text-4xl font-bold">
                Timer
            </div>

            <div className="text-5xl font-bold">
                {format(days)} : {format(hours)} : {format(minutes)} : {format(seconds)}
            </div>

            {/* Bomb blast GIF */}
            {/* <img
                src="https://gifdb.com/images/high/animated-boom-explosion-wrapozqzvpycw4e6.gif"
                alt="Bomb blast"
                className="w-64 h-64 object-contain mt-4"
            /> */}
        </div>
    );
}

export default Timercounter;
