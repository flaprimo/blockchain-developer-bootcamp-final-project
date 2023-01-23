// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./Organizer.sol";

interface IEvent {
    struct EventStruct {
        address organizer_address;
        uint256 event_id;
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
    ) external returns (uint256);

    function is_event(address _organizer_address, uint256 _event_id)
        external
        view
        returns (bool);

    function events_length() external view returns (uint256);
}

contract Event is IEvent, OwnableUpgradeable {
    CountersUpgradeable.Counter event_id;
    mapping(address => mapping(uint256 => EventStruct)) public events;
    uint256[] public event_list;

    event EventCreated(
        address indexed _admin,
        uint256 _event_id,
        string _name,
        string _description,
        string _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    );

    // constructor() {}

    // Functions
    function create_event(
        address _organizer_contract,
        string memory _name,
        string memory _description,
        string memory _venue_address,
        uint256 _start_datetime,
        uint256 _end_datetime
    ) external returns (uint256) {
        require(
            IOrganizer(_organizer_contract).is_organizer(msg.sender),
            "Organizer does not exist"
        );
        require(
            _start_datetime < _end_datetime && _end_datetime < block.timestamp,
            "Wrong datetime passed"
        );
        uint256 current_event_id = CountersUpgradeable.current(event_id);
        events[msg.sender][current_event_id] = EventStruct(
            msg.sender,
            current_event_id,
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime,
            true
        );
        event_list.push(current_event_id);
        emit EventCreated(
            msg.sender,
            current_event_id,
            _name,
            _description,
            _venue_address,
            _start_datetime,
            _end_datetime
        );
        CountersUpgradeable.increment(event_id);

        return current_event_id;
    }

    function is_event(address _organizer_address, uint256 _event_id)
        external
        view
        returns (bool)
    {
        return events[_organizer_address][_event_id].is_set;
    }

    function events_length() external view returns (uint256) {
        return event_list.length;
    }
}
