# Avoiding Common Attacks

- **Using Specific Compiler Pragma**: `Organizer.sol`, `Event.sol`, `Ticket.sol` contracts all specify the compiler pragma version.
- **Proper Use of Require, Assert and Revert**: `Organizer.sol`, `Event.sol`, `Ticket.sol` contracts check for pre-requisites before executing actions.
- **Use Modifiers Only for Validation**: `Organizer.sol` contract implements a modifier for validation checking.
