import { CpuChipIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {
    const [chat, setChat] = useState("");
    return (
        <div className="container h-screen w-screen">
            <div className="flex h-screen w-screen">
                <div className="w-20 border flex flex-col py-2 px-3 bg-grey-lighter justify-between items-center bg-red-600">
                    <div>
                        <img
                            className="w-10 h-10 rounded-full"
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
                <div className="w-[25%] border flex flex-col">
                    <div className="py-2 px-2 bg-grey-lightest">
                        <input
                            type="text"
                            className="w-full px-2 py-2 text-sm"
                            placeholder="Search or start new chat"
                        />
                    </div>

                    <div className="bg-grey-lighter flex-1 overflow-auto">
                        <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                            <div>
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"
                                />
                            </div>
                            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                <div className="flex items-bottom justify-between">
                                    <p className="text-grey-darkest">Arex</p>
                                    <p className="text-xs text-grey-darkest">
                                        12:45 pm
                                    </p>
                                </div>
                                <p className="text-grey-dark mt-1 text-sm">
                                    Wanna salmonrun?
                                </p>
                            </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                            <div>
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src="https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg"
                                />
                            </div>
                            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                <div className="flex items-bottom justify-between">
                                    <p className="text-grey-darkest">
                                        Bieshawo
                                    </p>
                                    <p className="text-xs text-grey-darkest">
                                        12:45 pm
                                    </p>
                                </div>
                                <p className="text-grey-dark mt-1 text-sm">
                                    I'll be back
                                </p>
                            </div>
                        </div>
                        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
                            <div>
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"
                                />
                            </div>
                            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                <div className="flex items-bottom justify-between">
                                    <p className="text-grey-darkest">
                                        TrashP1ayer
                                    </p>
                                    <p className="text-xs text-grey-darkest">
                                        12:45 pm
                                    </p>
                                </div>
                                <p className="text-grey-dark mt-1 text-sm">
                                    Good job!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow border flex flex-col">
                    <ChatWindow currentChat={chat} />
                </div>
            </div>
        </div>
    );
}
