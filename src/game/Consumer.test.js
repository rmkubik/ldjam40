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
        Consumer(state.desktopIcons[0], state, 'a');

        expect(state.desktopIcons[0].consume).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.cooldown).toEqual(expect.anything());
        expect(state.desktopIcons[0].consumer.lastConsumeTimestamp).toEqual(expect.anything());
    });
});
