import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotiSettings from "../components/NotiSettings";
import NsoAuthentication from "../components/NsoAuthentication";
import ProfSettings from "../components/ProfSettings";
import UserIcon from "../components/UserIcon";
import { AppState } from "../store";
import Router from "next/router";
import { getNSOLogin } from "../nso/api.js";

/*
 * written by yt.h 2022 12.10
 */

/*
<a id="authorize-switch-approval-link" href="npf71b963c1b7b6d119://auth#session_state=1c..." 
class="c-btn c-btn-primary c-btn-small c-btn-tiny">Select this account</a>
*/
//  onClick={evokeNintendoAuth}
function evokeNintendoAuth() {
    var url = getNSOLogin();
    var name = "user";
    var login_window = window.open(url, "mozillaWindow", "popup");
    if (login_window != null) {
        console.log(login_window.document);
        var obj = login_window.document.getElementById(
            "authorize-switch-approval-link"
        );
        if (obj == null) {
            console.log("btn not find");
        } else {
            var redirectURL = obj.getAttribute("href");
            console.log(redirectURL);
        }
    }
}

export default function Config() {
    const isAuth = useSelector((state: AppState) => state.auth.authState);
    const [currentOption, setcurrentOption] = useState("");
    // useEffect(() => {
    //     if (!isAuth) Router.push("/");
    // }, [isAuth]);
    return (
        <div className="w-screen h-screen flex">
            <div className="w-70">
                <div className="h-screen flex flex-col justify-center overflow-y-auto py-3 px-3 bg-red-600">
                    <Link href="/chat" className="flex items-center ml-1">
                        <UserIcon />
                    </Link>
                    <ul className="space-y-4 h-full pt-[100%]">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-red-800"
                                onClick={() => setcurrentOption("Profile")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-3">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-base font-normal  rounded-lg text-white hover:bg-red-800"
                                onClick={() => setcurrentOption("Notification")}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6  transition duration-75  group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Notification Setting
                                </span>
                                {/* <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full bg-blue-900 text-blue-200">
                                    3
                                </span> */}
                            </a>
                        </li>

                        <li>
                            <button
                                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-red-800 w-full"
                                onClick={() => setcurrentOption("NSO")}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="flex-shrink-0 w-6 h-6  transition duration-75  group-hover:text-gray-900"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className=" ml-3 whitespace-nowrap">
                                    Nintendo Authentication
                                </span>
                            </button>
                        </li>
                        <li></li>
                    </ul>
                    <Link
                        href="/chat"
                        className="flex items-center  justify-end p-2 text-base font-normal rounded-lg text-white hover:bg-red-800"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                            Back
                        </span>
                    </Link>
                </div>
            </div>
            <div className="flex-grow overflow-scroll">
                {(currentOption === "Profile" && <ProfSettings />) ||
                    (currentOption === "Notification" && <NotiSettings />) ||
                    (currentOption === "NSO" && <NsoAuthentication />)}
            </div>
        </div>
    );
}
