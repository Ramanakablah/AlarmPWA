import React, { useEffect, useState } from 'react';
import "../Css/Night.css"
import useSound from 'use-sound';
import Narayan from "../New folder/Narayan.mp3"
import Time from "./Time"
import moon from "../New folder/moon.png"
import Alarm from './Alarm';

const Nignt = () => {

  const [showalarm, setshowalarm] = useState(false);
  const [offalarm, setoffalarm] = useState(false);
  const [istherealarm, setistherealarm] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const t = new Date();
      const Bar2 = document.getElementById("secondsbar")
      Bar2.style.width = ((t.getSeconds() / 60) * 100) + "%"
    }, 1000);

    const star = document.querySelector(".Star")
    const Screen = document.querySelector(".Night")
    function CloneStar() {
      const clstar = star.cloneNode(true)
      clstar.style.animationDuration = (2 + Math.random() * 6) + "s";
      clstar.style.top = Math.random() * window.innerHeight + "px";
      clstar.style.left = Math.random() * window.innerWidth + "px";
      Screen.append(clstar)
    }
    const sta = setInterval(CloneStar, 100);
    setTimeout(() => {
      clearInterval(sta)
    }, 8000);

  }, [])

  const pushnotify=()=>{
    Notification.requestPermission(
      function(status){
        console.log("Notification permission status" , status)
      }
      );
    }
  
    const displayNotification=(event)=>{
      if(Notification.permission === "granted"){
        navigator.serviceWorker.getRegistration()
        .then (function(reg){
          reg.showNotification("Alarm ringing")
        });
      }
    }

  const alarmsetter = () => {
    if (istherealarm) {
      setistherealarm(false)
    }
    if (!istherealarm) {
      setistherealarm(true)
    }
  }

  const showalarmfunc = () => {
    if (showalarm) {
      setshowalarm(false)
    }
    if (!showalarm) {
      setshowalarm(true)
    }
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
    stop();
    alarmoff();
  }

  const alarmoff = () => {
    if (offalarm) {
      setoffalarm(false)
    }
    if (!offalarm) {
      stop()
      bajao()
      setoffalarm(true)
      // displayNotification()
    }
  }

  return <div className='Night'>
    <img src={moon} alt="" />
    {!showalarm && <Time />}
    <div className="Star"></div>
    <div className="barholder">
      <div className="seconds" id='secondsbar'></div>
    </div>
    {offalarm ? <button className='btn danger' onClick={halt}> Stop alarm </button> : !showalarm && (!istherealarm || !sessionStorage.Ahourfixed) &&  <button className='btn primary-blur' onClick={showalarmfunc}> Set Alarm</button>}
    {showalarm && <Alarm visible={showalarmfunc} trigger={alarmoff} confirmalarm={alarmsetter}/>}

    {(istherealarm || sessionStorage.Ahourfixed) ?<div className='head'>Alarm set for :</div> : <div className='head'>No Alarm is set </div>}
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

{/* <button className='btn danger' onClick={displayNotification}>Notify</button> */}
  </div>;
};

export default Nignt;
