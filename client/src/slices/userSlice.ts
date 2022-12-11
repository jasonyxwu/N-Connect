import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { Token } from "../utils/global";
import { friendInfo, groupInfo } from "../utils/global";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "os";

export interface userInfo {
    name: string;
    url: string;
    token: Token; // id included
    SW: string;
    Description: string;
    friendList: friendInfo[];
    groupList: groupInfo[];
}
export interface userState {
    userInfo: userInfo;
}
const initialState: userState = {
    userInfo: {
        name: "",
        url: "",
        token: {
            id: "",
            Email: "",
        },
        SW: "",
        Description: "",
        friendList: [],
        groupList: [],
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState(state, action: PayloadAction<userInfo>) {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserState } = userSlice.actions;

// export const selectAuthState = (state: AppState) => state.auth.authState;

export default userSlice.reducer;

// extraReducers: {
//     [HYDRATE]: (state, action) => {
//         return {
//             ...state,
//             ...action.payload.auth,
//         };
//     },
// },
