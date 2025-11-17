import { configureStore } from "@reduxjs/toolkit";
import chatMessageReducer from "../components/chat/ChatMessageSlice";
import playerReducer from "../components/player/PlayerSlice";

export const store = configureStore({
  reducer: {
    chatmessage: chatMessageReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
