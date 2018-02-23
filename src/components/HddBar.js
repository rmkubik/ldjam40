import React from 'react';

function HddBar(props) {
    return (
        <div className="hddbar">
            <label>HDD Space: </label>
            <progress value={props.current} max={props.max}></progress>
        </div>
    )
}

export default HddBar;
