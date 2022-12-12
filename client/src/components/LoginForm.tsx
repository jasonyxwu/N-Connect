import React, { useEffect, useState } from "react";
import { createUser, getUserInfo, loginUser } from "../utils/userData";
import { getGroupInfo, getGroupsInfo } from "../utils/groupData";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../slices/authSlice";
import { setUserState, userInfo } from "../slices/userSlice";
export default function LoginForm() {
    const [mode, setMode] = useState<string>("signin");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [checkMessage, setCheckMessage] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => setCheckMessage(""), [mode]);

    function login() {
        loginUser(email, password)
            .then(async (res) => {
                if (res.token) {
                    const data = res.data;
                    const userGroups = await getGroupsInfo(
                        data.FriendGroups,
                        res.token
                    );
                    // userGroups.map((element) => element.data.GroupMember);
                    const thisInfo: userInfo = {
                        name: data.UserName,
                        url: data.Icon,
                        token: res.token,
                        groupList: await getGroupsInfo(data.Groups, res.token),
                        friendList: await Promise.all(
                            userGroups
                                .map((element) =>
                                    element.data.GroupMember.find(
                                        (element: string) =>
                                            element !== res.token.id
                                    )
                                )
                                .map(
                                    async (userId) =>
                                        await getUserInfo(userId, res.token)
                                )
                        ),
                        Description: data.Description,
                    };
                    dispatch(setAuthState(true));
                    dispatch(setUserState(thisInfo));
                } else {
                    setCheckMessage("Invalid account or password");
                }
            })
            .catch((error) => console.log(error));
    }
    function signup() {
        if (checkPassword === password)
            createUser(email, password, "Anomynous User")
                .then((res) => {
                    if (res.token) {
                        const data = res.data;
                        const Info: userInfo = {
                            name: data.UserName,
                            url: "",
                            token: res.token,
                            groupList: data.Groups,
                            friendList: data.FriendGroups,
                            Description: data.Description,
                        };
                        dispatch(setAuthState(true));
                        dispatch(setUserState(Info));
                    } else {
                        setCheckMessage(res.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        else {
            setCheckMessage("Passwords don't match");
        }
    }
    return mode === "signin" ? (
        <div className="mt-5 space-y-6 w-[90%] my-8">
            <div className="-space-y-px rounded-md shadow-sm">
                {checkMessage !== "" ? (
                    <div className="h-7 bg-red-600 rounded-md text-sm mt-1 mb-1 pt-1 pl-3 w-full text-stone-50">
                        {checkMessage}
                    </div>
                ) : null}

                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="h-12 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder="Email address"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="h-12 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-red-600 ring-0 focus:ring-red-500"
                    />
                    <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                    >
                        Remember me
                    </label>
                </div>

                <div className="justify-end text-sm">
                    <a
                        href="#"
                        className="font-medium text-red-600 hover:text-red-500"
                        onClick={() => setMode("forgotpassword")}
                    >
                        Forgot your password?
                    </a>
                </div>
            </div>

            <div className="">
                <button
                    type="submit"
                    className="h-12 group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={login}
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="h-5 w-5 text-red-500 group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </span>
                    Sign in
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm">
                    Don't have a account?
                    <button
                        className="pl-2 font-medium text-red-600 hover:text-red-500"
                        onClick={() => setMode("register")}
                    >
                        Sign up here!
                    </button>
                </div>
            </div>
        </div>
    ) : mode === "register" ? (
        <div className="mt-3 space-y-3 w-[90%] my-8">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                {checkMessage !== "" ? (
                    <div className="h-7 bg-red-400 rounded-md text-sm mt-1 mb-1 pt-1 pl-3 w-full text-stone-50">
                        {checkMessage}
                    </div>
                ) : null}
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="h-12 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder="Email address"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="h-12 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Confirm Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(event) =>
                            setCheckPassword(event.target.value)
                        }
                        className="h-12 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder="Confirm Password"
                    />
                </div>
            </div>

            <div className="">
                <button
                    type="submit"
                    onClick={signup}
                    className="h-12 group relative flex w-full justify-center rounded-md border border-transparent bg-red-300 py-2 px-4 text-lg font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <LockClosedIcon
                            className="h-5 w-5 text-red-200 group-hover:text-red-400"
                            aria-hidden="true"
                        />
                    </span>
                    Sign Up
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm">
                    Already have a account?
                    <button
                        className="pl-2 font-medium text-red-600 hover:text-red-500"
                        onClick={() => setMode("signin")}
                    >
                        Sign in here!
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="mt-3 space-y-6 w-[90%] my-8">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
                {checkMessage !== "" ? (
                    <div className="h-7 bg-red-400 rounded-md text-sm mt-1 mb-1 pt-1 pl-3 w-full text-stone-50">
                        {checkMessage}
                    </div>
                ) : null}
                <div className="divider text-sm">Enter Your Account Email</div>
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="h-12 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder="Email address"
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
            </div>

            <div className="">
                <button
                    type="submit"
                    className="h-12 group relative flex w-full justify-center rounded-md border border-transparent bg-red-300 py-2 px-4 text-lg font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Confirm
                </button>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm">
                    <button
                        className="pl-2 font-medium text-red-600 hover:text-red-500"
                        onClick={() => setMode("signin")}
                    >
                        Return to sign-in page
                    </button>
                </div>
            </div>
        </div>
    );
}
