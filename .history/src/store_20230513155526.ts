import { GameState } from "./types/state";

const store = createStore({
  state: {
    canvas: null,
    gameState: GameState.NEW_GAME,
  },
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
});
export default store;
function createStore(arg0: { state: { canvas: null; gameState: "new_game"; }; getters: { canvas: (state: any) => any; gameState: (state: any) => any; }; mutations: { setCanvas(state: any, canvas: any): void; setGameState(state: any, gameState: any): void; }; actions: { ...; }; }) {
    throw new Error("Function not implemented.");
}

