import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticatedUser: null,
    otherUsers: null,
    chosenUser: null,
    onlineUsers: null,
  },

  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setChosenUser: (state, action) => {
      state.chosenUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export const {setOnlineUsers,setChosenUser,setAuthenticatedUser,setOtherUsers}= userSlice.actions;
export default userSlice.reducer;