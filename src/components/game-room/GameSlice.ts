import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  flippedBy: string;
}
interface Deck {
  cards: Card[];
}

export interface Game {
  turnIndex: number;
  actions: string[];
  deck: Deck;
}

interface GameState {
  game: Game | null;
}

const initialState: GameState = {
  game: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      state.game = action.payload;
    },
    setAction: (state, action: PayloadAction<string[]>) => {
      if (state.game) {
        state.game.actions = action.payload;
      }
    },
  },
});

export const { setGame, setAction } = gameSlice.actions;

export default gameSlice.reducer;
