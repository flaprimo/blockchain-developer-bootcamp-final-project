// test/Organizer.test.js

// Load OpenZeppelin
const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

// Load dependencies
const { assert } = require("chai");

// Load compiled artifacts
const Organizer = artifacts.require("Organizer");

// Start test block
describe("Organizer", function () {
  beforeEach(async function () {
    this.Organizer = await deployProxy(Organizer, []);
    this.accounts = await web3.eth.getAccounts();
  });

  it("Create Organizer", async function () {
    // Create Organizer
    const organizer_admin = this.accounts[0];
    const organizer_name = "Flavio";
    const organizer_description = "The best event organizer";

    let res = await this.Organizer.create_organizer(
      organizer_name,
      organizer_description
    );

    // check that the creation event is fired
    await expectEvent(res, "OrganizerCreated", {
      _admin: organizer_admin,
      _name: organizer_name,
      _description: organizer_description,
    });

    // check that the organizer is added to the organizer_list
    const organizer_list = await this.Organizer.organizer_list(0);
    assert.equal(organizer_list, organizer_admin);

    // check that the organizer is added to the organizers mapping
    const organizerStruct = await this.Organizer.organizers(organizer_admin);
    assert.equal(organizerStruct.name, organizer_name);
    assert.equal(organizerStruct.description, organizer_description);
    assert.equal(organizerStruct.is_set, true);
  });

  it("Check that user is an Organizer only after creating one", async function () {
    const organizer_name = "Flavio";
    const organizer_description = "The best event organizer";

    assert.isFalse(await this.Organizer.is_organizer(this.accounts[0]));

    await this.Organizer.create_organizer(
      organizer_name,
      organizer_description
    );

    assert.isTrue(await this.Organizer.is_organizer(this.accounts[0]));
  });

  it("Cannot create multiple Organizers from same account", async function () {
    const organizer_name = "Flavio";
    const organizer_description = "The best event organizer";

    await this.Organizer.create_organizer(
      organizer_name,
      organizer_description
    );

    await expectRevert(
      this.Organizer.create_organizer(organizer_name, organizer_description),
      "Sender is already an organizer"
    );
  });

  it("Can create multiple Organizers", async function () {
    const organizer_name = "Flavio";
    const organizer_description = "The best event organizer";

    const organizer_name_2 = "Paolo";
    const organizer_description_2 = "The second best event organizer";

    await this.Organizer.create_organizer(
      organizer_name,
      organizer_description
    );

    await this.Organizer.create_organizer(
      organizer_name_2,
      organizer_description_2,
      { from: this.accounts[1] }
    );
  });
});
