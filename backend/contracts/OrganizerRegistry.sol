// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Organizer.sol";

contract OrganizerRegistry is Ownable {
    Organizer[] public organizers;

    constructor(address[] memory _organizers) {
        for (uint256 i = 0; i < _organizers.length; i++) {
            organizers[i] = Organizer(_organizers[i]);
        }
    }

    function create_organizer(
        address _account,
        string memory _name,
        string memory _description
    ) public {
        organizers.push(new Organizer(_account, _name, _description));
    }
}
