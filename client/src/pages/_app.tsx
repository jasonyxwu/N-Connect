import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Token } from "../utils/connection";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [token, setToken] = useState<Token>();
    return <Component token={token} {...pageProps} />;
}
