import React, {useState} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function BreakTimer() {
    
    const [timer, setTimer] = useState(5);

    const handleClickDown = () =>{
        setTimer(timer - 1);
    }

    const handleClickUp = () =>{
        setTimer(timer + 1);
    }

    return(
    <div id="break-label" style={{marginBottom: "2rem"}}>
        <ArrowDownwardIcon id="break-decrement" onClick={() => handleClickDown()} style={{marginRight: "1rem", marginTop: "1.5rem"}}/>
            <div style={{marginTop: "1.5rem", display: "flex"}}>
                <p id="break-length" style={{marginTop: "0"}} >{timer}</p>:00
            </div>
        <ArrowUpwardIcon id="break-increment" onClick={() => handleClickUp()}style={{marginLeft: "1rem", marginTop: "1.5rem"}}/>
    </div>
    )
}

export default BreakTimer;