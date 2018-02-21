import React from 'react';

function MenuBar(props) {
    return (
        <p className="menubar">{`$${props.money}`}</p>
    )
}

export default MenuBar;
