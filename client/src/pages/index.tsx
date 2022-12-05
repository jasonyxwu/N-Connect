import Head from "next/head";
import Image from "next/image";
import Chat from "./chat";
import Config from "./config";
import Login from "./login";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-screen h-screen"></div>
        </div>
    );
}
