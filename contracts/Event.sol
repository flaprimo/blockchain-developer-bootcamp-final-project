// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Ticket.sol";

contract Event is Ownable {
  address organizer
  string public name;
  string public description;
  string public address;
  uint public start_datetime;
  uint public end_datetime;
  Ticket[] memory tickets;

  constructor(
    string memory _name,
    string memory _description,
    string memory _address,
    uint memory _start_datetime,
    uint memory _end_datetime,
    ) {
      organizer = owner;
      name = _name;
      description = _description;
      address = _address;
      start_datetime = _start_datetime;
      end_datetime = _end_datetime;
  }

  function create_ticket(string memory _type, uint memory price) public onlyOwner {
    Ticket ticket = new Ticket(address(this), organizer, price);
    tickets.push(ticket);
  }

  function delete_event() public onlyOwner {
    // TODO: first reimburse ticket owners
    selfdestruct(owner);
  }
}