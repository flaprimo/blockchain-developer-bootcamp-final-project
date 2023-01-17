// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";

contract Organizer is Ownable {
    address admin;
    string public name;
    string public description;
    address[] events;

    constructor(address memory _admin, string memory _name, string memory _description) {
        admin = _admin;
        name = _name;
        description = _description;
    }

    function delete_organizer() external onlyOwner {
        EventFactoryInterface.delete_events(events);
        selfdestruct();
    }
}

contract OrganizerFactory is Ownable {
    Organizer[] public organizers;

    function create_organizer(
        address memory _admin,
        string memory _name,
        string memory _description
    ) external onlyOwner returns (address) {
        Organizer new_organizer = new Organizer(
            msg.sender,
            _name,
            _description
        );
        organizers.push(new_organizer);

        return address(new_organizer);
    }

    function delete_all_organizers() external onlyOwner {
        for (uint256 i = 0; i < organizers.length; i++) {
            organizers[i].delete_organizer();
        }
    }
}
