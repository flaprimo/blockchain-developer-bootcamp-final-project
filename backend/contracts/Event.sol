// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Organizer.sol";
import "./Ticket.sol";

contract Event is Ownable {
    Organizer organizer;
    string public name;
    string public description;
    string public venue_address;
    uint256 public start_datetime;
    uint256 public end_datetime;
    Ticket[] tickets;

    constructor(
        address _organizer,
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) {
        organizer = Organizer(_organizer);
        name = _name;
        description = _description;
        venue_address = _venue_address;
        start_datetime = _start_datetime;
        end_datetime = _end_datetime;
    }

    function create_ticket(
        // string memory _name,
        // uint256 _price,
        uint256 _quantity
    ) public onlyOwner {
        address[] memory defaultOperators;
        tickets.push(new Ticket(_quantity, defaultOperators));
    }

    function delete_event() public onlyOwner {
        // TODO: first reimburse ticket owners
        selfdestruct(payable(organizer.account.address));
    }
}
