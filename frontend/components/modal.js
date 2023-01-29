import { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { useAppContext } from "../context/app_provider";

const createOrganizer = async (appContext, name, description) => {
  const organizerContract = appContext.sol.organizer_contract;
  let error_message = null;
  let error_reason = null;

  if (organizerContract) {
    try {
      const current_organizer = await organizerContract.create_organizer(
        name,
        description
      );
      receipt = await wait(current_organizer);
    } catch (err) {
      let error_message = err.data.data.message;
      let error_reason = err.data.data.reason;
      return { error_message, error_reason };
    }
  }

  return { error_message, error_reason };
};

const CreateOrganizerModal = ({ isOpen, setIsOpen }) => {
  const appContext = useAppContext();

  let [organizerName, setOrganizerName] = useState("");
  let [organizerDescription, setOrganizerDescription] = useState("");

  let [error, setError] = useState("");

  let completeButtonRef = useRef(null);

  return (
    <Dialog
      initialFocus={completeButtonRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen scrollable container */}
      <div className="fixed inset-0 overflow-y-auto">
        {/* Container to center the panel */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-8">
            <Dialog.Title className="tracking-tight text-gray-900 py-6 font-bold">
              Create Organizer
            </Dialog.Title>

            <form className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="organizer-name"
                  >
                    Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    ref={completeButtonRef}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="organizer-name"
                    type="text"
                    placeholder="Satoshi Nakamoto Inc."
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="organizer-description"
                  >
                    Description
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="organizer-description"
                    type="text"
                    placeholder="Best decentralized venue organizer"
                    value={organizerDescription}
                    onChange={(e) => setOrganizerDescription(e.target.value)}
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
                      createOrganizer(
                        appContext,
                        organizerName,
                        organizerDescription
                      )
                        .then((data) => {
                          const { error_message, error_reason } = data;
                          if (error_message !== null && error_reason !== null) {
                            console.log(error_message);
                            console.log("organizer NOT successfully!");
                            setError(`${error_message} => ${error_reason}`);
                          } else {
                            console.log("organizer created successfully!");
                          }
                        })
                        .catch((reason) =>
                          console.log("Message:" + reason.message)
                        );
                    }}
                  >
                    Save settings
                  </button>
                </div>
              </div>
              {error !== "" ? (
                <div role="alert" className="my-8">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Danger
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateOrganizerModal;
