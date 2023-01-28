// test/Ticket.test.js

// Load OpenZeppelin
const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const { expectEvent } = require("@openzeppelin/test-helpers");

// Load dependencies
// const { expect } = require("chai");

// Load compiled artifacts
const Organizer = artifacts.require("Organizer");
const Event = artifacts.require("Event");
const Ticket = artifacts.require("Ticket");

// Start test block
describe("Ticket", function () {
  beforeEach(async function () {
    this.Organizer = await deployProxy(Organizer, []);
    this.Event = await deployProxy(Event, [Organizer.address]);
    this.Ticket = await deployProxy(Ticket, [Event.address]);
    this.accounts = await web3.eth.getAccounts();

    // Create Organizer
    this.organizer_admin = this.accounts[0];
    const organizer_name = "Flavio";
    const organizer_description = "The best event organizer";

    let res = await this.Organizer.create_organizer(
      organizer_name,
      organizer_description
    );

    // Create Event
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
    this.event_id = await this.Event.event_list(0);
  });

  it("Create Ticket", async function () {
    // Create Ticket
    const ticket_name = "Parterre";
    const ticket_quantity = web3.utils.toBN(100);
    const ticket_price = web3.utils.toWei(String(0.1), "ether");

    let res3 = await this.Ticket.create_ticket(
      this.event_id,
      ticket_name,
      ticket_quantity,
      ticket_price
    );
    const ticket_id = await this.Ticket.ticket_list(0);

    await expectEvent(res3, "TicketCreated", {
      _admin: this.organizer_admin,
      _ticket_id: ticket_id,
      _name: ticket_name,
      _quantity: ticket_quantity,
      _price: ticket_price,
    });

    // check that the event is added to the events mapping
    const ticketStruct = await this.Ticket.tickets(
      this.organizer_admin,
      this.event_id,
      ticket_id
    );
    assert.equal(ticketStruct.name, ticket_name);
    assert.equal(String(ticketStruct.price), String(ticket_price));
    assert.equal(ticketStruct.is_set, true);
  });

  it("Buy a ticket", async function () {
    const ticket_quantity_number = 100;
    const ticket_price_number = 0.1;

    // Create Ticket
    const ticket_name = "Parterre";
    const ticket_quantity = web3.utils.toBN(ticket_quantity_number);
    const ticket_price = web3.utils.toWei(String(ticket_price_number));

    let res3 = await this.Ticket.create_ticket(
      this.event_id,
      ticket_name,
      ticket_quantity,
      ticket_price
    );
    const ticket_id = await this.Ticket.ticket_list(0);

    // Buy ticket
    const ticket_quantity_to_buy_number = 2;

    const ticket_buyer = this.accounts[1];
    const ticket_quantity_to_buy = web3.utils.toBN(
      ticket_quantity_to_buy_number
    );
    const ticket_price_to_pay_number =
      ticket_quantity_to_buy_number * ticket_price_number;
    const ticket_price_to_pay = web3.utils.toWei(
      String(ticket_price_to_pay_number)
    );

    let res4 = await this.Ticket.buy_ticket(
      this.organizer_admin,
      this.event_id,
      ticket_id,
      ticket_quantity_to_buy,
      {
        from: ticket_buyer,
        value: web3.utils.toWei(String(ticket_price_to_pay_number)),
      }
    );

    await expectEvent(res4, "TicketBought", {
      _buyer: ticket_buyer,
      _ticket_id: ticket_id,
      _quantity: ticket_quantity_to_buy,
      _price: ticket_price_to_pay,
    });

    // check available tickets buyer
    let res5 = await this.Ticket.available_tickets(ticket_buyer, ticket_id);

    assert.equal(res5.toNumber(), ticket_quantity_to_buy_number);
  });

  it("Available tickets", async function () {
    // Create Ticket
    const ticket_name = "Parterre";
    const ticket_quantity = web3.utils.toBN(100);
    const ticket_price = web3.utils.toWei(String(0.1));

    let res3 = await this.Ticket.create_ticket(
      this.event_id,
      ticket_name,
      ticket_quantity,
      ticket_price
    );
    const ticket_id = await this.Ticket.ticket_list(0);

    // check available tickets
    let res4 = await this.Ticket.available_tickets(
      this.organizer_admin,
      ticket_id
    );

    assert.equal(res4.toNumber(), ticket_quantity.toNumber());
  });
});
