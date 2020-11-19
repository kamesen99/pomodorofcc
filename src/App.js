import React, {useState} from 'react';
import {AccurateInterval} from "./components/AccurateInterval"

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ReplayIcon from '@material-ui/icons/Replay';

import './App.css';

function App() {

  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerState, setTimerState] = useState("stopped");
  const [timerType, setTimerType] = useState("Session");
  const [timerID, setTimerID] = useState("");
  const [timer, setTimer] = useState(2);
  
  const useAudio = new Audio("BeepSound.wav");

  const handleClickDown = (timer, type, setFunc) =>{
    if (timer > 1) {
      setFunc(timer - 1);    
      if (timerType === type) {
        setTimer(timer*60 - 60);
      } 
    }
  }
  const handleClickUp = (timer, type, setFunc) =>{
    if (timer < 60) {
        setFunc(timer + 1);
        if (timerType === type) {
          setTimer(timer*60 + 60);
        } 
    }
  }
  
  const TimeControl = () => {
    if (timerState === "stopped"){
      startCountDown();
      setTimerState("running");
    } else {
      setTimerState("stopped")
      if (timerID) {
        timerID.cancel();
      }
    }
  }
  
  const startCountDown = () => {
    console.log("Countdown started!") 
    const timerId = AccurateInterval(() => {
      decrementTimer();
      phaseControl();
    }, 1000);
    setTimerID(timerId);
  }
  
  const decrementTimer = () => {
    console.log("Inside Decrement Timer")
    setTimer(timer => timer - 1);
  }

  const switchSessionType = (time, type) => {
    setTimer(time);
    setTimerType(type);
  }
  
  //Not working. Cannot get the timer < 0 test to fail
  const phaseControl = () => {
    console.log("Phase Control")
    //Cannot get timer === 0 test to fail
    handleEnd();
    if (timer < 0) {
      if (timerID) {
        timerID.cancel();
      }
      if (timerType === "Break") {
        startCountDown();
        switchSessionType(breakTime*60, "Break");
      } else {
        startCountDown();
        console.log("Timer Type!")
        switchSessionType(sessionTime*60, "Session");
      }
    }
  }
  
  const handleEnd = () => {
    //Unable to access "timer" state?
    if (timer === 0) {
      console.log("Handle end success!")
      useAudio.play();
    }
  }
  
  const handleReset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setTimerState("stopped");
    setTimerType("Session");
    setTimerID("");
    setTimer(3);
    useAudio.pause();
    useAudio.currentTime = 0;
  }

  const FormatTime = (timer) => {
    const numberToTime = (minutes, seconds) => {
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return (minutes + ":" + seconds);
    }
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    let formatted = (numberToTime(minutes, seconds))
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
            <ArrowDownwardIcon id="break-decrement" onClick={() => handleClickDown(breakTime, "Break", setBreakTime)} style={{marginRight: "1rem"}}/>
              <p id="break-length" >{FormatTime(breakTime*60)}</p>
            <ArrowUpwardIcon id="break-increment" onClick={() => handleClickUp(breakTime, "Break", setBreakTime)} style={{marginLeft: "1rem"}}/>
          </div>
          <div id="session-label">
            <ArrowDownwardIcon id="session-decrement" onClick={() => handleClickDown(sessionTime, "Session", setSessionTime)} style={{marginRight: "1rem"}}/>
              <p id="session-length" >{FormatTime(sessionTime*60)}</p>
            <ArrowUpwardIcon id="session-increment" onClick={() => handleClickUp(sessionTime, "Session", setSessionTime)} style={{marginLeft: "1rem"}}/>
          </div>
        </div> 
        <div className="timer-section">
          <div className="button-row">
            <SkipNextIcon id="start_stop" onClick={() => TimeControl()}/>
            <ReplayIcon id="reset" onClick={handleReset} />
          </div>
          <div>
          Session: <div id="timer-label">{timerType}</div> <div id="time-left">{FormatTime(timer)}</div>
          </div>          
        </div>
      </div>
    </div>
  );
}
    
export default App;

