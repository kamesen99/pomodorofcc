import React, {useState, useEffect, useCallback} from 'react';
import {AccurateInterval} from "./components/AccurateInterval"

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
  const [timerState, setTimerState] = useState("stopped");
  const [timerType, setTimerType] = useState("Session");
  const [timerID, setTimerID] = useState("");
  const [timer, setTimer] = useState(25*60);
  //const [reset, setReset] = useState(false);
  
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
    // setTimerStopped(!timerStopped);
    console.log("Play/pause pressed!")
  }
  
  const startBeep = () => {
    const useAudio = new Audio("BeepSound.wav");
    useAudio.play();
  }

  // const countDown = () =>{
  //   setTimeout(() => setTimer(timer - 1), 1000)
  // }
  // React.useEffect(() => {
  //   //timer > 0 && (!timerStopped && countDown());
  // })

  const TimeControl = () => {
    console.log("Timer Control!")
    if (timerState === "stopped"){
      startCountDown();
      setTimerState("running");
      console.log("Running");
    } else {
      setTimerState("stopped")
      if (timerID) {
        timerID.cancel();
      }
    }
  }
  
  const decrementTimer = () => {
    console.log("Decrement timer")
    setTimer(timer - 1); 
    console.log(timer);
  }

  const startCountDown = () => {
    console.log("Countdown started!")
    setTimerID(AccurateInterval(() => {
      decrementTimer();
      console.log("entered")
    }, 1000))
  }

  const handleEnd = () => {
    if (timer === 0) {
      startBeep();
    }
  }

  const handleReset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setTimerState("stopped");
    setTimerType("Session");
    setTimerID("");
    setTimer(25*60);
  }

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

    return formatted;
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
            <SkipNextIcon id="start_stop" onClick={() => TimeControl()}/>
            <ReplayIcon id="reset" onClick={handleReset} />
          </div>
          <div>
          Session: <div id="timer-label">{timerType}</div> <div id="time-left">{Counter(timer)}</div>
          </div>          
        </div>
      </div>
    </div>
  );
}
    
export default App;

