const Consumer = (consumerIcon, state, consumedIcon, cooldown) => {
    const consume = () => {
        // find all desktopIcons of given type
        const consumableIcons = state.desktopIcons.filter((desktopIcon) => {
            return desktopIcon.icon === consumedIcon
                && consumerIcon.id !== desktopIcon.id;
        });
        // is consumer off cooldown?
        // is target icon in range?
        // which icon is closest?
        // removeDesktopIcon
        if (consumableIcons.length > 0) {
            state.removeDesktopIcon(consumableIcons[0].id);
        }
    }

    Object.assign(
        consumerIcon,
        {
            consume,
            consumer: {
                lastConsumeTimestamp: Date.now(),
                cooldown: 1000
            }
        }
    )
}

export default Consumer;
