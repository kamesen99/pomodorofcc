import React, {useState} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { render } from '@testing-library/react';

const Counter = (props) => {
    
    const [timer, setTimer] = useState(props.timer);

    React.useEffect(() => {
        timer > 0 && setTimeout(() => setTimer(timer - 1), 1000)
    })
    
    return(
        
        <div id="timer-label">
            <p id="time-left">Session {timer}</p>
        </div>
    )
    
}

export default Counter;