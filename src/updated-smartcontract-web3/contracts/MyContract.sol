pragma solidity ^0.5.0;

import "../../../node_modules/@openzeppelin/upgrades/contracts/Initializable.sol";

contract MyContract is Initializable {
    // bool private initializated;
    uint256 public x;


    function initialization(uint256 _x) public initializer {
        // require(!initializated, "It's initializated.");
        x = _x;
    }

    function increment() public {
        x++;
    }

    function increment100() public {
        x = x + 100;
    }
}