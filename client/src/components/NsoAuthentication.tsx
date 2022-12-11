import React from "react";
import {getNSOLogin} from "../nso/api.js"


function NsoLogin() {
    var url = getNSOLogin();
    var name = "user";
    var login_window = window.open(url, "mozillaWindow", "popup");
}

function FetchUserName() {





}





export default function NsoAuthentication() {
    return (
        <div className="mt-5">
            <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md flex flex-col">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <button
                                    onClick={NsoLogin}
                                    type="button"
                                    className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Start Authentication
                                </button>
                                <label className="block text-sm font-medium text-gray-700">
                                    Right click the "select this user" button and paste here 
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                        url:
                                    </span>
                                    <input
                                        type="text"
                                        name="company-website"
                                        id="company-website"
                                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        placeholder="npf...://auth#session_state=...&session_token_code=..&state=..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <button
                                onClick = {FetchUserName}
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
