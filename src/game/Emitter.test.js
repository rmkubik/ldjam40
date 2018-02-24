import DesktopIcon from './DesktopIcon';
import Emitter from './Emitter';
import GameState from './GameState';

import {emitterOnCooldown, emitterOffCooldown} from './TestHelpers';

let state;

beforeEach(() => {
    state = new GameState();
});

describe('Emitter functional mixin', () => {
    it('should add the emit function to an icon\'s prototype', () => {
        state.createDesktopIcon('a', {x: 0, y: 0});
        Emitter(state.desktopIcons[0], 'a', 1000);

        expect(state.desktopIcons[0].emit).toEqual(expect.anything());
        expect(state.desktopIcons[0].emitter.cooldown).toEqual(expect.anything());
        expect(state.desktopIcons[0].emitter.lastEmitTimestamp).toEqual(expect.anything());
    });
});

describe('emit function', () => {
    it('should not create icon when on cooldown', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});

        Emitter(desktopIcon, 'b', 1000);
        emitterOnCooldown(desktopIcon);

        desktopIcon.emit();

        expect(desktopIcon.emitter.emitted).toEqual(0);
    });

    it('should create icon of correct type when off cooldown', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});

        let emittedIconCopy;
        Emitter(desktopIcon, 'b', 1000, (spawnedIcon) => {
            emittedIconCopy = spawnedIcon;
        });
        emitterOffCooldown(desktopIcon);

        desktopIcon.emit();

        expect(desktopIcon.emitter.emitted).toEqual(1);
        expect(emittedIconCopy).toEqual('b');
    });

    it('should call onEmit if defined when an icon is emitted', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        const onEmitSpy = jest.fn();

        Emitter(desktopIcon, 'b', 1000, onEmitSpy);
        emitterOffCooldown(desktopIcon);

        desktopIcon.emit();

        expect(onEmitSpy).toHaveBeenCalledTimes(1);
    });

    it('should not call onEmit if defined when an icon is not emitted', () => {
        const desktopIcon = state.createDesktopIcon('a', {x: 0, y: 0});
        const onEmitSpy = jest.fn();

        Emitter(desktopIcon, 'b', 1000, onEmitSpy);
        emitterOnCooldown(desktopIcon);

        desktopIcon.emit();

        expect(onEmitSpy).toHaveBeenCalledTimes(0);
    });
});
