const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Event = artifacts.require('Event');

module.exports = async function (deployer) {
  const instance = await deployProxy(Event, [], { deployer });
  deployer.deploy(Event);
  console.log('Deployed', instance.address);
};