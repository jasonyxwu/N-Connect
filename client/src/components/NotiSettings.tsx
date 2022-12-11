import React from "react";

export default function NotiSettings() {
    return (
        <div className="mt-2 md:mt-0">
            <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <fieldset>
                            <legend className="sr-only">By Email</legend>
                            <div
                                className="text-base font-medium text-gray-900"
                                aria-hidden="true"
                            >
                                By Email
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="offers"
                                            className="font-medium text-gray-700"
                                        >
                                            Messages
                                        </label>
                                        <p className="text-gray-500">
                                            Get notified when a player send you
                                            a message
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="contents text-base font-medium text-gray-900">
                                Push Notifications
                            </legend>
                            <p className="text-sm text-gray-500">
                                These are delivered via SMS to your mobile
                                phone.
                            </p>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <label
                                        htmlFor="push-everything"
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <label
                                        htmlFor="push-email"
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <label
                                        htmlFor="push-nothing"
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
