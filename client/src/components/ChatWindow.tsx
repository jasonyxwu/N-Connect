import { Menu, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { AppState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../utils/userData";

export interface Message {
    Sender: String;
    Content: String;
    DateCreated: String;
}
//到时候获取全局token

export default function ChatWindow(props: {
    chatMode: string;
    currentChat: any;
    socket: any;
    setShowFriendModal: React.Dispatch<React.SetStateAction<boolean>>;
    showFriendModal: boolean;
}) {
    useEffect(() => {
        console.log(props.currentChat);
    }, [props.currentChat]);

    const userInfo = useSelector((state: AppState) => state.user.userInfo);
    const userid = userInfo.token.id;
    var socket = props.socket;
    const [MessageList, setMessageList] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    function sendMessage() {
        console.log("fason");
        //发送消息
        if (input == "") {
            return;
        }
        socket.emit("chat", {
            Content: input,
            UserId: userid,
            GroupId: "123" /**props.currentChat.name*/,
        }); //到时候搞好了把前面给替换回注释里的
        setInput("");
    }

    socket.on("chat", (message: Message) => {
        console.log("jieshou");
        setMessageList([...MessageList, message]);
    });

    if (props.chatMode === "world") {
        return (
            <div className="w-full border flex flex-col h-full">
                {/* Group Info */}
                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center bg-gray-200">
                    <div className="flex items-center">
                        <div>
                            {/* //TODO: add icon for world */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-10 h-10"
                            >
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className="text-grey-darkest">Public Channel</p>
                            <p className="text-grey-darker text-xs mt-1">
                                messages will be delivered to all, so please
                                watch your words
                            </p>
                        </div>
                    </div>
                </div>

                {/* chat content */}
                <div className="flex-1 py-2 px-3 flex-grow overflow-auto">
                    {MessageList.map((element, index) => {
                        return <ChatBubble {...element} key={index} />;
                    })}
                </div>

                {/* input window */}
                <div className="bg-grey-lighter px-4 py-4 flex items-center justify-end border">
                    <div className="flex-1 mx-2">
                        <input
                            id="messageIn"
                            className="w-full border rounded px-2 py-2"
                            type="text"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                        />
                    </div>
                    <div></div>
                    <input
                        type="button"
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 ml-5 border-b-4 border-red-700 hover:border-red-500 rounded"
                        onClick={sendMessage}
                        value="Send"
                    />
                </div>
            </div>
        );
    } else
        return props.currentChat.id === "" ? (
            <div />
        ) : (
            <div className="w-full border flex flex-col h-full">
                {/* Group Info */}
                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center bg-gray-300">
                    <div className="flex items-center">
                        <div>
                            <img
                                className="w-10 h-10 rounded-full"
                                src={
                                    props.currentChat.url === ""
                                        ? "default.jpeg"
                                        : props.currentChat.url
                                }
                            />
                        </div>
                        <div className="ml-4">
                            <p className="text-grey-darkest">
                                {props.currentChat.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        {/* invite*/}
                        <div>
                            {/* Add button */}
                            <div className="relative inline-block text-left">
                                <button
                                    className="inline-flex w-full justify-center rounded-md  px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => {
                                        props.setShowFriendModal(true);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.2}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeOpacity=".6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <Menu.Button className="inline-flex w-full justify-center rounded-md  px-2 py-2 lg:mr-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                    >
                                        <path
                                            fill="#263238"
                                            fillOpacity=".6"
                                            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                                        ></path>
                                    </svg>
                                </Menu.Button>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1 w-auto">
                                            <Menu.Item>
                                                <a
                                                    href="#"
                                                    className="text-red-600 block px-4 py-2 text-small"
                                                >
                                                    Leave Group
                                                </a>
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                {/* chat content */}
                <div className="flex-1 py-2 px-3 flex-grow overflow-auto">
                    {MessageList.map((element, index) => {
                        return <ChatBubble {...element} key={index} />;
                    })}
                </div>
                {/* input window */}
                <div className="bg-grey-lighter px-4 py-4 flex items-center justify-end border">
                    {/* Emoji */}
                    <div className="flex-1 mx-2">
                        <input
                            id="messageIn"
                            className="w-full border rounded px-2 py-2"
                            type="text"
                            onChange={(e) => {
                                setInput(e.target.value);
                            }}
                            value={input}
                        />
                    </div>
                    <div></div>
                    <input
                        type="button"
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 ml-5 border-b-4 border-red-700 hover:border-red-500 rounded"
                        onClick={sendMessage}
                        value="Send"
                    />
                </div>
            </div>
        );
}

function ChatBubble(props: Message) {
    const userInfo = useSelector((state: AppState) => state.user.userInfo);
    const userid = userInfo.token.id;
    const [name, setName] = useState("");
    if (props.Sender != userid) {
        const sender = getUserInfo(props.Sender, userInfo.token);
        sender.then(function (name) {
            setName(name.data.UserName);
        });
        return (
            <div className="flex mb-2">
                <div className="rounded px-1 w-lg">
                    <p className="text-sm text-teal">{name}</p>
                    <div className="px-2 py-1 rounded-xl bg-stone-200">
                        <p className="text-sm mt-1 w-full max-w-lg">
                            {props.Content}
                        </p>
                    </div>
                    <p className="text-right text-xs text-grey-dark mt-1">
                        {props.DateCreated.substring(11, 16)}
                    </p>
                </div>
            </div>
        ); // if message send by self, justify end
    } else {
        return (
            <div className="flex mb-2 justify-end">
                <div className="rounded py-2 px-3 w-lg">
                    <p className="text-sm text-teal">{userInfo.name}</p>
                    <div className="px-2 py-1 rounded-xl bg-red-200">
                        <p className="text-sm mt-1 w-full max-w-lg">
                            {props.Content}
                        </p>
                    </div>

                    <p className="text-right text-xs text-grey-dark mt-1">
                        {props.DateCreated.substring(11, 16)}
                    </p>
                </div>
            </div>
        );
    }
}

async function addFriendToGroup() {
    //这块逻辑先不写 Modal直接用这个文件import的friendList（我已经添加了）
}

export function ModalFriend(props: {
    setShowFriendModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div>
            <div
                onClick={() => {
                    props.setShowFriendModal(false);
                }}
            >
                <div className=" h-screen w-screen z-1 fixed bg-slate-800 opacity-40" />
            </div>

            <div className="mt-[20vh] ml-[20vw] w-[60vw] h-[60vh] bg-white z-2 fixed">
                {/*这里要一个大方画布*/}

                <div className="flex flex-wrap h-full w-full center items-center justify-center bg-slate-50 relative">
                    {/*这里是个flex*/}
                    <p className="w-full text-center absolute top-4">
                        Select friends to add to the group
                    </p>
                    <button
                        type="submit"
                        onClick={() => {
                            props.setShowFriendModal(false);
                        }}
                        className=" text-gray-900 py-3 absolute right-0 top-0"
                    >
                        <svg
                            version="1.1"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line
                                x1="1"
                                y1="11"
                                x2="11"
                                y2="1"
                                stroke="black"
                                strokeWidth="2"
                            />
                            <line
                                x1="1"
                                y1="1"
                                x2="11"
                                y2="11"
                                stroke="black"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                    {/* {friendList.map((item, index) => (
                        <div
                            className="w-30 h-30 border rounded-md hover:bg-slate-200"
                            key={index}
                            onClick={addFriendToGroup}
                        >
                            <img
                                className="w-20 h-20 rounded-full cursor-pointer object-scale-down m-auto"
                                src={item.icon.toString()}
                            />
                            <p className="w-full text-center text-sm mt-2 text-slate-800">
                                {item.name}
                            </p>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
