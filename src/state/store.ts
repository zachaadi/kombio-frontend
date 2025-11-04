import { configureStore } from "@reduxjs/toolkit";
import chatMessageReducer from "./ChatMessage/ChatMessageSlice";

export const store = configureStore({
  reducer: {
    chatmessage: chatMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
