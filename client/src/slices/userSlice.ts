import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { Token } from "../utils/global";
import { friendInfo, groupInfo } from "../utils/global";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface userInfo {
    name: string;
    url: string;
    token: Token; // id included
    Description: string;
    friendList: any[];
    groupList: any[];
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
        setUserToken(state, action: PayloadAction<Token>) {
            state.userInfo.token = action.payload;
        },
        setUserNameIcon(
            state,
            action: PayloadAction<{ name: string; url: string }>
        ) {
            state.userInfo.name = action.payload.name;
            state.userInfo.url = action.payload.url;
        },
        setUserFriendList(state, action: PayloadAction<string[]>) {
            state.userInfo.friendList = action.payload;
        },
        setUserGroupList(state, action: PayloadAction<string[]>) {
            state.userInfo.groupList = action.payload;
        },
        setUserDescription(
            state,
            action: PayloadAction<{ Description: string }>
        ) {
            state.userInfo.Description = action.payload.Description;
        },
    },
});

export const {
    setUserDescription,
    setUserFriendList,
    setUserGroupList,
    setUserToken,
    setUserNameIcon,
    setUserState,
} = userSlice.actions;

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
