import Head from "next/head";
// import Image from "next/image";
import { useState } from "react";
import { useAppContext, useAppDispatchContext } from "../context/app_provider";
import styles from "../styles/Home.module.css";
import Nav from "../components/nav";

export default function Home() {
  const appContext = useAppContext();
  const appDispatch = useAppDispatchContext();

  const [apiKey, setApiKey] = useState(appContext.api.key);
  const [apiNetwork, setApiNetwork] = useState(appContext.api.network);

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
            Settings
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h2 className="tracking-tight text-gray-900 py-8 font-bold">
            API SQL Alchemy
          </h2>
          <form className="w-full max-w-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="api-key"
                >
                  API Key
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="api-key"
                  type="password"
                  minLength={32}
                  maxLength={32}
                  placeholder="********************************"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="api-network"
                >
                  Network
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="api-network"
                  type="text"
                  placeholder="goerli"
                  value={apiNetwork}
                  onChange={(e) => setApiNetwork(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={() => {
                    setApiKey(apiKey);
                    setApiNetwork(apiNetwork);
                    appDispatch({
                      type: "set_api_configuration",
                      api_key: apiKey,
                      api_network: apiNetwork,
                    });
                  }}
                >
                  Save settings
                </button>
              </div>
            </div>
          </form>

          {/* <!-- Replace with your content --> */}
          {/* <div className="px-4 py-6 sm:px-0">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div> */}
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </>
  );
}
