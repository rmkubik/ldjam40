import Game from './Game';

const game = new Game();

it('should have state', () => {
  expect(game.state).toBeDefined();
});
