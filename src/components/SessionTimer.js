import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function SessionTimer() {
    return(
    <div id="session-label">
    <ArrowDownwardIcon id="session-decrement" style={{marginRight: "1rem"}}/>25:00<ArrowUpwardIcon id="session-increment" style={{marginLeft: "1rem"}}/>
    </div>
    )
}

export default SessionTimer;