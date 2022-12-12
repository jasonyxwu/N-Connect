import React from "react";

export default function ProfSettings() {
    return (
        <div className="mt-2">
            <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md flex flex-col">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        name="company-website"
                                        id="company-website"
                                        className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        placeholder="abc123@gmail.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700"
                            >
                                About
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    placeholder="Description"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Tag Management
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="mt-1 block w-full h-20 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                    placeholder=""
                                    defaultValue={""}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Add tags so that other players can find you
                                better!
                            </p>
                        </div>
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
