import React, { useEffect } from "react";

export default function UserIcon(props: { url: string }) {
    useEffect(() => {}, [props.url]);
    return (
        <img
            className="w-12 h-12 rounded-full cursor-pointer object-scale-down"
            src={props.url !== "" ? props.url : "default.jpeg"}
        />
    );
}
