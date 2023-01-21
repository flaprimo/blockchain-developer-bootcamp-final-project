// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Organizer.sol";

interface EventInterface {
    struct EventStruct {
        string name;
        string description;
        string venue_address;
        uint256 start_datetime;
        uint256 end_datetime;
        bool is_set;
    }

    function create_event(
        address _organizer_contract,
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) external;

    function is_event(address _organizer_address, uint256 _event_id)
        external
        view
        returns (bool);
}

contract Event is EventInterface, Ownable {
    Counters.Counter event_id;
    mapping(address => mapping(uint256 => EventStruct)) public events;

    event EventCreated(
        address indexed _admin,
        uint256 _event_id,
        string _name,
        string _description,
        string _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    );

    constructor() {}

    // Functions
    function create_event(
        address _organizer_contract,
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) external {
        require(
            OrganizerInterface(_organizer_contract).is_organizer(msg.sender),
            "Organizer does not exist"
        );
        require(
            _start_datetime < _end_datetime && _end_datetime < block.timestamp,
            "Wrong datetime passed"
        );
        events[msg.sender][Counters.current(event_id)] = EventStruct(
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime,
            true
        );
        emit EventCreated(
            msg.sender,
            Counters.current(event_id),
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime
        );
        Counters.increment(event_id);
    }

    function is_event(address _organizer_address, uint256 _event_id)
        external
        view
        returns (bool)
    {
        return events[_organizer_address][_event_id].is_set;
    }
}
