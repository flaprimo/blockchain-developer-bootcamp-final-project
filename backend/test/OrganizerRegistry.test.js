// test/OrganizerRegistry.test.js

// Load OpenZeppelin
const { accounts, contract } = require("@openzeppelin/test-environment");
const [owner] = accounts;

// Load dependencies
const { expect } = require("chai");

// Load compiled artifacts
const OrganizerRegistry = artifacts.require("OrganizerRegistry");

// Start test block
describe("OrganizerRegistry", function () {
  beforeEach(async function () {
    // Deploy a new OrganizerRegistry contract for each test
    this.OrganizerRegistry = await OrganizerRegistry.new([]);
  });

  it("deployer is owner", async function () {
    expect(await this.OrganizerRegistry.owner()).to.equal(owner);
  });

  // Test case
  // it("retrieve returns a value previously stored", async function () {
  //   // Store a value
  //   await this.OrganizerRegistry.store(42);

  //   // Test if the returned value is the same one
  //   // Note that we need to use strings to compare the 256 bit integers
  //   expect((await this.OrganizerRegistry.retrieve()).toString()).to.equal("42");
  // });
});
