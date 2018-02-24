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
        Consumer(state.desktopIcons[0], state, 'a', 1000);

        expect(state.desktopIcons[0].consume).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.cooldown).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.lastConsumeTimestamp).toEqual(expect.anything());
    });
});

describe('consume function', () => {
    it('should consume icon', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(1);
    });

    it('should increment consumed count by 1', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume();

        expect(desktopIcon.consumer.consumed).toEqual(1);
    });

    it('should consume only one icon', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(2);
    });

    it('should not consume self', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'a', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(1);
    });

    it('should consume closest icon', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 1});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        const closerIconId = state.desktopIcons[2].id;

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(2);
        expect(state.desktopIcons.every(icon => icon.id !== closerIconId)).toBe(true);
    });

    it('should not consume icons out of range', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 10});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(2);
    });

    it('should not consume icons when on cooldown', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOnCooldown(desktopIcon);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(2);
    });

    it('should go on cooldown after consuming an icon', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000, 5);
        consumerOffCooldown(desktopIcon);

        desktopIcon.consume();

        expect(desktopIcon.consumer.lastConsumeTimestamp).toEqual(Date.now());
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
