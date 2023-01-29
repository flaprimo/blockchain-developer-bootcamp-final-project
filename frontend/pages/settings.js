import Head from "next/head";
// import Image from "next/image";
import { useState } from "react";
import { ethers } from "ethers";
import { useAppContext, useAppDispatchContext } from "../context/app_provider";
import styles from "../styles/Home.module.css";
import Nav from "../components/nav";
import Organizer from "../../backend/build/contracts/Organizer.json";

const connectWeb3 = async () => {
  // https://docs.ethers.org/v5/getting-started/
  var provider = null;
  var signer = null;

  if (window.ethereum) {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    let accounts = await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = provider.getSigner(accounts[0]);
  }

  return { provider, signer };
};

const getContracts = async (organizer_address, signer) => {
  var organizerContract = null;
  var eventContract = null;
  var ticketContract = null;

  organizerContract = new ethers.Contract(
    organizer_address,
    Organizer.abi,
    signer
  );

  return { organizerContract, eventContract, ticketContract };
};

export default function Home() {
  const appContext = useAppContext();
  const appDispatch = useAppDispatchContext();

  const [solOrganizerAddress, setSolOrganizerAddress] = useState(
    appContext.sol.organizer_address
  );
  const [isSigned, setIsSigned] = useState(appContext.etherjs.is_signed);

  return (
    <>
      <Head>
        <title>Decentralised Ticket Sales | Settings</title>
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
          <form>
            <h2 className="tracking-tight text-gray-900 py-8 font-bold">
              Metamask
            </h2>
            <div className="md:flex md:items-center mb-6">
              <div>
                {!isSigned ? (
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                      connectWeb3()
                        .then((data) => {
                          const { provider, signer } = data;
                          setIsSigned(true);
                          appDispatch({
                            type: "set_etherjs",
                            provider: provider,
                            signer: signer,
                          });
                        })
                        .catch((reason) =>
                          console.log("Message:" + reason.message)
                        );
                    }}
                  >
                    Sign into Metamask
                  </button>
                ) : (
                  <button
                    className="shadow bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    disabled
                  >
                    Successfully signed-in
                  </button>
                )}
              </div>
            </div>
          </form>

          {isSigned ? (
            <form className="w-full max-w-sm">
              <h2 className="tracking-tight text-gray-900 py-8 font-bold">
                Application settings
              </h2>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="sol-organizer-address"
                  >
                    Organizer Contract address
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="sol-organizer-address"
                    type="text"
                    placeholder="0x0000000000000000000000000000000000000000"
                    pattern="0x[0-9a-f]{40}"
                    value={solOrganizerAddress}
                    onChange={(e) => setSolOrganizerAddress(e.target.value)}
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
                      getContracts(
                        solOrganizerAddress,
                        appContext.etherjs.signer
                      )
                        .then((data) => {
                          const {
                            organizerContract,
                            eventContract,
                            ticketContract,
                          } = data;
                          appDispatch({
                            type: "set_sol_configuration",
                            sol_organizer_address: solOrganizerAddress,
                            sol_organizer_contract: organizerContract,
                            sol_event_contract: eventContract,
                            sol_ticket_contract: ticketContract,
                          });
                        })
                        .catch((reason) =>
                          console.log("Message:" + reason.message)
                        );
                    }}

                    // onClick={() => {
                    //   appDispatch({
                    //     type: "set_sol_configuration",
                    //     sol_organizer_address: solOrganizerAddress,
                    //   });
                    // }}
                  >
                    Save settings
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <></>
          )}

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
