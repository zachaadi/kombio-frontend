import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
  name: string;
  message: string;
}

interface ChatState {
  messages: Chat[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<Chat[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;
