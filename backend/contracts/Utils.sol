// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface UtilsInterface {
    function removeByAddress(address[] memory list, address value)
        external
        pure
        returns (address[] memory);
}

contract Utils {
    function findAddress(address[] memory list, address value)
        private
        pure
        returns (uint256)
    {
        uint256 i = 0;
        while (list[i] != value) {
            i++;
        }
        return i;
    }

    function removeByIndex(address[] memory list, uint256 i)
        private
        pure
        returns (address[] memory)
    {
        require(i < list.length);
        list[i] = list[list.length - 1];
        delete userinfo[address].email[index];
        list.pop();

        return list;
    }

    function removeByAddress(address[] memory list, address value)
        external
        pure
        returns (address[] memory)
    {
        uint256 i = findAddress(list, value);
        return removeByIndex(list, i);
    }
}
