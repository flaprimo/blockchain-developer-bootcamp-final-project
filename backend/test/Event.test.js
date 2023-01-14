// test/Event.test.js
// Load dependencies
const { expect } = require('chai');

// Load compiled artifacts
const Event = artifacts.require('Event');

// Start test block
contract('Event', function () {
  beforeEach(async function () {
    // Deploy a new Event contract for each test
    this.Event = await Event.new();
  });

  // Test case
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await this.Event.store(42);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.Event.retrieve()).toString()).to.equal('42');
  });
});