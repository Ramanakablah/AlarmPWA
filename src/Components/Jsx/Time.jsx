import React, { useState, useEffect } from 'react';
import "../Css/Time.css"

const Time = () => {
  var t = new Date()
  const h=t.getHours()
  const m=t.getMinutes()
  const [hours, sethours] = useState(h);
  const [mins, setmins] = useState(m);

  const scroll = (e) => {
    console.log("Scroll activated");
    e.classList.add("scroll")
    setTimeout(() => {
      e.classList.remove("scroll")
    }, 3000)
  }

  useEffect(() => {
   setInterval(() => {
      t = new Date()
      sethours(t.getHours())
      setmins(t.getMinutes())
      const slidemin2 = document.getElementById("minutes2")
      if (t.getSeconds() === 59) { scroll(slidemin2); }
      if (t.getMinutes() % 10 === 9) {
        const slidemin1 = document.getElementById("minutes")
        if (t.getSeconds() === 59) { scroll(slidemin1); }
      }
      if (t.getMinutes() === 59) {
        const hour2 = document.getElementById("hours2")
        if (t.getSeconds() === 59) {
          scroll(hour2);
        }
      }
      if (t.getHours() % 10 === 9) {
        if (t.getMinutes === 59) {
          const hour1 = document.getElementById("hours")
          scroll(hour1);
        }
      }
    }, 1000);
  },[]);


  return <div>
    <div className="Clock">
      <div className='timewrappers time'>
        <div id="hours" className="" >{Math.floor(hours / 10)}</div>
      </div>
      <div className="time timewrappers">
        <div id="hours2" className="" >
          {hours % 10}</div>
      </div>
      <div className="sep">
        <div className="seprators"></div>
        <div className="seprators"></div>
      </div>
      <div className='timewrappers time'>
        <div className="" id="minutes">{Math.floor(mins / 10)}  </div>
      </div>
      <div className='timewrappers time'>
        <div className="" id="minutes2">{mins % 10} </div>
      </div>
    </div>
  </div>;
};

export default Time;
