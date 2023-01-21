const { deployProxy } = require("@openzeppelin/truffle-upgrades");

const Ticket = artifacts.require("Ticket");

module.exports = async function (deployer) {
  const instance = await deployProxy(Ticket, [], { deployer });
  deployer.deploy(Ticket);
  console.log("Deployed", instance.address);
};
