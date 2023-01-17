const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Ticket = artifacts.require('Ticket');
const Event = artifacts.require('Event');
const Organizer = artifacts.require('Organizer');
const OrganizerRegistry = artifacts.require('OrganizerRegistry');

module.exports = async function (deployer) {
  // const instance = await deployProxy(OrganizerRegistry, [], { deployer });
  // deployer.deploy(OrganizerRegistry);
  // console.log('Deployed', instance.address);
};

// module.exports = function(deployer){
//   deployer.deploy(myContract);
// }