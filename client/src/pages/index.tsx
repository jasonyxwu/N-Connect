import Head from "next/head";
import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Login to N-Connect</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-screen h-screen">
                <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-1/3">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                N-Connect
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                A search-and-chat platform for nintendo switch
                                players
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 rounded-lg space-y-8 items-center bg-slate-200">
                        <form
                            className="mt-3 space-y-6 w-[90%] my-8"
                            action="#"
                            method="POST"
                        >
                            <input
                                type="hidden"
                                name="remember"
                                defaultValue="true"
                            />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label
                                        htmlFor="email-address"
                                        className="sr-only"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="h-12 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="h-12 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-red-600 ring-0 focus:ring-red-500"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-red-600 hover:text-red-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="h-12 group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon
                                            className="h-5 w-5 text-red-500 group-hover:text-red-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    return {
        props: {}, // Will be passed to the page component as props
    };
};
