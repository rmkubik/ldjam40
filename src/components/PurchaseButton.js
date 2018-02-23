import React from 'react';

function PurchaseButton(props) {
    const {icon, purchaseDesktopIcon, price} = props;
    return (
        <button onClick={() => purchaseDesktopIcon(icon, price, {x: 0, y: 0})}>
            {`${icon} - $${price}`}
        </button>
    )
}

export default PurchaseButton;
