import React, { useState } from 'react';
import "../Css/Alarm.css"

const Alarm = (props) => {

    const [hourfi, sethourfi] = useState(null);
    const [minfi, setminfi] = useState(null);


    setInterval(() => {
        let time = new Date();
        if (sessionStorage.Ahourfixed) {
            if (time.getHours() === ((Number(JSON.parse(sessionStorage.Ahourfixed)))+23)%24) {
                if (time.getMinutes() === ((Number(JSON.parse(sessionStorage.Aminfixed))) + 59) % 60) {
                    if (time.getSeconds() === 59) {
                        props.trigger()
                    }
                }
            }
        }
    }, 1000);


    const set = () => {
        sessionStorage.removeItem("Ahourfixed")
        sessionStorage.removeItem("Aminfixed")
        sessionStorage.setItem("Ahourfixed", JSON.stringify(hourfi))
        sessionStorage.setItem("Aminfixed", JSON.stringify(minfi))
        props.confirmalarm();
        console.log(Number(JSON.parse(sessionStorage.Ahourfixed)));
        console.log(Number(JSON.parse(sessionStorage.Aminfixed)));
        setTimeout(() => {
            props.visible()
        }, 3000);
    }

    const hourfixed = (e) => {
        const val = e.target.value
        if (val >= 0 && val <= 23) {
            sethourfi(val)
        }
        console.log(hourfi);
    }
    const minfixed = (e) => {
        const val = e.target.value
        if (val >= 0 && val <= 59) {
            setminfi(val)
        }
        console.log(minfi);
    }

    return <div className='alarm'>
        <div className="set-alarm">
            <div className="insert-hour">
                <input type="number" onChange={hourfixed} placeholder='Hr' min={0} max={23}/>
            </div>
            <div className="sep">
                <div className="seprators"></div>
                <div className="seprators"></div>
            </div>
            <div className="insert-hour">
                <input type="number" onChange={minfixed} placeholder='Mn' min={0} max={59}/>
            </div>
        </div>
        <button className='btn primary-blur' onClick={set} > Set Alarm </button>
    </div>;
};

export default Alarm;
