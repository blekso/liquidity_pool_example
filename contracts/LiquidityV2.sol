// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract LiquidityPool {
    using SafeMath for uint256;
    uint256 public k = 200;
    uint256 public fee;

    IERC20 public tokenA;
    IERC20 public tokenB;

    constructor(IERC20 _tokenA, IERC20 _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    // This should mint the ERC-20 LP token to the provider but skipping this feature
    // for the demonstration purpose
    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(
            tokenA.allowance(msg.sender, address(this)) >= _amountA,
            "Token A allowance too low"
        );
        require(
            tokenB.allowance(msg.sender, address(this)) >= _amountB,
            "Token B allowance too low"
        );

        // First liquidity providing sets the k for the first time
        if (k == 0) {
            k = _amountA * _amountB;
        }

        console.log(_amountA * _amountB);
        console.log((_amountA * _amountB) / k);

        require((_amountA * _amountB) / k != 0, "Invalid ratio");

        IERC20(tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(tokenB).transferFrom(msg.sender, address(this), _amountB);
    }

    function swap(uint256 _amountAOut, uint256 _amountBOut) external {
        require(_amountAOut != 0 || _amountBOut != 0, "Can't swap 0 tokens");
        require(
            _amountAOut == 0 || _amountBOut == 0,
            "You can only swap 1 token type at once"
        );

        uint256 balanceA = IERC20(tokenA).balanceOf(address(this));
        uint256 balanceB = IERC20(tokenB).balanceOf(address(this));
        if (_amountAOut != 0) {
            // k = (balanceA - _amountAOut) * (balanceB + amountBIn)
            uint256 amountBIn = (k.div(balanceA.sub(_amountAOut))).sub(
                balanceB
            );

            console.log(amountBIn);
            require(
                tokenB.allowance(msg.sender, address(this)) >= amountBIn,
                "Token B ballowance too low"
            );

            k = (balanceA - _amountAOut) * (balanceB + amountBIn);

            IERC20(tokenB).transferFrom(msg.sender, address(this), amountBIn);
            IERC20(tokenA).transfer(msg.sender, _amountAOut);
        } else {
            uint256 amountAIn = (k.div(balanceB.sub(_amountBOut))).sub(
                balanceA
            );

            console.log(amountAIn);
            require(
                tokenA.allowance(msg.sender, address(this)) >= amountAIn,
                "Token A allowance too low"
            );

            k = (balanceA - _amountAOut) * (balanceB - _amountBOut);
            IERC20(tokenA).transferFrom(msg.sender, address(this), amountAIn);
            IERC20(tokenB).transfer(msg.sender, _amountBOut);
        }
    }
}
