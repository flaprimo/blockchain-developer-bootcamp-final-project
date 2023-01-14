const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const Event = artifacts.require('Event');

module.exports = async function (deployer) {
  const instance = await deployProxy(Event, [42], { deployer });
  console.log('Deployed', instance.address);
};