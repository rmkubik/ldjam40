export function consumerOnCooldown(consumerIcon) {
    consumerIcon.consumer.lastConsumeTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .fn()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + consumerIcon.consumer.cooldown - 1
        );
}

export function consumerOffCooldown(consumerIcon) {
    consumerIcon.consumer.lastConsumeTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .fn()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + consumerIcon.consumer.cooldown + 1
        );
}

export function emitterOnCooldown(emitterIcon) {
    emitterIcon.emitter.lastEmitTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .genMockFunction()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + emitterIcon.emitter.cooldown - 1
        );
}

export function emitterOffCooldown(emitterIcon) {
    emitterIcon.emitter.lastEmitTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .genMockFunction()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + emitterIcon.emitter.cooldown + 1
        );
}
