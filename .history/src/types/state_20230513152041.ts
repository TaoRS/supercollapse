const GameState = {
  PLAYING: 0,
  GAME_OVER: 1,
  PAUSED: 2,
} as const;

type GameState = (typeof GameState)[keyof typeof GameState];
