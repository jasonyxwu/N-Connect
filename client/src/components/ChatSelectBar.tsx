import React from "react";
import { useDispatch } from "react-redux";
import UserIcon from "./UserIcon";

export default function ChatSelectBar(props: {
    icon: string;
    id: string;
    name: string;
    changeWindow: any;
}) {
    // const dispatch = useDispatch();

    return (
        <div
            className="bg-gray-100 py-2 px-3 flex items-center hover:bg-gray-300"
            onClick={() => {
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
    // else
    //     return (
    //         <div
    //             className="bg-white px-3 flex items-center hover:bg-gray-200"
    //             onClick={() => props.setCurrentChat(props.id)}
    //         >
    //             <div>
    //                 <img className="h-12 w-12 rounded-full" src={props.icon} />
    //             </div>
    //             <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
    //                 <div className="flex items-bottom justify-between">
    //                     <p className="text-grey-darkest">{props.name}</p>
    //                     <p className="text-xs text-grey-darkest">
    //                         {/* {props.lastUpdateTime} */}
    //                     </p>
    //                 </div>
    //                 <p className="text-grey-dark mt-1 text-sm">
    //                     {/* {props.lastUpdateMessage} */}
    //                 </p>
    //             </div>
    //         </div>
    //     );
}
