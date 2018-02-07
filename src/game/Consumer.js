const Consumer = (desktopIcon, state, consumedIcon) => {
    const consume = () => {

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
