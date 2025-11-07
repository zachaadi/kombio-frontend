import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  name: string;
  isReady: boolean;
  role: string;
  isActive: boolean;
}

interface PlayerState {
  players: Player[];
}

const initialState: PlayerState = {
  players: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    getPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
  },
});

export const { getPlayers } = playerSlice.actions;

export default playerSlice.reducer;
