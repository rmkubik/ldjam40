import DesktopIcon from './DesktopIcon';
import Consumer from './Consumer';
import GameState from './GameState';

let state;

beforeEach(() => {
    state = new GameState();
});

describe('Consumer functional mixin', () => {
    it('should add the consume function to an icon\'s prototype', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        Consumer(state.desktopIcons[0], 'a', 1000);

        expect(state.desktopIcons[0].consume).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.cooldown).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.lastConsumeTimestamp).toEqual(expect.anything());
    });
});

describe('consume function', () => {
    it('should consume icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(1);
    });

    it('should consume only one icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(1);
    });

    it('should not consume self', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});

        Consumer(desktopIcon, 'a', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(0);
    });

    it('should consume closest icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 1});
        const closerIcon = state.createDesktopIcon('b', {x: 0, y: 0});

        let consumedIconCopy;
        Consumer(desktopIcon, 'b', 1000, 5, (consumedIcon) => {
            consumedIconCopy = consumedIcon;
        });
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(1);
        expect(consumedIconCopy.id === closerIcon.id).toBe(true);
    });

    it('should not consume icons out of range', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 10});

        Consumer(desktopIcon, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(0);
    });

    it('should not consume icons when on cooldown', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, state.desktopIcons, 'b', 1000, 5);
        consumerOnCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(0);
    });

    it('should go on cooldown after consuming an icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.lastConsumeTimestamp).toEqual(Date.now());
    });

    it('should call onConsume if defined when an icon is consumed', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        const onConsumeSpy = jest.fn();

        Consumer(desktopIcon, 'b', 1000, 5, onConsumeSpy);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(onConsumeSpy).toHaveBeenCalledTimes(1);
    });


    it('should not call onConsume when an icon is not consumed', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        const onConsumeSpy = jest.fn();

        Consumer(desktopIcon, 'b', 1000, 5, onConsumeSpy);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(onConsumeSpy).toHaveBeenCalledTimes(0);
    });
});

function consumerOnCooldown(consumerIcon) {
    consumerIcon.consumer.lastConsumeTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .genMockFunction()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + consumerIcon.consumer.cooldown - 1
        );
}

function consumerOffCooldown(consumerIcon) {
    consumerIcon.consumer.lastConsumeTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .genMockFunction()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + consumerIcon.consumer.cooldown + 1
        );
}
