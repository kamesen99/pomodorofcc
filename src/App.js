import React, {useState, useRef} from 'react';
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
  const [timerType, setTimerType] = useState(true);
  // true = "Session"
  const [timerID, setTimerID] = useState("");
  const [timer, setTimer] = useState(25*60);
  const timerRef = useRef(null);
  const timerIDRef = useRef(null);
  const audio = useRef(null);
  const sessionRef = useRef(null);
  const breakRef = useRef(null);
  const timerTypeRef = useRef(null);

  timerRef.current = timer;
  timerIDRef.current = timerID;
  sessionRef.current = sessionTime;
  breakRef.current = breakTime;
  timerTypeRef.current = timerType;

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
    setTimer(timer => timer - 1);
  }

  const switchSessionType = (time, type) => {
    setTimer(time);
    setTimerType(type);
  }
  
  
  const phaseControl = () => {
    let time = getLastTime();
    let timerID = getTimerID();
    let timerType = getTimerType();
    console.log(time)
    if (time === 0) {
      audio.current.play();
    }
    if (time < 0) {
      if (timerID) {
        timerID.cancel();
      }
      if (timerType === false) {
        let session = getSession();
        switchSessionType(session*60, !timerType);
        startCountDown();
      } else {
        let breakTimeRef = getBreak();
        switchSessionType(breakTimeRef*60, !timerType);
        startCountDown();
      }
    }
  }
  
  const getLastTime = () => {
    return timerRef.current;
  };
  const getTimerID = () => {
    return timerIDRef.current;
  };
  const getTimerType = () => {
    return timerTypeRef.current;
  }
  const getSession = () => {
    return sessionRef.current;
  };
  const getBreak = () => {
    return breakRef.current;
  }
  
  const handleReset = () => {
    let timerID = getTimerID();
    if (timerID) {
      timerID.cancel();
    }
    setBreakTime(5);
    setSessionTime(25);
    setTimerState("stopped");
    setTimerType(true);
    setTimerID("");
    setTimer(25*60);
    audio.current.pause();
    audio.current.currentTime = 0;
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
            <button id="break-decrement" onClick={() => handleClickDown(breakTime, false, setBreakTime)}>
              <i className="fa fa-arrow-down" />
            </button>
            <p id="break-length" >{breakTime}</p>:00
            <button id="break-increment" onClick={() => handleClickUp(breakTime, false, setBreakTime)}>
              <i className="fa fa-arrow-up" />
            </button>
          </div>
          <div id="session-label">
            <button id="session-decrement" onClick={() => handleClickDown(sessionTime, true, setSessionTime)}>
              <i className="fa fa-arrow-down" />
            </button>
            <p id="session-length" >{sessionTime}</p>:00
            <button id="session-increment" onClick={() => handleClickUp(sessionTime, true, setSessionTime)}>
              <i className="fa fa-arrow-up" />
            </button>
          </div>
        </div> 
        <div className="timer-section">
          <div className="button-row">
            <button id="start_stop" onClick={() => TimeControl()}>
              <i className="fa fa-play" />
              <i className="fa fa-pause" />
            </button>
            <button id="reset" onClick={handleReset}>
              <i className="fa fa-retweet fa-2x" />
            </button>
          </div>
          <div>
          Session: <div id="timer-label">{timerType ? "Session" : "Break"}</div> <p id="time-left">{FormatTime(timer)}</p>
          </div>
          <audio
            id="beep"
            preload="auto"
            ref={audio}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />          
        </div>
      </div>
    </div>
  );
}
    
export default App;
