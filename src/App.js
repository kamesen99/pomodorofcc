import React from 'react';
import BreakTimer from './components/BreakTimer';
import SessionTimer from './components/SessionTimer';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>FCC: A Pomodoro Counter</p>

      </header>
      <div className="App-body">
        <BreakTimer />
        <SessionTimer />
      </div>
    </div>
  );
}

export default App;
