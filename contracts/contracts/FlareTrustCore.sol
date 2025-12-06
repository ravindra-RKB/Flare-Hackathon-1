// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./FlareTrustReputation.sol";
import "./interfaces/IFtsoV2.sol";
import "./interfaces/IContractRegistry.sol";

contract FlareTrustCore is Ownable {
    
    struct Submission {
        uint256 id;
        address submitter;
        string uri;           
        uint256 createdAt;
        uint256 stakeAmount; 
        uint256 baseScore;   
        int256 aggregatedRating; 
        uint256 flagsCount;
        bool resolved;
    }

    uint256 public submissionCount;
    mapping(uint256 => Submission) public submissions;
    mapping(uint256 => mapping(address => int8)) public ratings; // id -> rater -> rating

    FlareTrustReputation public reputationContract;
    address public contractRegistry;
    bytes21 public constant FLR_USD_ID = bytes21(0x01466c722f55534400000000000000000000000000); // Test ID for FLR/USD

    event SubmissionCreated(uint256 indexed id, address indexed submitter, uint256 stake);
    event SubmissionRated(uint256 indexed id, address indexed rater, int8 rating);
    event SubmissionResolved(uint256 indexed id, bool isValid);

    constructor(address _reputationContract, address _contractRegistry) Ownable(msg.sender) {
        reputationContract = FlareTrustReputation(_reputationContract);
        contractRegistry = _contractRegistry;
    }

    function setReputation(address _reputationContract) external onlyOwner {
        reputationContract = FlareTrustReputation(_reputationContract);
    }

    function createSubmission(string calldata uri) external payable { // No minStake enforced for simplicity in demo
        uint256 price = _getFlrPrice();
        // Base score calculation: simplistic, 1 point per USD of stake (approx)
        // Price is usually decimals 5, stake is 18.
        // price * stake / 1e18 would be nominal value.
        uint256 stakeValueUSD = (msg.value * price) / 1e5; // purely illustrative math for hackathon
        uint256 baseScore = stakeValueUSD > 0 ? stakeValueUSD / 1e18 : 0; 

        submissions[submissionCount] = Submission({
            id: submissionCount,
            submitter: msg.sender,
            uri: uri,
            createdAt: block.timestamp,
            stakeAmount: msg.value,
            baseScore: baseScore,
            aggregatedRating: 0,
            flagsCount: 0,
            resolved: false
        });

        reputationContract.updateReputationOnSubmissionResult(msg.sender, true, 1); // Small activity points
        
        emit SubmissionCreated(submissionCount, msg.sender, msg.value);
        submissionCount++;
    }

    function rateSubmission(uint256 id, int8 rating) external {
        require(!submissions[id].resolved, "Resolved");
        require(rating == 1 || rating == -1, "Invalid rating");
        require(ratings[id][msg.sender] == 0, "Already rated");

        ratings[id][msg.sender] = rating;
        submissions[id].aggregatedRating += rating;

        emit SubmissionRated(id, msg.sender, rating);
    }

    function resolveSubmission(uint256 id, bool isValid) external onlyOwner {
        Submission storage sub = submissions[id];
        require(!sub.resolved, "Resolved");

        sub.resolved = true;
        
        if (isValid) {
            // Return stake + reward (mocked as returning stake)
            if (sub.stakeAmount > 0) {
                payable(sub.submitter).transfer(sub.stakeAmount);
            }
            reputationContract.updateReputationOnSubmissionResult(sub.submitter, true, 20);
        } else {
            // Slash stake (burn or keep in contract)
            // Here we keep it in the contract treasury
            reputationContract.updateReputationOnSubmissionResult(sub.submitter, false, 20);
        }

        emit SubmissionResolved(id, isValid);
    }

    function _getFlrPrice() internal view returns (uint256) {
        // Safe check for registry
        if (contractRegistry == address(0)) return 0;
        
        try IContractRegistry(contractRegistry).getTestFtsoV2() returns (IFtsoV2 ftso) {
             (uint256 price, , ) = ftso.getFeedById(FLR_USD_ID);
             return price;
        } catch {
            return 0; // Fallback
        }
    }
}
