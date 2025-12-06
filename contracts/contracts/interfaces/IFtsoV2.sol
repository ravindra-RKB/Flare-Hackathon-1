// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IFtsoV2 {
    function getFeedById(bytes21 feedId) external view returns (uint256, int8, uint256);
}

interface IContractRegistry {
    function getTestFtsoV2() external view returns (IFtsoV2);
}
