// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IFdcHub {
    function verifyAttestation(bytes calldata attestationData) external view returns (bool);
}
