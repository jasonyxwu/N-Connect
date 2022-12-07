import { Menu, Transition } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export interface Message {
    Sender: String;
    Content: String;
    DateCreated: String;
}

const userid = (Math.random() * 100).toString(); //到时候获取全局token

export default function ChatWindow(props: {
    currentChat: String;
    socket: any;
}) {
    //假如tempmessage
    var socket = props.socket;
    const [MessageList, setMessageList] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    function SendMessage() {
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
        setMessageList([...MessageList, message]);
    });

    return (
        <div className="w-full border flex flex-col h-full">
            {/* Group Info */}
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center bg-gray-200">
                <div className="flex items-center">
                    <div>
                        <img
                            className="w-10 h-10 rounded-full"
                            src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                        />
                    </div>
                    <div className="ml-4">
                        <p className="text-grey-darkest">WhyNOTSMASHBRO</p>
                        <p className="text-grey-darker text-xs mt-1">
                            Arex, Bieshawo, TrashP1ayer and other 10 members
                        </p>
                    </div>
                </div>

                <div className="flex">
                    {/* Search */}
                    {/* invite*/}
                    <div className="">
                        <Menu
                            as="div"
                            className="relative inline-block text-left"
                        >
                            <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
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
                                                className="text-gray-900 block px-4 py-2 text-small"
                                            >
                                                Invite
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
                {/* <div className="flex justify-center mb-2">
                    <div className="rounded py-2 px-4">
                        <p className="text-sm uppercase">February 20, 2018</p>
                    </div>
                </div>

                <div className="flex justify-center mb-4">
                    <div className="rounded py-2 px-4">
                        <p className="text-xs">Arex Started the chatroom</p>
                    </div>
                </div> */}
                {MessageList.map((element, index) => {
                    return <ChatBubble {...element} key={index} />;
                })}
            </div>

            {/* input window */}
            <div className="bg-grey-lighter px-4 py-4 flex items-center justify-end border">
                {/* Emoji */}
                {/* <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                        <path
                            opacity=".45"
                            fill="#263238"
                            d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
                        ></path>
                    </svg>
                </div> */}
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
                    onClick={SendMessage}
                    value="Send"
                />
            </div>
        </div>
    );
}

function ChatBubble(props: Message) {
    if (props.Sender != userid)
        return (
            <div className="flex mb-2">
                <div className="rounded px-1 w-lg">
                    <p className="text-sm text-teal">{props.Sender}</p>
                    <div className="px-2 py-1 rounded-xl bg-stone-200">
                        <p className="text-sm mt-1 w-full max-w-lg">
                            {props.Content}
                        </p>
                    </div>
                    <p className="text-right text-xs text-grey-dark mt-1">
                        {props.DateCreated}
                    </p>
                </div>
            </div>
        );
    // if message send by self, justify end
    else
        return (
            <div className="flex mb-2 justify-end">
                <div className="rounded py-2 px-3 w-lg">
                    <p className="text-sm text-teal">{props.Sender}</p>
                    <div className="px-2 py-1 rounded-xl bg-red-200">
                        <p className="text-sm mt-1 w-full max-w-lg">
                            {props.Content}
                        </p>
                    </div>

                    <p className="text-right text-xs text-grey-dark mt-1">
                        {props.DateCreated}
                    </p>
                </div>
            </div>
        );
}
