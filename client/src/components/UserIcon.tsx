import React, { useEffect } from "react";

export default function UserIcon(props: { url: string | null; }) {
    //useEffect(())
    var url = "https://cdn-image-e0d67c509fb203858ebcb2fe3f88c2aa.baas.nintendo.com/1/647d24c0848632af";
    //var url = "http://andressantibanez.com/res/avatar.png"
    if (props != null && props.url!=null) {
        url = props.url;
    }
    return (
        <img
            className="w-12 h-12 rounded-full cursor-pointer object-scale-down"
            // src="http://andressantibanez.com/res/avatar.png"
            src={url}
        />
    );
}
