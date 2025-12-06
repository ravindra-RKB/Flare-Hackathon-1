// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FlareTrustGovernance is Ownable {
    // Parameters that could be governed
    uint256 public minStakeUSD = 5 ether; // Logic representation
    uint256 public rewardPercentage = 10;
    uint256 public slashPercentage = 50;

    event ParameterUpdated(string paramName, uint256 newValue);

    constructor() Ownable(msg.sender) {}

    function setMinStakeUSD(uint256 _value) external onlyOwner {
        minStakeUSD = _value;
        emit ParameterUpdated("minStakeUSD", _value);
    }

    function setRewardPercentage(uint256 _value) external onlyOwner {
        require(_value <= 100, "Max 100");
        rewardPercentage = _value;
        emit ParameterUpdated("rewardPercentage", _value);
    }

    function setSlashPercentage(uint256 _value) external onlyOwner {
        require(_value <= 100, "Max 100");
        slashPercentage = _value;
        emit ParameterUpdated("slashPercentage", _value);
    }

    // In a real system, this contract would call updateParams on Core,
    // or Core would query this contract. 
    // For this hackathon scope, this serves as a placeholder for governance logic.
}
