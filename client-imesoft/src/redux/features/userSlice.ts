import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
  };


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logUser: (state, action) => {
            state.user = action.payload;
        },
        outUser: (state, action) => {
            state.user = null;
        },
        editUser: (state, action) => {
        },
    }
});

export const { logUser,outUser,editUser } = userSlice.actions;
export default userSlice.reducer;