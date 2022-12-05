import React from "react";
import { friend } from "../pages/chat";
export default function StartChatBar(props: any) {
    if (props.currentChat === "")
        return (
            <div
                className="bg-white px-3 flex items-center hover:bg-gray-200"
                onClick={() => {
                    props.setCurrentChat("");
                }}
            >
                <div>
                    <img
                        className="h-12 w-12 rounded-full"
                        src={props.icon.toString()}
                    />
                </div>
                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest">{props.name}</p>
                        <p className="text-xs text-grey-darkest">
                            {props.lastUpdateTime}
                        </p>
                    </div>
                    <p className="text-grey-dark mt-1 text-sm">
                        {props.lastUpdateMessage}
                    </p>
                </div>
            </div>
        );
    else
        return (
            <div
                className="bg-white px-3 flex items-center hover:bg-gray-200"
                onClick={props.setCurrentChat("")}
            >
                <div>
                    <img
                        className="h-12 w-12 rounded-full"
                        src={props.icon.toString()}
                    />
                </div>
                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                    <div className="flex items-bottom justify-between">
                        <p className="text-grey-darkest">{props.name}</p>
                        <p className="text-xs text-grey-darkest">
                            {props.lastUpdateTime}
                        </p>
                    </div>
                    <p className="text-grey-dark mt-1 text-sm">
                        {props.lastUpdateMessage}
                    </p>
                </div>
            </div>
        );
}
