import {findEuclideanDistance} from './Helpers';

const Consumer = (consumerIcon, state, consumedIcon, cooldown) => {
    const consume = () => {
        const consumableIcons = state.desktopIcons.filter((desktopIcon) => {
            return desktopIcon.icon === consumedIcon
                && consumerIcon.id !== desktopIcon.id;
        });

        if (consumableIcons.length === 0) return;
        // is consumer off cooldown?
        // is target icon in range?

        const closestIcon = consumableIcons.reduce((closestIcon, currentIcon) => {
            return findEuclideanDistance(currentIcon.position, consumerIcon.position)
                < findEuclideanDistance(closestIcon.position, consumerIcon.position)
                    ? currentIcon
                    : closestIcon
        });

        state.removeDesktopIcon(closestIcon.id);
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
