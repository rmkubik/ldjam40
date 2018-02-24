import DesktopIcon from './DesktopIcon';
import Emitter from './Emitter';
import GameState from './GameState';

let state;

beforeEach(() => {
    state = new GameState();
});

describe('Emitter functional mixin', () => {
    it('should add the emit function to an icon\'s prototype', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        Emitter(state.desktopIcons[0], state, 'a', 1000);

        expect(state.desktopIcons[0].emit).toEqual(expect.anything());
        expect(state.desktopIcons[0].emitter.cooldown).toEqual(expect.anything());
        expect(state.desktopIcons[0].emitter.lastEmitTimestamp).toEqual(expect.anything());
    });
});

describe('emit function', () => {
    it('should not create icon when on cooldown', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});

        Emitter(desktopIcon, state, 'b', 1000);
        emitterOnCooldown(desktopIcon);

        desktopIcon.emit();

        expect(state.desktopIcons.length).toEqual(1);
    });

    it('should create icon of correct type when off cooldown', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});

        Emitter(desktopIcon, state, 'b', 1000);
        emitterOffCooldown(desktopIcon);

        desktopIcon.emit();

        expect(state.desktopIcons.length).toEqual(2);
        expect(state.desktopIcons[1].icon).toEqual('b');
    });

    it('should call onEmit if defined when an icon is emitted', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        const onEmitSpy = jest.fn();

        Emitter(desktopIcon, state, 'b', 1000, onEmitSpy);
        emitterOffCooldown(desktopIcon);

        desktopIcon.emit();

        expect(onEmitSpy).toHaveBeenCalledTimes(1);
    });

    // TODO: Not call onEmit test
});

function emitterOnCooldown(emitterIcon) {
    emitterIcon.emitter.lastEmitTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .genMockFunction()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + emitterIcon.emitter.cooldown - 1
        );
}

function emitterOffCooldown(emitterIcon) {
    emitterIcon.emitter.lastEmitTimestamp = new Date('2018-01-01 12:00:00:0000').getTime();
    Date.now = jest
        .genMockFunction()
        .mockReturnValue(
            new Date('2018-01-01 12:00:00:0000').getTime()
                + emitterIcon.emitter.cooldown + 1
        );
}
