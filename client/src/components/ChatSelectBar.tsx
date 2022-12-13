import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessagesFromGroup } from "../utils/messageData";
import UserIcon from "./UserIcon";
import { userInfo } from "../slices/userSlice";
import { AppState } from "../store";

// function LoadMessagesByGroupId(groupid: String) {
//     const userInfo = useSelector((state: AppState) => state.user.userInfo);
//     var res = getAllMessagesFromGroup(groupid, JSON.stringify({token:userInfo.token}))
//     alert(JSON.stringify(res));
// }

export default function ChatSelectBar(props: {
    icon: string;
    id: string;
    name: string;
    changeWindow: any;
}) {
    const userInfo = useSelector((state: AppState) => state.user.userInfo);
    // const dispatch = useDispatch();
    return (
        <div
            className="bg-gray-100 py-2 px-3 flex items-center hover:bg-gray-300"
            onClick={async () => {
                props.changeWindow(props.id, props.name, props.icon);
            }}
        >
            <div>
                <UserIcon url={props.icon} />
            </div>
            <div className="ml-4 flex-1 border-b border-grey-lighter py-3">
                <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">{props.name}</p>
                    <p className="text-xs text-grey-darkest">
                        {/* {props.lastUpdateTime} */}
                    </p>
                </div>
                <p className="text-grey-dark mt-1 text-sm">
                    {/* {props.lastUpdateMessage} */}
                </p>
            </div>
        </div>
    );
}
