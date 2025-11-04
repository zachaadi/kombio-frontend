import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatMessage {
  name: string;
  message: string;
}

interface ChatMessageState {
  messages: ChatMessage[];
}

const initialState: ChatMessageState = {
  messages: [],
};

const chatMessageSlice = createSlice({
  name: "chatmessage",
  initialState,
  reducers: {
    getMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { getMessages } = chatMessageSlice.actions;

export default chatMessageSlice.reducer;
