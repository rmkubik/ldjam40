import React from 'react';

import PurchaseButton from './PurchaseButton';

function MenuBar(props) {
    return (
        <div>
            <p className="menubar">{`$${props.money}`}</p>
            {props.createButtons.map((createButton) => {
                return (<PurchaseButton
                    createDesktopIcon={props.createDesktopIcon}
                    icon={createButton.icon}
                    price={createButton.price}
                />)
            })}
        </div>
    )
}

export default MenuBar;
