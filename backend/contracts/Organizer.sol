// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";

contract Organizer is Ownable {
    address admin;
    string public name;
    string public description;
    Event[] events;

    constructor(string memory _name, string memory _description) {
        admin = owner();
        name = _name;
        description = _description;
    }

    function create_event(
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) public onlyOwner {
        Event new_event = new Event(
            address(this),
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime
        );
        events.push(new_event);
    }

    function delete_event() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
