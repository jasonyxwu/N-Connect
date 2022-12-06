import React, { useEffect, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import StartChatBar from "../components/StartChatBar";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { io } from "socket.io-client";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
const socket = io("http://localhost:4001/",  { transports: ['websocket', 'polling', 'flashsocket'] });



export interface friend {
    name: String;
    lastUpdateTime: String;
    lastUpdateMessage: String;
    icon: String;
}

const friendList: friend[] = [
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
let searchResult: any[] = [];

export default function Chat() {
    const [currentChat, setCurrentChat] = useState("");
    const [query, setQuery] = useState("");
    

    //TODO: Add search
    useEffect(() => {
        console.log(1);
    }, [query]);

    return (
        <div className="flex h-screen w-screen">
            <div className="w-20 flex flex-col py-2 px-3 justify-between items-center bg-red-600">
                <div className="mt-3">
                    <img
                        className="w-12 h-12 rounded-full cursor-pointer"
                        src="http://andressantibanez.com/res/avatar.png"
                    />
                </div>
                <div className="flex flex-col justfiy-between items-center">
                    <div className="my-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="36"
                            height="36"
                        >
                            <path
                                fill="white"
                                opacity=".75"
                                d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                            ></path>
                        </svg>
                    </div>
                    <div className="my-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="36"
                            height="36"
                        >
                            <path
                                opacity=".75"
                                fill="white"
                                d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                            ></path>
                        </svg>
                    </div>
                    <div className="my-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="36"
                            height="36"
                        >
                            <path
                                opacity=".75"
                                fill="white"
                                fillOpacity=".6"
                                d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-[25%] flex flex-col">
                {/* Search Bar */}
                <div className="py-2 px-2 bg-gray-50">
                    <input
                        type="text"
                        className="w-full px-2 py-2 text-sm"
                        placeholder="Search or start new chat"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                </div>
                {/*TODO: Associate Search Results*/}
                <Menu as="div" className="relative inline-block text-left">
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
                <div className="">
                    {searchResult.map((e, i) => {
                        return <div key={i}></div>;
                    })}
                </div>
                {/* friendList */}
                <div className="bg-gray-100 flex-1 overflow-auto">
                    {friendList.map((e, i) => (
                        <StartChatBar
                            {...e}
                            key={i}
                            currentChat={currentChat}
                            setCurrentChat={setCurrentChat}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                <ChatWindow currentChat={currentChat} socket={socket}/> {/*加入MessageList*/}
            </div>
        </div>
    );
}
