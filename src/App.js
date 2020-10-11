import React, {useState, useEffect} from 'react';
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
  const [session, setSession] = useState(25);
  const [timerStopped, setTimerStopped] = useState(true);
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
    setTimerStopped(!timerStopped);
  }

  const handleReset = () => {
    setBreakTime(5);
    setSession(25);
    document.getElementById('time-left').innerHTML = "25:00";
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
            <ArrowDownwardIcon id="session-decrement" onClick={() => handleClickDown(session, setSession)} style={{marginRight: "1rem"}}/>
              <p id="session-length" >{session}</p>:00
            <ArrowUpwardIcon id="session-increment" onClick={() => handleClickUp(session, setSession)} style={{marginLeft: "1rem"}}/>
          </div>
        </div> 
        <div className="timer-section">
          <div className="button-row">
            <SkipNextIcon id="start_stop" onClick={handleStartStop}/>
            <ReplayIcon id="reset" onClick={handleReset} />
          </div>
          <div></div>
          <div>
          Session {!timerStopped
                ? <Counter timer={session} pause={false}/> 
                : <Counter timer={session} pause={true}/>}
          </div>
        </div>
      </div>
       
    </div>
  );
}

export default App;
//
