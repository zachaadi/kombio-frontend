import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../components/chat/ChatSlice";
import playerReducer from "../components/player/PlayerSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
