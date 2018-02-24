import {findEuclideanDistance} from './Helpers';

const Consumer = (consumerIcon, consumedIcon, cooldown, range, onConsume) => {
    const consume = (desktopIcons) => {
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

        const consumableIcons = desktopIcons.filter(consumeableFilter);

        if (consumableIcons.length === 0) return;

        const closestIcon = consumableIcons.reduce((closestIcon, currentIcon) => {
            return findEuclideanDistance(currentIcon.position, consumerIcon.position)
                < findEuclideanDistance(closestIcon.position, consumerIcon.position)
                    ? currentIcon
                    : closestIcon
        });

        if (findEuclideanDistance(closestIcon.position, consumerIcon.position) <= range) {
            consumerIcon.consumer.consumed++;
            consumerIcon.consumer.lastConsumeTimestamp = currentTimestamp;
            onConsume && onConsume(closestIcon);
        }
    }

    Object.assign(
        consumerIcon,
        {
            consume,
            consumer: {
                lastConsumeTimestamp: Date.now(),
                cooldown,
                consumed: 0
            }
        }
    )
}

export default Consumer;
