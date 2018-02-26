import {findEuclideanDistance} from './Helpers';

const Consumer = (consumerIcon, consumedIcons, cooldown, range, consumeAmount, onConsume) => {
    const consume = (desktopIcons) => {
        const nextConsumeTimestamp = consumerIcon.consumer.lastConsumeTimestamp
            + consumerIcon.consumer.cooldown;
        const currentTimestamp = Date.now();

        if (currentTimestamp < nextConsumeTimestamp) return;

        const consumeableFilter = consumedIcons
            ? (desktopIcon) => {
                return consumerIcon.id !== desktopIcon.id
                    && findEuclideanDistance(desktopIcon.position, consumerIcon.position) <= range
                    && consumedIcons.includes(desktopIcon.icon);
            }
            : (desktopIcon) => {
                return consumerIcon.id !== desktopIcon.id
                    && findEuclideanDistance(desktopIcon.position, consumerIcon.position) <= range;
            }
        const consumableIcons = desktopIcons.filter(consumeableFilter);

        if (consumableIcons.length > 0) {

            const sortedIcons = [...consumableIcons].sort((a, b) => {
                return findEuclideanDistance(a.position, consumerIcon.position)
                    - findEuclideanDistance(b.position, consumerIcon.position);
            });

            const consumedIcons = sortedIcons.slice(0, consumeAmount);

            consumerIcon.consumer.consumed += consumedIcons.length;
            consumerIcon.consumer.lastConsumeTimestamp = currentTimestamp;
            onConsume && onConsume(consumedIcons);
        }
    }

    Object.assign(
        consumerIcon,
        {
            consume,
            consumer: {
                lastConsumeTimestamp: Date.now(),
                cooldown,
                consumeAmount,
                consumed: 0
            }
        }
    )
}

export default Consumer;
