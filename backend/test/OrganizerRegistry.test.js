// test/OrganizerRegistry.test.js
// Load dependencies
const { expect } = require("chai");

// Load compiled artifacts
const OrganizerRegistry = artifacts.require("OrganizerRegistry");

// Start test block
contract("OrganizerRegistry", function () {
  beforeEach(async function () {
    // Deploy a new OrganizerRegistry contract for each test
    this.OrganizerRegistry = await OrganizerRegistry.new([]);
  });

  // Test case
  it("retrieve returns a value previously stored", async function () {
    // Store a value
    await this.OrganizerRegistry.store(42);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.OrganizerRegistry.retrieve()).toString()).to.equal("42");
  });
});
