import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

let state;

beforeEach(() => {
    state = new GameState();
});

describe('create desktop icon function', () => {
    it('should add a correctly populated DesktopIcon to game state', () => {
        const icon = "test";
        const position = {x: 0, y: 0};

        state.createDesktopIcon(icon, position);

        const desktopIcon = state.desktopIcons[0];
        expect(desktopIcon).toEqual(expect.any(DesktopIcon));
        expect(desktopIcon.icon).toEqual(icon);
        expect(desktopIcon.position).toEqual(position);
    });

    it('should correctly add multiple DesktopIcons to state', () => {
        const position = {x: 0, y: 0};
        const icons = ['a','b','c'];

        icons.forEach((icon) => {
            state.createDesktopIcon(icon, position);
        });

        const {desktopIcons} = state;

        expect(desktopIcons.length).toEqual(icons.length);
        desktopIcons.forEach((desktopIcon, index) => {
            expect(desktopIcon.icon).toEqual(icons[index]);
        });
    });

    it('should assign new DesktopIcons an id', () => {
        const icon = "test";
        const position = {x: 0, y: 0};

        state.createDesktopIcon(icon, position);

        const desktopIcon = state.desktopIcons[0];
        expect(desktopIcon.id).toEqual(expect.anything());
    });
});

describe('remove icon from state function', () => {
    it('should remove icon from state', () => {
        state.desktopIcons = [
            new DesktopIcon('a', {}, 1),
            new DesktopIcon('b', {}, 2),
            new DesktopIcon('c', {}, 3)
        ];

        state.removeDesktopIcon(2);

        expect(state.desktopIcons.length).toEqual(2);
    });

    it('should remove no icons from state if index is not found', () => {
        state.desktopIcons = [
            new DesktopIcon('a', {}, 1),
            new DesktopIcon('b', {}, 2),
            new DesktopIcon('c', {}, 3)
        ];

        state.removeDesktopIcon(0);

        expect(state.desktopIcons.length).toEqual(3);
    });
});

describe('getNextIconId function', () => {
    it('should return a number', () => {
        const id = state.getNextIconId();

        expect(typeof id).toEqual('number');
    });

    it('should return a different value in subsequent calls', () => {
        const firstId = state.getNextIconId();
        const secondId = state.getNextIconId();

        expect(firstId).not.toEqual(secondId);
    });
});

describe('find icon index by id function', () => {
    it('should return the index of an icon with a given id', () => {
        state.desktopIcons = [
            new DesktopIcon('a', {}, 1),
            new DesktopIcon('b', {}, 2),
            new DesktopIcon('c', {}, 3)
        ];

        const iconIndex = state.findDesktopIconIndexById(2);
        expect(iconIndex).toEqual(1);
    });
});
