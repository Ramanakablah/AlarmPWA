import react,{useState} from "react";
import Morning from "./Components/Jsx/Morning";
import Nignt from "./Components/Jsx/Nignt";
// import Alarm from "./Components/Jsx/Alarm";

function App() {
  const time= new Date()
  const [decide, setdecide] = useState(time.getHours());
  setInterval(() => {
    setdecide(time.getHours())
    console.log("checked");
  }, 1800000);
  return (
    <>
      {(decide>18||decide<6)?<Nignt/>:<Morning/>}
      {/* <Morning/> */}
      {/* <Alarm/> */}
    </>
  );
}

export default App;
