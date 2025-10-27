// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GroupRegistry {
    struct Group {
        address owner;
        string name;
        string mission;
    }

    mapping(uint256 => Group) public groups;
    uint256 private nextGroupId = 1;

    event GroupRegistered(uint256 indexed groupId, address indexed owner, string name);

    function registerGroup(string memory _name, string memory _mission) external returns (uint256) {
        uint256 groupId = nextGroupId++;
        groups[groupId] = Group(msg.sender, _name, _mission);
        emit GroupRegistered(groupId, msg.sender, _name);
        return groupId;
    }
}
