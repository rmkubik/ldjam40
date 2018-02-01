const Emitter = (desktopIcon, state, spawnedIcon) => {
    const emit = () => {
        state.createDesktopIcon(spawnedIcon, desktopIcon.position);
    }

    Object.assign(
        desktopIcon,
        { emit }
    )
}

export default Emitter;
