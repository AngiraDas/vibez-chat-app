import { createSlice } from "@reduxjs/toolkit";
const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
  serialize:false,
});
export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
