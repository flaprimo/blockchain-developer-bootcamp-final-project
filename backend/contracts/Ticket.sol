// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

interface TicketInterface {
    function buy_ticket(
        address _buyer,
        address _organizer_address,
        uint256 _quantity
    ) external payable;

    function delete_ticket() external;
}

contract Ticket is ERC1155, Ownable {
    address public event_address;
    address public organizer_address;
    string public name;
    uint256 public quantity;
    uint256 public price;

    constructor(
        address _event_address,
        address _organizer_address,
        string memory _name,
        uint256 _initial_supply,
        uint256 _price
    ) ERC1155("") {
        event_address = _event_address;
        organizer_address = _organizer_address;
        name = _name;
        quantity = _initial_supply;
        price = _price;
        _mint(address(this), 0, _initial_supply, "");
    }

    function buy_ticket(address _organizer_address, uint256 _quantity)
        external
        payable
    {
        uint256 total_price = quantity * price;
        require(
            balanceOf(address(this), 0) >= _quantity,
            "Not enough token available to buy"
        );
        require(
            msg.sender.balance >= total_price,
            "Buyer doesn't have enough Ether"
        );
        require(msg.value == total_price, "Buyer isn't paying enough");
        // payable(account).transfer(total_price);
        // safeTransferFrom(msg.sender, address(this), AliAPIToken, 100, "");
        _safeTransferFrom(address(this), msg.sender, 0, _quantity, "");
        quantity -= _quantity;
    }

    function delete_ticket() external onlyOwner {
        selfdestruct(payable(organizer_address));
    }
}

interface TicketFactoryInterface {
    function create_ticket() external returns (address);
}

contract TicketFactory is Ownable, TicketFactoryInterface {
    function create_ticket(
        address _event_address,
        address _organizer_address,
        string memory _name,
        uint256 _initial_supply,
        uint256 _price
    ) external onlyOwner returns (address) {
        Ticket new_ticket = new Ticket(
            _event_address,
            _organizer_address,
            _name,
            _initial_supply,
            _price
        );
        address new_ticket_address = address(new_ticket);

        return new_ticket_address;
    }
}
