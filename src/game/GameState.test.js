import GameState from './GameState';

let state;

beforeEach(() => {
    state = new GameState();
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
