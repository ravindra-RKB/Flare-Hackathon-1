// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IFtsoV2.sol";

interface IContractRegistry {
    function getTestFtsoV2() external view returns (IFtsoV2);
}
