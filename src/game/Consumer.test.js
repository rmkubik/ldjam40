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
        Consumer(desktopIcon, state, 'b', 1000);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(1);
    });

    it('should consume only one icon', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(2);
    });

    it('should not consume self', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'a', 1000);

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(1);
    });

    it('should consume closest icon', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        state.createDesktopIcon('b', {x: 0, y: 1});
        state.createDesktopIcon('b', {x: 0, y: 0});

        const desktopIcon = state.desktopIcons[0];
        Consumer(desktopIcon, state, 'b', 1000);

        const closerIconId = state.desktopIcons[2].id;

        desktopIcon.consume();

        expect(state.desktopIcons.length).toEqual(2);
        expect(state.desktopIcons.every(icon => icon.id !== closerIconId)).toBe(true);
    });
});
