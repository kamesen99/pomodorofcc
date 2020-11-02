import React, {useState, useEffect, useCallback} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplayIcon from '@material-ui/icons/Replay';
import Counter from "./components/Counter"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import './App.css';

function App() {

  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerStopped, setTimerStopped] = useState(true);
  const [timerType, setTimerType] = useState("session");
  const [timer, setTimer] = useState(25*60);
  //const [reset, setReset] = useState(false);

  const handleReset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setTimerStopped(true);
    setTimerType("session");
    setTimer(25*60);
    //document.getElementById('time-left').innerHTML = "25:00";
  }
  
  const handleClickDown = (timer, setFunc) =>{
    if (timer > 1) {
      setFunc(timer - 1);    
    }
  }
  const handleClickUp = (timer, setFunc) =>{
    if (timer < 60) {
        setFunc(timer + 1);
    }
  }
  const handleStartStop = () => {
    setTimerStopped(!timerStopped);
    console.log("Play/pause pressed!")
  }
  
  const useAudio = new Audio("BeepSound.wav");
  const start = () => {
    useAudio.play();
  }

  const countDown = () =>{
    setTimeout(() => setTimer(timer - 1), 1000)
  }
  React.useEffect(() => {
    timer > 0 && (!timerStopped && countDown());
  })
  
  const Counter = (timer) => {
    //const [timeleft, setTimeleft] = useState(timer * 60);
    const timeToFormat = (minutes, seconds) => {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return (minutes + ":" + seconds);
    }

    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    let formatted = (timeToFormat(minutes, seconds))

    return(
      <div id="timer-label">
          <p id="time-left">{formatted}</p>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>FCC: A Pomodoro Counter</p>
      </header>
      <div className="App-body">
        <div className="section">
          <div id="break-label">
            <ArrowDownwardIcon id="break-decrement" onClick={() => handleClickDown(breakTime, setBreakTime)} style={{marginRight: "1rem"}}/>
              <p id="break-length" >{breakTime}</p>:00
            <ArrowUpwardIcon id="break-increment" onClick={() => handleClickUp(breakTime, setBreakTime)} style={{marginLeft: "1rem"}}/>
          </div>
          <div id="session-label">
            <ArrowDownwardIcon id="session-decrement" onClick={() => handleClickDown(sessionTime, setSessionTime)} style={{marginRight: "1rem"}}/>
              <p id="session-length" >{sessionTime}</p>:00
            <ArrowUpwardIcon id="session-increment" onClick={() => handleClickUp(sessionTime, setSessionTime)} style={{marginLeft: "1rem"}}/>
          </div>
        </div> 
        <div className="timer-section">
          <div className="button-row">
            <SkipNextIcon id="start_stop" onClick={handleStartStop}/>
            <ReplayIcon id="reset" onClick={handleReset} />
          </div>
          <div>
            Session: {timerType} {Counter(timer)}
          </div>          
        </div>
      </div>
    </div>
  );
}
    
export default App;

