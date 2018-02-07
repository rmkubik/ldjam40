import DesktopIcon from './DesktopIcon';
import Emitter from './Emitter';
import GameState from './GameState';

let emitter;
let state;

beforeEach(() => {
    state = new GameState();
});

describe('Emitter functional mixin', () => {
    it('should add the emit function to an icon\'s prototype', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        Emitter(state.desktopIcons[0], state, 'a');
        
        expect(state.desktopIcons[0].emit).toEqual(expect.anything());
    });
});

describe('emit function', () => {
    it('should add a new desktopIcon to state of correct type', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        Emitter(state.desktopIcons[0], state, 'b');

        state.desktopIcons[0].emit();

        expect(state.desktopIcons[1].icon).toEqual('b');
    });

    it('should not emit when on cooldown', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        const desktopIcon = state.desktopIcons[0];

        Emitter(desktopIcon, state, 'b', 1000);
        desktopIcon.lastEmitTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
        Date.now = jest
            .genMockFunction()
            .mockReturnValue(
                new Date(`2018-01-01 12:00:00:${desktopIcon.emitCooldown - 1}`).getTime()
            );

        desktopIcon.emit();

        expect(state.desktopIcons.length).toEqual(1);
    });

    it('should emit when off cooldown', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        const desktopIcon = state.desktopIcons[0];

        Emitter(desktopIcon, state, 'b', 1000);
        desktopIcon.lastEmitTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
        Date.now = jest
            .genMockFunction()
            .mockReturnValue(
                new Date(`2018-01-01 12:00:00:${desktopIcon.emitCooldown + 1}`).getTime()
            );

        desktopIcon.emit();

        expect(state.desktopIcons.length).toEqual(2);
    });
});
