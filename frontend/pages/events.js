import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import { useAppContext, useAppDispatchContext } from "../context/app_provider";
import { ethers } from "ethers";

export default function Home() {
  const appContext = useAppContext();
  // const appDispatch = useAppDispatchContext();

  // const [balance, setBalance] = useState("");

  useEffect(() => {
    (async () => {
      appContext.etherjs.provider.getBalance("0x52Dc05Bd478471F137bDd4D6Bb5cA12fD52d0DC7").then((balance) => {
        // convert a currency unit from wei to ether
        const balanceInEth = ethers.utils.formatEther(balance);
        console.log(`balance: ${balanceInEth} ETH`);
      });
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Decentralised Ticket Sales | Events</title>
      </Head>
      <Nav />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Events
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* <!-- Replace with your content --> */}
          <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </>
  );
}
