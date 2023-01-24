// test/Event.test.js

// Load OpenZeppelin
const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const { expectEvent } = require("@openzeppelin/test-helpers");

// Load dependencies
const { assert } = require("chai");

// Load compiled artifacts
const Organizer = artifacts.require("Organizer");
const Event = artifacts.require("Event");

// Start test block
describe("Event", function () {
  beforeEach(async function () {
    this.Organizer = await deployProxy(Organizer, []);
    this.Event = await deployProxy(Event, [Organizer.address]);
    this.accounts = await web3.eth.getAccounts();
  });

  it("Create Event", async function () {
    const organizer_admin = this.accounts[0];
    const organizer_name = "Flavio";
    const organizer_description = "The best event organizer";

    let res = await this.Organizer.create_organizer(
      organizer_name,
      organizer_description
    );

    const event_name = "Best concert ever";
    const event_description = "The best concert ever you'll attend to";
    const event_venue_address = "Viale Pietro de Coubertin, 30, Rome";
    const event_start_datetime = web3.utils.toBN(1672599600); // Sun Jan 01 2023 20:00:00 GMT+0000
    const event_end_datetime = web3.utils.toBN(1672610400); // Sun Jan 01 2023 22:00:00 GMT+0000

    let res2 = await this.Event.create_event(
      event_name,
      event_description,
      event_venue_address,
      event_start_datetime,
      event_end_datetime
    );

    // check that the event is added to the event_list
    const event_id = await this.Event.event_list(0);

    // check that the event
    await expectEvent(res2, "EventCreated", {
      _admin: organizer_admin,
      _event_id: event_id,
      _name: event_name,
      _description: event_description,
      _venue_address: event_venue_address,
      _start_datetime: event_start_datetime,
      _end_datetime: event_end_datetime,
    });

    // check that the event is added to the events mapping
    const eventStruct = await this.Event.events(organizer_admin, event_id);
    assert.equal(eventStruct.organizer_address, organizer_admin);
    assert.equal(eventStruct.event_id.toNumber(), event_id.toNumber());
    assert.equal(eventStruct.name, event_name);
    assert.equal(eventStruct.description, event_description);
    assert.equal(eventStruct.venue_address, event_venue_address);
    assert.equal(
      eventStruct.start_datetime.toString(),
      event_start_datetime.toString()
    );
    assert.equal(
      eventStruct.end_datetime.toString(),
      event_end_datetime.toString()
    );
    assert.equal(eventStruct.is_set, true);
  });
});
