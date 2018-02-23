import React from 'react';

import PurchaseButton from './PurchaseButton';
import HddBar from './HddBar';

function MenuBar(props) {
    return (
        <div>
            <p className="money">{`$${props.money}`}</p>
            {props.createButtons.map((createButton, index) => {
                return (
                    <PurchaseButton
                        purchaseDesktopIcon={props.purchaseDesktopIcon}
                        icon={createButton.icon}
                        price={createButton.price}
                        key={index}
                    />
                )
            })}
            <HddBar
                current={props.hdd.current}
                max={props.hdd.max}
            />
        </div>
    )
}

export default MenuBar;
