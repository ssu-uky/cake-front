import Head from "next/head";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import 'bootstrap/dist/css/bootstrap.css';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>네가 꾸민 케이크</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}


