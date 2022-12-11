import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Token } from "../utils/global";
import { AppState } from "../store";

import type { PayloadAction } from "@reduxjs/toolkit";
export interface AuthState {
    authState: boolean;
}

const initialState: AuthState = {
    authState: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthState(state, action: PayloadAction<boolean>) {
            state.authState = action.payload;
        },
    },
});

export const { setAuthState } = authSlice.actions;

// export const selectAuthState = (state: AppState) => state.auth.authState;

export default authSlice.reducer;

// extraReducers: {
//     [HYDRATE]: (state, action) => {
//         return {
//             ...state,
//             ...action.payload.auth,
//         };
//     },
// },
