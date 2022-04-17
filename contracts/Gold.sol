// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Gold is ERC20 {
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 100);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
