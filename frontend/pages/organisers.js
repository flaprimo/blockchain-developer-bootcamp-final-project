import Head from "next/head";
import { useState, useEffect } from "react";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import Nav from "../components/nav";
import { useAppContext } from "../context/app_provider";
import CreateOrganizerModal from "../components/modal";

export default function Home() {
  const appContext = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(Date.now());
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    getOrganizers(appContext);

    const interval = setInterval(() => {
      setTime(Date.now());
      getOrganizers(appContext);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getOrganizers = async (appContext) => {
    const organizerContract = appContext.sol.organizer_contract;
    let organizerList = [];

    if (organizerContract) {
      const organizersLength = await organizerContract.organizers_length();
      for (let i = 0; i < organizersLength; i++) {
        const current_organizer_address =
          await organizerContract.organizer_list(i);
        const current_organizer = await organizerContract.organizers(
          current_organizer_address
        );
        organizerList.push({
          address: current_organizer_address,
          name: current_organizer.name,
          description: current_organizer.description,
        });
      }
    }

    console.log("reloaded organizers list: " + organizerList.length);

    setOrganizers(organizerList);

    return organizerList;
  };

  return (
    <>
      <Head>
        <title>Decentralised Ticket Sales | Organisers</title>
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
            <button
              className="w-64 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              Create Organizer
            </button>

            <ul>
              {organizers.map((d) => (
                <li key={d.name}>
                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{d.name}</div>
                      <p className="text-gray-700 text-base">{d.description}</p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {d.address}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
          </div>
        </div>
      </main>
      <CreateOrganizerModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
