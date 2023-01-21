// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./Event.sol";

interface ITicket {
    struct TicketStruct {
        string name;
        uint256 price;
        bool is_set;
    }

    function create_ticket(
        address _event_contract,
        uint256 _event_id,
        string memory _name,
        uint256 _quantity,
        uint256 _price
    ) external;

    function buy_ticket(
        address _organizer_address,
        uint256 _event_id,
        uint256 _ticket_id,
        uint256 _quantity
    ) external payable;

    function available_tickets(uint256 _ticket_id)
        external
        view
        returns (uint256);
}

contract Ticket is ITicket, ERC1155, Ownable {
    Counters.Counter ticket_id;
    mapping(address => mapping(uint256 => mapping(uint256 => TicketStruct)))
        public tickets;
    uint256[] public ticket_list;

    event TicketCreated(
        address indexed _admin,
        uint256 _ticket_id,
        string _name,
        uint256 _quantity,
        uint256 _price
    );

    event TicketBought(
        address indexed _buyer,
        uint256 _ticket_id,
        uint256 _quantity,
        uint256 _price
    );

    constructor() ERC1155("") {}

    // Functions
    function create_ticket(
        address _event_contract,
        uint256 _event_id,
        string memory _name,
        uint256 _quantity,
        uint256 _price
    ) external {
        require(
            IEvent(_event_contract).is_event(msg.sender, _event_id),
            "Event does not exist"
        );
        // require(
        //     tickets[msg.sender][_event_id].start_datetime < block.timestamp,
        //     "Event is passed"
        // );
        tickets[msg.sender][_event_id][
            Counters.current(ticket_id)
        ] = TicketStruct(_name, _price, true);
        ticket_list.push(Counters.current(ticket_id));
        _mint(address(this), Counters.current(ticket_id), _quantity, "");
        emit TicketCreated(
            msg.sender,
            Counters.current(ticket_id),
            _name,
            _quantity,
            _price
        );
        Counters.increment(ticket_id);
    }

    function buy_ticket(
        address _organizer_address,
        uint256 _event_id,
        uint256 _ticket_id,
        uint256 _quantity
    ) external payable {
        require(
            tickets[_organizer_address][_event_id][_ticket_id].is_set,
            "Ticket does not exist"
        );
        require(
            balanceOf(address(this), _ticket_id) > 0,
            "No tickets available"
        );
        // require(
        //     tickets[_organizer_address][_event_id].start_datetime <
        //         block.timestamp,
        //     "Event is passed"
        // );
        uint256 total_price = _quantity *
            tickets[_organizer_address][_event_id][_ticket_id].price;
        require(msg.sender.balance >= total_price, "Buyer balance too low");
        require(msg.value == total_price, "Wrong payment amount");
        _safeTransferFrom(address(this), msg.sender, _ticket_id, _quantity, "");

        emit TicketBought(msg.sender, _ticket_id, _quantity, total_price);
    }

    function available_tickets(uint256 _ticket_id)
        external
        view
        returns (uint256)
    {
        return balanceOf(address(this), _ticket_id);
    }
}
