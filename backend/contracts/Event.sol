// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Ticket.sol";

interface EventInterface {
    function create_ticket(
        string memory _name,
        uint256 _price,
        uint256 _quantity
    ) external;

    function delete_event() external;
}

contract Event is Ownable, EventInterface {
    address public organizer_address;
    string public name;
    string public description;
    string public venue_address;
    uint256 public start_datetime;
    uint256 public end_datetime;
    address[] public tickets;

    constructor(
        address _organizer_address,
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) {
        organizer = _organizer_address;
        name = _name;
        description = _description;
        venue_address = _venue_address;
        start_datetime = _start_datetime;
        end_datetime = _end_datetime;
    }

    function create_ticket(
        string memory _name,
        uint256 _price,
        uint256 _quantity
    ) external onlyOwner {
        address[] memory defaultOperators;
        Ticket new_ticket = new Ticket(_quantity, defaultOperators);
        tickets.push(address(new_ticket));
    }

    function delete_event() external onlyOwner {
        TicketFactoryInterface.delete_tickets(tickets);
        selfdestruct();
    }
}

interface EventFactoryInterface {
    function create_event() external returns (address);

    function delete_events(address[] _events) external;

    function delete_all_events() external;
}

contract EventFactory is Ownable, EventFactoryInterface {
    address[] public events;

    function create_event(
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) external onlyOwner returns (address) {
        Event new_event = new Event(
            msg.sender,
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime
        );
        address new_event_address = address(new_event);
        events.push(new_event_address);

        return new_event_address;
    }

    function delete_events(address[] _events) external onlyOwner {
        uint256 j;
        for (uint256 i = 0; i < _events.length; i++) {
            j = 0;
            address current_event = events[i];
            while (events[j] != current_event && i < events.length) {
                j++;
            }
            if (events[j] == current_event) {
                EventInterface(events[j]).delete_event();
                events[j].pop();
            }
        }
    }

    function delete_all_events() external onlyOwner {
        for (uint256 i = 0; i < events.length; i++) {
            EventInterface(events[i]).delete_event();
        }
    }
}
