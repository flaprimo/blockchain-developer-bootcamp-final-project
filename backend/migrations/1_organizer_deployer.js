const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Ticket = artifacts.require('Ticket');
const Event = artifacts.require('Event');
const Organizer = artifacts.require('Organizer');

module.exports = async function (deployer) {
  const instance = await deployProxy(Organizer, [], { deployer });
  deployer.deploy(Organizer);
  console.log('Deployed', instance.address);
};