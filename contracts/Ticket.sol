// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
// https://docs.openzeppelin.com/contracts/2.x/access-control
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract ticket is ERC777, Ownable {
    constructor(uint256 initialSupply, address[] memory defaultOperators)
        public
        ERC777("Ticket", "TKT", defaultOperators)
    {
        _mint(owner, initialSupply, "", "");
    }
}