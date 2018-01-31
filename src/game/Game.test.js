import Game from './Game';
import GameState from './GameState';
import DesktopIcon from './DesktopIcon';

let game;

beforeEach(() => {
    game = new Game();
})

it('should have state object', () => {
  expect(game.state).toEqual(expect.any(GameState));
});

it('should have icon types', () => {
    expect(game.iconTypes).toEqual(expect.anything());
});

describe('create desktop icon function', () => {
    it('should add a correctly populated DesktopIcon to game state', () => {
        const icon = "test";
        const position = {x: 0, y: 0};

        game.createDesktopIcon(icon, position);

        const desktopIcon = game.state.desktopIcons[0];
        expect(desktopIcon).toEqual(expect.any(DesktopIcon));
        expect(desktopIcon.icon).toEqual(icon);
        expect(desktopIcon.position).toEqual(position);
    });

    it('should correctly add multiple DesktopIcons to state', () => {
        const position = {x: 0, y: 0};
        const icons = ['a','b','c'];

        icons.forEach((icon) => {
            game.createDesktopIcon(icon, position);
        });

        const {desktopIcons} = game.state;

        expect(desktopIcons.length).toEqual(icons.length);
        desktopIcons.forEach((desktopIcon, index) => {
            expect(desktopIcon.icon).toEqual(icons[index]);
        });
    });

    it('should assign new DesktopIcons an id', () => {
        const icon = "test";
        const position = {x: 0, y: 0};

        game.createDesktopIcon(icon, position);

        const desktopIcon = game.state.desktopIcons[0];
        expect(desktopIcon.id).toEqual(expect.anything());
    });
});

describe('init game function', () => {
    it('should start the game with 2 icons', () => {
        game.init();

        expect(game.state.desktopIcons.length).toEqual(2);
    });
});

describe('find icon index by id function', () => {
    it('should return the index of an icon with a given id', () => {
        const desktopIcons = [
            new DesktopIcon('a', {}, 1),
            new DesktopIcon('b', {}, 2),
            new DesktopIcon('c', {}, 3)
        ]

        const iconIndex = game.findDesktopIconIndexById(2);
        expect(iconIndex).toEqual(1);
    });
});
