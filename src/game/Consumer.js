import {findEuclideanDistance} from './Helpers';

const Consumer = (consumerIcon, state, consumedIcon, cooldown, range) => {
    const consume = () => {
        const nextConsumeTimestamp = consumerIcon.consumer.lastConsumeTimestamp
            + consumerIcon.consumer.cooldown;
        const currentTimestamp = Date.now();

        if (currentTimestamp < nextConsumeTimestamp) return;

        const consumableIcons = state.desktopIcons.filter((desktopIcon) => {
            return desktopIcon.icon === consumedIcon
                && consumerIcon.id !== desktopIcon.id;
        });

        if (consumableIcons.length === 0) return;

        const closestIcon = consumableIcons.reduce((closestIcon, currentIcon) => {
            return findEuclideanDistance(currentIcon.position, consumerIcon.position)
                < findEuclideanDistance(closestIcon.position, consumerIcon.position)
                    ? currentIcon
                    : closestIcon
        });

        if (findEuclideanDistance(closestIcon.position, consumerIcon.position) <= range) {
            state.removeDesktopIcon(closestIcon.id);
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
