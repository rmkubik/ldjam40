const Emitter = (desktopIcon, state, spawnedIcon) => {
    const emit = () => {
        state.createDesktopIcon(desktopIcon.icon, desktopIcon.position);
    }

    Object.assign(
        desktopIcon,
        { emit }
    )
}

export default Emitter;
