// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

interface OrganizerInterface {
    struct OrganizerStruct {
        string name;
        string description;
        bool is_set;
    }

    function create_organizer(string memory _name, string memory _description)
        external;

    function is_organizer(address _organizer_address)
        external
        view
        returns (bool);
}

contract Organizer is OrganizerInterface, Ownable {
    mapping(address => OrganizerStruct) public organizers;

    event OrganizerCreated(
        address indexed _admin,
        string _name,
        string _description
    );

    constructor() {}

    modifier organizerNotExists() {
        require(
            !organizers[msg.sender].is_set,
            "Sender is already an organizer"
        );
        _;
    }

    // Functions
    function create_organizer(string memory _name, string memory _description)
        external
        organizerNotExists
    {
        organizers[msg.sender] = OrganizerStruct(_name, _description, true);
        emit OrganizerCreated(msg.sender, _name, _description);
    }

    function is_organizer(address _organizer_address)
        external
        view
        returns (bool)
    {
        return organizers[_organizer_address].is_set;
    }
}
