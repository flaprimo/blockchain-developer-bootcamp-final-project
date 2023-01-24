const { deployProxy } = require("@openzeppelin/truffle-upgrades");

const Ticket = artifacts.require("Ticket");
const Event = artifacts.require("Event");
const Organizer = artifacts.require("Organizer");

module.exports = async function (deployer) {
  const organizer_instance = await deployProxy(Organizer, [], { deployer });
  console.log("Deployed organizer", organizer_instance.address);

  const event_instance = await deployProxy(
    Event,
    [organizer_instance.address],
    { deployer }
  );
  console.log("Deployed event", event_instance.address);

  const ticket_instance = await deployProxy(Ticket, [event_instance.address], {
    deployer,
  });
  console.log("Deployed ticket", ticket_instance.address);
};
