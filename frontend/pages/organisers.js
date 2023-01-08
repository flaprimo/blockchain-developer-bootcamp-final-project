import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/nav";

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
      <Nav />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Organisers
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
