import React, {useState} from 'react';

const Counter = (props) => {
    
    const [timer, setTimer] = useState(props.timer * 60);

    const timeToFormat = (minutes, seconds) => {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return (minutes + ":" + seconds);
    }
    
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    let formatted = (timeToFormat(minutes, seconds))

    const countDown = () =>{
        setTimeout(() => setTimer(timer - 1), 1000)
    }

    console.log("Pause is "+ props.pause)

    React.useEffect(() => {
        timer > 0 && (!props.pause && countDown());
    })
    
    return(
        <div id="timer-label">
            <p id="time-left">{formatted}</p>
        </div>
    )
}

export default Counter;