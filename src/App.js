import React, {useState} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Counter from "./components/Counter"
import './App.css';

function App() {

  const [breakTime, setBreakTime] = useState(5);
  const [session, setSession] = useState(25);
  
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
        <div className="section">
          <Counter timer={session} />
        </div>
      </div>
       
    </div>
  );
}

export default App;
//
