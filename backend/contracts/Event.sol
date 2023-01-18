// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
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
        organizer_address = _organizer_address;
        name = _name;
        description = _description;
        venue_address = _venue_address;
        start_datetime = _start_datetime;
        end_datetime = _end_datetime;
    }

    function create_ticket(
        string memory _name,
        uint256 _initial_supply,
        uint256 _price
    ) external onlyOwner {
        Ticket new_ticket = new Ticket(
            address(this),
            organizer_address,
            _name,
            _initial_supply,
            _price);
        tickets.push(address(new_ticket));
    }

    function delete_event() external onlyOwner {
        for (uint256 i = 0; i < tickets.length; i++) {
            TicketInterface(tickets[i]).delete_ticket();
        }
        selfdestruct(payable(organizer_address));
    }
}

interface EventFactoryInterface {
    function create_event() external returns (address);

    function delete_events(address[] memory _events) external;

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

    function delete_events(address[] memory _events) external onlyOwner {
        uint256 j;
        for (uint256 i = 0; i < _events.length; i++) {
            j = get_index_by_value(events[i]);

            EventInterface(events[j]).delete_event();
            remove_from_array(j);
        }
    }

    function get_index_by_value(address value) internal returns (uint256) {
        uint256 i = 0;
        while (events[i] != value && i < events.length) {
            i++;
        }
        return i;
    }

    function remove_from_array(uint256 index) internal {
        events[index] = events[events.length - 1];
        events.pop();
    }

    function delete_all_events() external onlyOwner {
        for (uint256 i = 0; i < events.length; i++) {
            EventInterface(events[i]).delete_event();
        }
    }
}
