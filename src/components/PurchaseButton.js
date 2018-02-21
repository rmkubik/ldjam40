import React from 'react';

function PurchaseButton(props) {
    const {icon, createDesktopIcon, price} = props;
    return (
        <button onClick={() => createDesktopIcon(icon, {x: 0, y: 0})}>
            {`${icon} - $${price}`}
        </button>
    )
}

export default PurchaseButton;
