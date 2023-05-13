export const GameState = {
  PLAYING: "playing",
  GAME_OVER: "game_over",
  PAUSED: "paused",
  NEW_GAME: "new_game",
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];

export let gameState: GameState = GameState.NEW_GAME;

// get setter gamestate
