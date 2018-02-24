const Emitter = (desktopIcon, spawnedIcon, cooldown, onEmit) => {
    const emit = () => {
        const nextEmitTimestamp = desktopIcon.emitter.lastEmitTimestamp
            + desktopIcon.emitter.cooldown;
        const currentTimestamp = Date.now();
        if (currentTimestamp >= nextEmitTimestamp) {
            desktopIcon.emitter.lastEmitTimestamp = currentTimestamp;
            onEmit && onEmit(spawnedIcon, desktopIcon.position);
            desktopIcon.emitter.emitted++;
        }
    }

    Object.assign(
        desktopIcon,
        {
            emit,
            emitter: {
                lastEmitTimestamp: Date.now(),
                cooldown,
                emitted: 0
            }
        }
    )
}

export default Emitter;
