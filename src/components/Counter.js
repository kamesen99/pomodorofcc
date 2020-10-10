import React, {useState} from 'react';
//import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
//import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
//import { render } from '@testing-library/react';

const Counter = (props) => {
    
    //console.log(timeInSeconds)
    const [timer, setTimer] = useState(props.timer * 60);

    const timeToFormat = (minutes, seconds) => {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return (minutes + ":" + seconds);
    }
    
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    let format = (timeToFormat(minutes, seconds))

    React.useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
    })
    
    return(
        
        <div id="timer-label">
            <p id="time-left">Session {format}</p>
        </div>
    )
    
}

export default Counter;