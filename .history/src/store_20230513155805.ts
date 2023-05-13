import { GameState } from "./types/state";

const store = {
  state: {
    canvas: null,
    gameState: GameState.NEW_GAME,
  },
};

  getters: {
    canvas: (state) => state.canvas,
    gameState: (state) => state.gameState,
  },
  mutations: {
    setCanvas(state, canvas) {
      state.canvas = canvas;
    },
    setGameState(state, gameState) {
      state.gameState = gameState;
    },
  },
  actions: {
    setCanvas({ commit }, canvas) {
      commit("setCanvas", canvas);
    },
    setGameState({ commit }, gameState) {
      commit("setGameState", gameState);
    },
  },
};
export default store;
