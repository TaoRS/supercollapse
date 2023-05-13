export const GameState = {
  NEW_GAME: "new_game",
  PLAYING: "playing",
  PAUSED: "paused",
  GAME_OVER: "game_over",
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];
