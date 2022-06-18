import React, { useState } from 'react';
import useSound from 'use-sound';
import Narayan from "../New folder/Narayan.mp3"
// import starwars from "../New folder/starwars.mp3";
import "../Css/Morning.css"
import Time from "./Time"
import Alarm from "./Alarm"
import sun from "../New folder/Sun.png"
const audio = new Audio("../New folder/Narayan.mp3")

const Morning = () => {

  const [showalarm, setshowalarm] = useState(false);
  const [offalarm, setoffalarm] = useState(false);
  const [istherealarm, setistherealarm] = useState(false);


  const alarmsetter = () => {
    istherealarm?setistherealarm(false):setistherealarm(true)
  }


  const showalarmfunc = () => {
    showalarm?setshowalarm(false): setshowalarm(true);
  }

  const terminatealarm = () => {
    sessionStorage.removeItem("Ahourfixed")
    sessionStorage.removeItem("Aminfixed")
    alarmsetter()
  }

  const [bajao, { stop }] = useSound(Narayan, {
    interrupt: true,
    loop: true
  })

  const halt = () => {
    audio.pause()
    // stop();
    alarmoff();
  }
  console.log(audio);
  const alarmoff = () => {
    console.log(audio);
    if (offalarm) {
      setoffalarm(false)
    }
    if (!offalarm) {
    audio.play()  
      // const audictx = new AudioContext();
      // audictx.resume();
      // stop()
      // bajao()
      setoffalarm(true)
    }
  }

  const pushnotify = () => {
    Notification.requestPermission(
      function (status) {
        console.log("Notification permission status", status)
      }
    );
  }

  setInterval(() => {
    const t = new Date();
    const Bar = document.getElementById("secondbar")
    Bar.style.width = ((t.getSeconds() / 60) * 100) + "%"
  }, 1000);

  return <div className='Morning'>
    <img src={sun} alt="Sun" />
    {!showalarm && <Time />}
    <div className="barholder">
      <div className="seconds" id='secondbar'></div>
    </div>
    {offalarm ? <button className='btn danger' onClick={halt}> Stop alarm </button> : !showalarm && (!istherealarm || !sessionStorage.Ahourfixed) && <button className='btn primary-blur' onClick={showalarmfunc}> Set Alarm</button>}
    {showalarm && <Alarm visible={showalarmfunc} trigger={alarmoff} confirmalarm={alarmsetter} />}

    {(istherealarm || sessionStorage.Ahourfixed) ? <div className='head'>Alarm set for :</div> : <div className='head'>No Alarm is set </div>}
    {(istherealarm || sessionStorage.Ahourfixed) && <div className="alarminfo">
      <div className="alarmtime">
        {Number(JSON.parse(sessionStorage.Ahourfixed))}
        <span>:</span>
        {Number(JSON.parse(sessionStorage.Aminfixed))}
      </div>
      <button className="cancel" onClick={terminatealarm}>
        Delete
      </button>
      {/* <div className="slider" id='ballholder' >
        <div className="ball" id='balls' onClick={move}></div>
      </div> */}
    </div>

    }
    {/* <button className='btn danger'>Notify</button> */}
  </div>;
};

export default Morning;
