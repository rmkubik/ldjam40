import React from 'react';

import PurchaseButton from './PurchaseButton';

function MenuBar(props) {
    return (
        <div>
            <p className="menubar">{`$${props.money}`}</p>
            {props.createButtons.map((createButton, index) => {
                return (<PurchaseButton
                    purchaseDesktopIcon={props.purchaseDesktopIcon}
                    icon={createButton.icon}
                    price={createButton.price}
                    key={index}
                />)
            })}
        </div>
    )
}

export default MenuBar;
