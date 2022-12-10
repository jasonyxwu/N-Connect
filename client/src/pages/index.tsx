import Head from "next/head";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import HomePageCarousel from "../components/HomePageCarousel";
import LoginForm from "../components/LoginForm";
import { AppState } from "../store";
import { useSelector } from "react-redux";
import Router from "next/router";

export default function Home() {
    const isAuth = useSelector((state: AppState) => state.auth.authState);
    if (isAuth) {
        //TODO: force redirect to chat.tsx
    }
    // TODO: figure out why overflow
    return (
        <div>
            <Head>
                <title>Login to N-Connect</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="absolute ml-10 mt-8">
                <h2 className="text-4xl font-bold tracking-tight text-red-600">
                    N-Connect
                </h2>
                <p className="mt-2 text-center text-md text-gray-600">
                    A search-and-chat platform for nintendo switch players
                </p>
            </div>

            <div className="w-screen h-screen">
                <div className="flex h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-1/3 lg:mx-20">
                        <HomePageCarousel />
                    </div>
                    <div className="flex flex-col w-1/3 rounded-lg space-y-8 mx-20 items-center bg-slate-200">
                        <LoginForm></LoginForm>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const getInitialProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    return {
        props: {}, // Will be passed to the page component as props
    };
};
