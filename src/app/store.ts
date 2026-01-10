import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../components/chat/ChatSlice";
import playerReducer from "../components/player/PlayerSlice";
import gameReducer from "../components/game-room/GameSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    player: playerReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
