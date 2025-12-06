// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FlareTrustReputation is Ownable {
    struct ReputationProfile {
        uint256 totalSubmissions;
        uint256 successfulSubmissions;
        uint256 failedSubmissions;
        int256 reputationScore; 
        uint256 lastUpdate;
        bool isDelegate;
    }

    mapping(address => ReputationProfile) public profiles;
    address public coreContract;
    address public fdcHub;

    event ReputationUpdated(address indexed user, int256 newScore);
    event DelegateStatusChanged(address indexed user, bool isDelegate);

    modifier onlyCore() {
        require(msg.sender == coreContract, "Only Core");
        _;
    }

    constructor(address _fdcHub) Ownable(msg.sender) {
        fdcHub = _fdcHub;
    }

    function setCoreContract(address _core) external onlyOwner {
        coreContract = _core;
    }

    function updateReputationOnSubmissionResult(address user, bool success, uint256 impactWeight) external onlyCore {
        ReputationProfile storage profile = profiles[user];
        
        profile.totalSubmissions++;
        if (success) {
            profile.successfulSubmissions++;
            profile.reputationScore += int256(impactWeight);
        } else {
            profile.failedSubmissions++;
            // Penalty is higher than reward usually, here 2x
            profile.reputationScore -= int256(impactWeight * 2);
        }
        profile.lastUpdate = block.timestamp;
        
        emit ReputationUpdated(user, profile.reputationScore);
    }

    function verifyDelegate(address user, bytes calldata attestation) external {
        // Pseudo-code for FDC verification integration
        // In prod: IFdcHub(fdcHub).verifyAttestation(attestation);
        // For Hackathon demo: we check if attestation is non-empty
        require(attestation.length > 0, "Invalid attestation");
        
        profiles[user].isDelegate = true;
        profiles[user].reputationScore += 100; // Bonus for verification
        
        emit DelegateStatusChanged(user, true);
    }

    function getReputation(address user) external view returns (ReputationProfile memory) {
        return profiles[user];
    }
}
