// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Event.sol";

interface OrganizerInterface {
    function create_ticket(
        string memory _name,
        uint256 _price,
        uint256 _quantity
    ) external;

    function delete_event() external;

    function get_admin() external pure returns (address);
}

contract Organizer is Ownable {
    address admin;
    string public name;
    string public description;
    address[] events;

    constructor(
        address _admin,
        string memory _name,
        string memory _description
    ) {
        admin = _admin;
        name = _name;
        description = _description;
    }

    function withdraw() external {
        require(msg.sender == admin, "Only the admin can delete an Organizer");
        uint256 amount = address(this).balance;
        require(amount > 0, "Insufficient funds");
        payable(admin).transfer(amount);
    }

    function delete_organizer() external {
        require(msg.sender == admin, "Only the admin can delete an Organizer");
        EventFactoryInterface.delete_events(events);
        selfdestruct(payable(admin));
    }

    function get_admin() external pure returns (address) {
        return admin;
    }
}

contract OrganizerFactory is Ownable {
    Organizer[] public organizers;

    function create_organizer(
        address _admin,
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
