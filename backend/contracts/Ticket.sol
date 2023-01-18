// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Ticket is ERC1155, Ownable {
    address public event_address;
    address public organizer_address;
    string public name;

    constructor(
        address _event_address,
        address _organizer_address,
        string _name,
        uint256 _initial_supply
    ) ERC1155() {
        event_address = _event_address;
        organizer_address = _organizer_address;
        name = _name;
        _mint(_organizer_address, _name, _initial_supply, "");
    }
}

interface TicketFactoryInterface {
    function create_ticket() external returns (address);

    function delete_tickets(address[] _tickets) external;

    function delete_all_tickets() external;
}

contract TicketFactory is Ownable, TicketFactoryInterface {
    address[] public tickets;

    function create_ticket(
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) external onlyOwner returns (address) {
        Ticket new_ticket = new Ticket(
            msg.sender,
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime
        );
        address new_ticket_address = address(new_ticket);
        tickets.push(new_ticket_address);

        return new_ticket_address;
    }

    function delete_tickets(address[] _tickets) external onlyOwner {
        uint256 j;
        for (uint256 i = 0; i < _tickets.length; i++) {
            j = 0;
            address current_ticket = tickets[i];
            while (tickets[j] != current_ticket && i < tickets.length) {
                j++;
            }
            if (tickets[j] == current_ticket) {
                TicketInterface(tickets[j]).delete_ticket();
                tickets[j].pop();
            }
        }
    }

    function delete_all_tickets() external onlyOwner {
        for (uint256 i = 0; i < tickets.length; i++) {
            TicketInterface(tickets[i]).delete_ticket();
        }
    }
}
