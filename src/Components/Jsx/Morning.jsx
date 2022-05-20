import React, { useState } from 'react';
import useSound from 'use-sound';
import Narayan from "../New folder/Narayan.mp3"
// import starwars from "../New folder/starwars.mp3";
import "../Css/Morning.css"
import Time from "./Time"
import Alarm from "./Alarm"
import sun from "../New folder/Sun.png"

const Morning = () => {

  const [showalarm, setshowalarm] = useState(false);
  const [offalarm, setoffalarm] = useState(false);
  const [istherealarm, setistherealarm] = useState(false);
  
  // const sliderball= document.getElementById("balls")
  // const sliderballholder= document.getElementById("ballholder")
  
  // const move=()=>{
    //   if(!ballpos){
      //     sliderball.style.left= 60 + "%"
      //     sliderballholder.style.backgroundColor= "blue"
      //     setballpos(true)
      //   }
      //   if(ballpos){
        //     sliderball.style.left= 0 + "%"
        //     sliderballholder.style.backgroundColor= "grey"
        //     setballpos(false)
        //   }
        // }
        
        const alarmsetter=()=>{
          if(istherealarm){
            setistherealarm(false)
          }
          if(!istherealarm){
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
      const audictx = new AudioContext();
      audictx.resume();
      stop()
      bajao()
      setoffalarm(true)
    }
  }

const pushnotify=()=>{
  Notification.requestPermission(
    function(status){
      console.log("Notification permission status" , status)
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
    {/* <button className='btn danger'>Notify</button> */}
  </div>;
};

export default Morning;
