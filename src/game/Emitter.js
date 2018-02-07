const Emitter = (desktopIcon, state, spawnedIcon) => {
    const emit = () => {
        const nextEmitTimestamp = desktopIcon.emitter.lastEmitTimestamp
            + desktopIcon.emitter.cooldown;
        const currentTimestamp = Date.now();
        if (currentTimestamp >= nextEmitTimestamp) {
            state.createDesktopIcon(spawnedIcon, desktopIcon.position);
            desktopIcon.emitter.lastEmitTimestamp = currentTimestamp;
        }
    }

    Object.assign(
        desktopIcon,
        {
            emit,
            emitter: {
                lastEmitTimestamp: Date.now(),
                cooldown: 1000
            }
        }
    )
}

export default Emitter;
