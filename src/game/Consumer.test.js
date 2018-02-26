import DesktopIcon from './DesktopIcon';
import Consumer from './Consumer';
import GameState from './GameState';

import {consumerOnCooldown, consumerOffCooldown} from './TestHelpers';

let state;

beforeEach(() => {
    state = new GameState();
});

describe('Consumer functional mixin', () => {
    it('should add the consume function to an icon\'s prototype', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        Consumer(state.desktopIcons[0], 'a', 1000, 5, 1);

        expect(state.desktopIcons[0].consume).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.cooldown).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.lastConsumeTimestamp).toEqual(expect.anything());
    });
});

describe('consume function', () => {
    it('should consume icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5, 1);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(1);
    });

    it('should consume only consumeAmount of icons', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5, 2);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(2);
    });

    it('should not consume self', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});

        Consumer(desktopIcon, 'a', 1000, 5, 1);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(0);
    });

    it('should consume closest icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 1});
        const closerIcon = state.createDesktopIcon('b', {x: 0, y: 0});

        let consumedIconCopy;
        Consumer(desktopIcon, 'b', 1000, 5, 1, (consumedIcons) => {
            consumedIconCopy = consumedIcons[0];
        });
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(1);
        expect(consumedIconCopy.id === closerIcon.id).toBe(true);
    });

    it('should consume only consumeable icon types', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        state.createDesktopIcon('c', {x: 0, y: 0});
        const otherIconType = state.createDesktopIcon('d', {x: 0, y: 0});

        let consumedIconIcons;
        Consumer(desktopIcon, ['b', 'c'], 1000, 5, 2, (consumedIcons) => {
            consumedIconIcons = consumedIcons.map(icon => icon.icon);
        });
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(2);
        expect(consumedIconIcons).toEqual(['b', 'c']);
    });

    it('should not consume icons out of range', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 10});

        Consumer(desktopIcon, 'b', 1000, 5, 1);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(0);
    });

    it('should not consume icons when on cooldown', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5, 1);
        consumerOnCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.consumed).toEqual(0);
    });

    it('should go on cooldown after consuming an icon', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        Consumer(desktopIcon, 'b', 1000, 5, 1);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(desktopIcon.consumer.lastConsumeTimestamp).toEqual(Date.now());
    });

    it('should call onConsume if defined when an icon is consumed', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        const onConsumeSpy = jest.fn();

        Consumer(desktopIcon, 'b', 1000, 5, 1, onConsumeSpy);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(onConsumeSpy).toHaveBeenCalledTimes(1);
    });


    it('should not call onConsume when an icon is not consumed', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        const onConsumeSpy = jest.fn();

        Consumer(desktopIcon, 'b', 1000, 5, 1, onConsumeSpy);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume(state.desktopIcons);

        expect(onConsumeSpy).toHaveBeenCalledTimes(0);
    });
});
