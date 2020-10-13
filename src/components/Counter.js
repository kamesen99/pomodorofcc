import React, {useState} from 'react';
import {
    IconButton
  } from '@material-ui/core';

  import {
    SkipNext
  } from '@material-ui/icons';

const Counter = (props) => {
    
    const [currentTime, setCurrentTime] = useState(props.startTime * 60);
    const [timerId, setTimerId] = useState(null);
    const [isPaused, setIsPaused] = useState(true);

    const timeToFormat = (minutes, seconds) => {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return (minutes + ":" + seconds);
    }
    
    const handlePause = () => {
        if (!isPaused) {
            clearInterval(timerId);
        }
        setIsPaused(!isPaused);
    }

    const decrementTime = () => {
        setCurrentTime(currentTime => currentTime - 1);
    };

    const countDown = () => {
        setTimerId(setInterval(decrementTime, 1000));
    }

    React.useEffect(() => {
        if (currentTime > 0 && !isPaused) {
            countDown();
        }
    }, [isPaused]);

    let min = Math.floor(currentTime / 60);
    let sec = currentTime % 60;
    let formatted = (timeToFormat(min, sec))

    return (
            <div id="timer-label">
                <IconButton
                    id="start_stop"
                    onClick={handlePause}
                >
                    <SkipNext />
                </IconButton>
                <p id="time-left">{formatted}</p>
            </div>
    )
}

export default Counter;