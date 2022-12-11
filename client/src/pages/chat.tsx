import React, { useEffect, useState } from "react";
import ChatWindow, { ModalFriend } from "../components/ChatWindow";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { io } from "socket.io-client";
import Link from "next/link";
import UserIcon from "../components/UserIcon";
import ChatSelectBar from "../components/ChatSelectBar";
import { useSelector, useDispatch } from "react-redux";
import { setAuthState } from "../slices/authSlice";
import { AppState } from "../store";
import Router, { useRouter } from "next/router";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
//n-connect.vercel.app "localhost:4000",http://localhost:4001/https://cryptic-journey-82080.herokuapp.com
const socket = io("https://cryptic-journey-82080.herokuapp.com", {
    transports: ["websocket", "polling", "flashsocket"],
    //secure: true,
    withCredentials: true,
});

const userid = "638d54b4c3d4e5886051fcef"; //到时候获取全局token

export interface chatItem {
    name: String;
    lastUpdateTime: String;
    lastUpdateMessage: String;
    icon: String;
}
let userToken: string = "";

export const friendList: chatItem[] = [
    {
        name: "Arex",
        lastUpdateTime: "12:45pm",
        icon: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        lastUpdateMessage: "Wanna salmonrun?",
    },
    {
        name: "Bieshawo",
        lastUpdateTime: "12:45pm",
        icon: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg",
        lastUpdateMessage: "I'll be back",
    },
    {
        name: "TrashP1ayer",
        lastUpdateTime: "12:45pm",
        icon: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
        lastUpdateMessage: "Good job!",
    },
];

const groupList: chatItem[] = [
    {
        name: "Arex",
        lastUpdateTime: "12:45pm",
        icon: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        lastUpdateMessage: "Wanna salmonrun?",
    },
    {
        name: "Bieshawo",
        lastUpdateTime: "12:45pm",
        icon: "https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg",
        lastUpdateMessage: "I'll be back",
    },
];
let searchResult: any[] = [];
var flag = 0;

export default function Chat() {
    const [currentChat, setCurrentChat] = useState("");
    const [query, setQuery] = useState("");
    const [chatMode, setChatMode] = useState("friend");
    const [loading, setLoading] = useState<boolean>(true);
    const isAuth = useSelector((state: AppState) => state.auth.authState);
    const [showFriendModal, setShowFriendModal] = useState<boolean>(false);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (!isAuth) Router.push("/");
    // }, [isAuth]);

    if (flag == 0) {
        console.log("chushihua");
        socket.emit("init", { id: userid });
        flag = 1;
    }
    //TODO: Add search
    useEffect(() => {
        console.log(1);
    }, [query]);

    // useEffect(() => {
    //     setLoading(true);
    //     fetch("/api/profile-data")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <>
            {showFriendModal ? (
                <ModalFriend setShowFriendModal={setShowFriendModal} />
            ) : null}
            <div className="flex h-screen w-screen">
                <Menu
                    as="div"
                    className="w-20 flex flex-col  justify-between items-center bg-red-600"
                >
                    <Menu.Button className="mt-3">
                        <UserIcon />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-20 z-10 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    <Link
                                        href="/config"
                                        className="hover:bg-gray-100 text-gray-900 block px-4 py-2 text-sm"
                                    >
                                        Account settings
                                    </Link>
                                </Menu.Item>
                            </div>
                            <Menu.Item>
                                <button
                                    type="submit"
                                    className="hover:bg-gray-100 text-gray-900 block w-full px-4 py-2 text-left text-sm"
                                    onClick={() => {
                                        dispatch(setAuthState(false));
                                    }}
                                >
                                    Sign out
                                </button>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                    <div className="flex flex-col justfiy-between items-center">
                        <div
                            className="my-3"
                            onClick={() => setChatMode("friend")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="white"
                                className="w-9 h-9 hover:stroke-slate-400 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity=".75"
                                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                />
                            </svg>
                        </div>
                        <div
                            className="my-3"
                            onClick={() => setChatMode("group")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="white"
                                className="w-9 h-9 hover:stroke-slate-400 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity=".75"
                                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                                />
                            </svg>
                        </div>
                        <div
                            className="mt-3 mb-5"
                            onClick={() => setChatMode("world")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="white"
                                className="w-9 h-9 hover:stroke-slate-400 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    opacity=".75"
                                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                                />
                            </svg>
                        </div>
                    </div>
                </Menu>
                {chatMode !== "world" ? (
                    <div className="w-[25%] min-w-fit flex flex-col">
                        {/* Search Bar */}
                        <div className="py-2 px-2 bg-gray-50">
                            <input
                                type="text"
                                className="w-full px-2 py-2 text-sm border rounded-md"
                                placeholder="Search or start new chat"
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            />
                        </div>
                        {/*TODO: Associate Search Results*/}
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <Transition
                                as={Fragment}
                                show={query !== ""}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute z-1 w-full origin-top divide-y divide-gray-50 rounded-sm bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    User
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    User2
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    Archive
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    Move
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* friendList */}
                        <div className="bg-gray-100 flex-1 overflow-auto">
                            {chatMode === "friend"
                                ? friendList.map((e, i) => (
                                      <ChatSelectBar
                                          {...e}
                                          key={i}
                                          currentChat={currentChat}
                                          setCurrentChat={setCurrentChat}
                                      />
                                  ))
                                : groupList.map((e, i) => (
                                      <ChatSelectBar
                                          {...e}
                                          key={i}
                                          currentChat={currentChat}
                                          setCurrentChat={setCurrentChat}
                                      />
                                  ))}
                        </div>
                    </div>
                ) : null}
                <script src="https://n-connect.vercel.app/socket.io/socket.io.js"></script>
                <div className="flex-grow flex flex-col">
                    <ChatWindow
                        chatMode={chatMode}
                        currentChat={currentChat}
                        socket={socket}
                        setShowFriendModal={setShowFriendModal}
                        showFriendModal={showFriendModal}
                    />{" "}
                    {/*加入MessageList*/}
                </div>
            </div>
        </>
    );
}
