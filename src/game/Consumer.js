const Consumer = (desktopIcon, state, consumedIcon, cooldown) => {
    const consume = () => {
        // find all desktopIcons of given type
        const consumableIcons = state.desktopIcons.filter((desktopIcon) => {
            return desktopIcon.icon === consumedIcon;
        });
        // is consumer off cooldown?
        // is target icon in range?
        // which icon is closest?
        // removeDesktopIcon
        state.removeDesktopIcon(consumableIcons[0].id);
    }

    Object.assign(
        desktopIcon,
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
