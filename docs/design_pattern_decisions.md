# Design Patterns Decisions

- **Inter-Contract Execution**: `Ticket.sol` calls `Event.sol` to check if a given event exists, `Event.sol` calls `Organizer.sol` to check if a given organizer exists.
- **Inheritance and Interfaces**: `Organizer.sol`, `Event.sol`, `Ticket.sol` contracts all define their own interfaces and implement OpenZeppelin ones.
- **Access Control Design Patterns**: `Organizer.sol`, `Event.sol`, `Ticket.sol` are all owned by the deployer.
- **Upgradable Contracts**: use OpenZeppelin implementation for upgradeable contracts with `initialize()`.
- **Optimizing Gas**: implement interfaces to call other contracts to avoid importing the whole Solidity code. Use external OpenZeppelin libraries.
