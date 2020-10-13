import React, { useState } from 'react';

import {
  IconButton
} from '@material-ui/core';

import {
  ArrowDownward,
  ArrowUpward,
  SkipNext,
  Replay
} from '@material-ui/icons';

import Counter from "./components/Counter"
import './App.css';

const defaultSessionTime = 25;
const defaultBreakTime = 5;

function App() {

  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);

  const handleBreakUp = () => {
    setBreakTime(breakTime + 1);
  }

  const handleBreakDown = () => {
    setBreakTime(breakTime - 1);
  }

  const handleSessionDown = () => {
    setSessionTime(sessionTime - 1)
  }

  const handleSessionUp = () => {
    setSessionTime(sessionTime + 1)
  }

  const handleReset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
  }
  let startTime = sessionTime;

  return (

    <div className="App">
      <header className="App-header">
        <p>FCC: A Pomodoro Counter</p>
      </header>
      <div className="App-body">
        <div className="section">
          <div id="break-label">
            <ArrowDownward id="break-decrement" onClick={() => handleBreakDown()} style={{ marginRight: "1rem" }} />
            <p id="break-length" >{breakTime}</p>:00
            <ArrowUpward id="break-increment" onClick={() => handleBreakUp()} style={{ marginLeft: "1rem" }} />
          </div>
          <div id="session-label">
            <ArrowDownward id="session-decrement" onClick={() => handleSessionDown()} style={{ marginRight: "1rem" }} />
            <p id="session-length" >{sessionTime}</p>:00
            <ArrowUpward id="session-increment" onClick={() => handleSessionUp()} style={{ marginLeft: "1rem" }} />
          </div>
        </div>
        <div className="timer-section">
          <div className="button-row">
            <div>
              
              <IconButton
                id="reset"
                onClick={handleReset}
              >
                <Replay />
              </IconButton>
            </div>
          </div>
          <div></div>
          <div>
            Session {<Counter startTime={startTime}/>}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
//'[l;.