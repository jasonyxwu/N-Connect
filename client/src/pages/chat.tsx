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
import { searchUsers } from "../utils/userData";
import { createFriendGroup } from "../utils/groupData";
//import { userInfo } from "../slices/userSlice";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
//n-connect.vercel.app "localhost:4000",http://localhost:4001/https://cryptic-journey-82080.herokuapp.com
const socket = io("https://cryptic-journey-82080.herokuapp.com", {
    transports: ["websocket", "polling", "flashsocket"],
    //secure: true,
    withCredentials: true,
});
//到时候获取全局token
var flag = 0;

export interface searchedUserInfo {
    UserName: string;
    Icon: string;
    Id: string;
    Description: string;
    Email: string;
}
// export function ModalUserDetail(props: {
//     setShowUserDetail: React.Dispatch<React.SetStateAction<boolean>>;
//     item: searchedUserInfo;
// }) {
//     return (
//         <div>
//             <div
//                 onClick={() => {
//                     props.setShowUserDetail(false);
//                 }}
//             >
//                 <div className=" h-screen w-screen z-1 fixed bg-slate-800 opacity-40" />
//             </div>

//             <div className="mt-[20vh] ml-[20vw] w-[60vw] h-[60vh] bg-white z-2 fixed">
//                 <div className="flex flex-wrap h-full w-full center items-center justify-center bg-slate-50 relative">
//                     {/*这里是个flex*/}
//                     <p className="w-full text-center absolute top-4">
//                         Select friends to add to the group
//                     </p>
//                     <button
//                         type="submit"
//                         onClick={() => {
//                             props.setShowUserDetail(false);
//                         }}
//                         className=" text-gray-900 py-3 absolute right-0 top-0"
//                     >
//                         <svg
//                             version="1.1"
//                             width="24"
//                             height="24"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <line
//                                 x1="1"
//                                 y1="11"
//                                 x2="11"
//                                 y2="1"
//                                 stroke="black"
//                                 strokeWidth="2"
//                             />
//                             <line
//                                 x1="1"
//                                 y1="1"
//                                 x2="11"
//                                 y2="11"
//                                 stroke="black"
//                                 strokeWidth="2"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function Chat() {
    const [query, setQuery] = useState("");
    const [chatMode, setChatMode] = useState("friend");
    // const [loading, setLoading] = useState<boolean>(true);
    const isAuth: boolean = useSelector(
        (state: AppState) => state.auth.authState
    );
    const userInfo = useSelector((state: AppState) => state.user.userInfo);
    const [showFriendModal, setShowFriendModal] = useState<boolean>(false);
    const dispatch = useDispatch();
    const userid = userInfo.token.id;
    const [searchResults, setSearchResults] = useState<searchedUserInfo[]>([]);

    const [currentWindow, setCurrentWindow] = useState<{
        id: string;
        name: string;
        url: string;
    }>({
        id: "",
        name: "",
        url: "",
    });

    const changeWindow = (id: string, name: string, url: string) => {
        setCurrentWindow({ id, name, url });
    };

    useEffect(() => {
        if (!isAuth) Router.push("/");
    }, [isAuth, userInfo.friendList, userInfo.groupList]);

    if (flag == 0) {
        console.log("chushihua");
        socket.emit("init", { id: userid });
        flag = 1;
    }
    //TODO: Add search
    async function evokeChat(item: searchedUserInfo) {
        const result = await createFriendGroup(
            [item.Id, userInfo.token.id],
            userInfo.token
        );
        console.log(result);
    }
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
                        <UserIcon url={userInfo.url} />
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
                            onClick={() => {
                                setChatMode("friend");
                                setCurrentWindow({
                                    id: "",
                                    name: "",
                                    url: "",
                                });
                            }}
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
                            onClick={() => {
                                setChatMode("group");
                                setCurrentWindow({
                                    id: "",
                                    name: "",
                                    url: "",
                                });
                            }}
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
                        <div className="py-2 px-2 bg-gray-50 flex">
                            <input
                                type="text"
                                className="w-[80%] px-2 py-2 text-sm border rounded-md flex-grow"
                                placeholder="Search or start new chat"
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                            />
                            <button
                                className="w-20 h-11 ml-1 px-2 py-2 text-sm border rounded-md bg-red-200 hover:bg-red-400"
                                placeholder="Search or start new chat"
                                onClick={() =>
                                    searchUsers(query, userInfo.token).then(
                                        (res) => {
                                            setSearchResults(
                                                res.data.map((user: any) => {
                                                    return {
                                                        UserName: user.UserName,
                                                        Description:
                                                            user.Description,
                                                        Email: user.Email,
                                                        Id: user._id,
                                                        Icon: user.Icon,
                                                    };
                                                })
                                            );
                                        }
                                    )
                                }
                            >
                                Search
                            </button>
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
                                <Menu.Items className="absolute z-1 w-full origin-top divide-y divide-gray rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {searchResults.map(
                                        (item: searchedUserInfo, index) => {
                                            if (item.UserName!=="Anomynous User") {
                                                return (<Menu.Item key={index}>
                                                    <div className="px-2 py-1 w-full flex items-center">
                                                        <UserIcon
                                                            url={item.Icon}
                                                        ></UserIcon>
                                                        <div className="px-3">
                                                            {item.UserName}
                                                        </div>
                                                        <div className="ml-auto">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={2}
                                                                stroke="currentColor"
                                                                className="w-8 h-8 ml-auto cursor-pointer hover:fill-slate-200 "
                                                                onClick={() => {
                                                                    evokeChat(item);
                                                                }}
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Menu.Item>)
                                            }
                                            return (<></>)
                                        }
                                            
                                        
                                    )}
                                </Menu.Items>
                            </Transition>
                        </Menu>

                        {/* friendList */}
                        <div className="bg-gray-100 flex-1 overflow-auto">
                            {chatMode === "friend"
                                ? userInfo.friendList.map((element, index) => (
                                      <ChatSelectBar
                                          key={index}
                                          name={element.data.UserName}
                                          icon={element.data.Icon}
                                          id={element.data.GroupId}
                                          changeWindow={changeWindow}
                                      />
                                  ))
                                : userInfo.groupList.map((element, index) => (
                                      <ChatSelectBar
                                          key={index}
                                          name={element.data.GroupName}
                                          icon={element.data.GroupIcon}
                                          id={element.data._id}
                                          changeWindow={changeWindow}
                                      />
                                  ))}
                        </div>
                    </div>
                ) : null}
                <div className="flex-grow flex flex-col">
                    <ChatWindow
                        chatMode={chatMode}
                        currentChat={currentWindow}
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
