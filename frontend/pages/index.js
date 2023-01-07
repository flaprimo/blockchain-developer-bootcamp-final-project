import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Decentralised Ticket Sales</title>
        <meta
          name="description"
          content="A way of managing event tickets in a decentralised fashion using Ethereum blockchain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <main>
        <div
          className="flex h-screen bg-cover bg-no-repeat bg-clip-text text-transparent px-6 md:px-12"
          style={{
            backgroundImage:
              "url('https://az877327.vo.msecnd.net/~/media/images/references/2016/q1/nobel%20peace%20prize%20concert%202015/_dsc8692%20nef%20jpg.jpg')",
          }}
        >
          <h1 className="leading-10 m-auto text-center align-middle text-5xl md:text-6xl xl:text-7xl font-extrabold">
            The decentralised way to manage tickets in Web3
          </h1>
        </div>
      </main>
    </>
  );
}
