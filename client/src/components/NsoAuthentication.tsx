import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNSOLogin } from "../nso/api.js";
import { getUserNameByRedirectUrl } from "../nso/api.js";
import { setUserNameIcon } from "../slices/userSlice";

import { AppState } from "../store.js";
import { updateUserInfo } from "../utils/userData";

export default function NsoAuthentication() {
    let codeVerifier = "";
    const dispatch = useDispatch();
    const userInfo = useSelector((state: AppState) => state.user.userInfo);
    function NsoLogin() {
        var login = getNSOLogin();
        var url = login.url;
        codeVerifier = login.codeVerifier;
        var name = "user";
        var login_window = window.open(url, "mozillaWindow", "popup");
    }
    async function FetchUserName() {
        var redirect_url = (
            document.getElementById("redirect_url") as HTMLInputElement
        ).value;
        console.log(redirect_url);
        //var UserName = "Unbounded User";
        if (redirect_url != null) {
            const UserInfo = await getUserNameByRedirectUrl(
                redirect_url,
                codeVerifier
            );
            //change Redux state
            dispatch(
                setUserNameIcon({ name: UserInfo.name, url: UserInfo.imageUri })
            );
            //post userInfo
            updateUserInfo(userInfo)
                .then((res) => {
                    console.log(res);
                    alert(UserInfo.name);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("null link");
        }
    }
    return (
        <div className="mt-3 w-full">
            <div className="sm:overflow-hidden sm:rounded-md flex flex-col">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2 space-y-3">
                            <h2 className="mb-8 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
                                3 steps to authenticate your nintendo switch
                                account
                            </h2>
                            <label className="block text-sm font-medium text-gray-700">
                                Step1: Click to login to your nintendo account
                            </label>
                            <button
                                onClick={NsoLogin}
                                type="button"
                                className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Start Authentication
                            </button>
                            <div className="divider"></div>
                            <label className="block text-sm font-medium text-gray-700">
                                Step2: Right click the "select this user" button
                                to copy the link and paste here
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                    url:
                                </span>
                                <input
                                    type="text"
                                    name="redirect_url"
                                    id="redirect_url"
                                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    placeholder="npf...://auth#session_state=...&session_token_code=..&state=..."
                                />
                            </div>
                            <div className="divider"></div>
                            <label className="block text-sm font-medium text-gray-700">
                                Step3: Click on "Confirm" and check out your
                                updated profile
                            </label>
                            <div className="grid grid-cols-3 gap-6">
                                <button
                                    onClick={FetchUserName}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
