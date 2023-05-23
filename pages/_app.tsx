import Head from "next/head";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from "./Sidebar.jsx"
// import Sidebar2 from "./Sidebar2.jsx"
import {useRouter} from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>네가 꾸민 케이크</title>
      </Head>
        <Sidebar />
        {/* <Sidebar2 /> */}
      
      <Component {...pageProps} />
      
    </>
  );
}


