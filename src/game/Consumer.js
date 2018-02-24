import {findEuclideanDistance} from './Helpers';

const Consumer = (consumerIcon, state, consumedIcon, cooldown, range, onConsume) => {
    const consume = () => {
        const nextConsumeTimestamp = consumerIcon.consumer.lastConsumeTimestamp
            + consumerIcon.consumer.cooldown;
        const currentTimestamp = Date.now();

        if (currentTimestamp < nextConsumeTimestamp) return;

        const consumeableFilter = consumedIcon ?
            (desktopIcon) => {
                return desktopIcon.icon === consumedIcon
                    && consumerIcon.id !== desktopIcon.id;
            }
            :
            (desktopIcon) => consumerIcon.id !== desktopIcon.id;

        const consumableIcons = state.desktopIcons.filter(consumeableFilter);

        if (consumableIcons.length === 0) return;

        const closestIcon = consumableIcons.reduce((closestIcon, currentIcon) => {
            return findEuclideanDistance(currentIcon.position, consumerIcon.position)
                < findEuclideanDistance(closestIcon.position, consumerIcon.position)
                    ? currentIcon
                    : closestIcon
        });

        if (findEuclideanDistance(closestIcon.position, consumerIcon.position) <= range) {
            state.removeDesktopIcon(closestIcon.id);
            state.money++;
            consumerIcon.consumer.consumed++;
            consumerIcon.consumer.lastConsumeTimestamp = currentTimestamp;
            onConsume && onConsume(consumerIcon, consumedIcon);
        }
    }

    Object.assign(
        consumerIcon,
        {
            consume,
            consumer: {
                lastConsumeTimestamp: Date.now(),
                cooldown: 1000,
                consumed: 0
            }
        }
    )
}

export default Consumer;
