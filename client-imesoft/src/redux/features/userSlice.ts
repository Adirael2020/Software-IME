import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        logUser: (state, action) => {
            if (state !== null ) state.user = action.payload;
        },
        outUser: (state, action) => {
            state.user = null;
        },
        editUser: (state, action) => {
            const index = state.findIndex(usuario => usuario.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    }
});

export const { logUser,outUser,editUser } = userSlice.actions;
export default userSlice.reducer;