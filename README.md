  FLAIR TRUST :

REAL-TIME REPUTATION AND TRUST SCORE FOR COMMUNITY-DRIVEN DATA ON FLARE

1.PROJECT OVERVIEW

This project builds a decentralized reputation and trust scoring system on the Flare blockchain. It enables community-driven data platforms to track and reward accurate data submissions while punishing false or spam data.

The key innovation is to combine Flare's built-in oracles (FTSO and FDC) with on-chain reputation mechanisms to create a trustless system where data accuracy is automatically verified and rewarded.

2.PROBLEM STATEMENT

In Web3 ecosystems like marketplaces, data-sharing platforms, and DAO governance:

Users can be anonymous or pseudonymous

Anyone can submit data, but how do we know who to trust?

False data reduces platform credibility and discourages honest participation

There's no standardized reputation layer to track data quality across decentralized systems

The solution is an on-chain reputation system that automatically evaluates submissions against real-world data through Flare oracles and maintains a permanent, verifiable trust score for each wallet.

3.SOLUTION AND FEATURES

The core mechanism works like this:

Step 1: Data Submission - Users submit data like reviews, sensor readings, or reports with a token stake as security deposit.

Step 2: Community Validation - Other users validate the submissions by voting true or false.

Step 3: Oracle Verification - The smart contract compares submissions against Flare's Time Series Oracle or Data Connector to check real-world truth.

Step 4: Reputation Update - If data is correct, the submitter's reputation score increases and they get their stake back plus rewards. If the data is false, their reputation decreases and part of their stake is slashed.

Step 5: Trust Score Published - The reputation score is stored on-chain and any dApp can read it to know how trustworthy a wallet is.

4.Benefits of this system:

Transparency: All reputation updates are visible and can be audited on the blockchain

Tamper-proof: Blockchain immutability ensures scores cannot be secretly changed

Reusable: Other Flare dApps can check reputation scores for risk assessment

Incentive-aligned: Staking and slashing economically encourage honest behavior

Decentralized: No central authority decides who to trust; code and consensus do it

5.TECH STACK

For the blockchain layer, we use Flare Network which is a Proof of Stake EVM-compatible blockchain. Flare is special because it has built-in oracles called FTSO and Data Connector to bring real-world data on-chain.

For smart contracts, we write Solidity code which is the standard language for EVM blockchains.

For development, we use Hardhat which helps us compile, test, and deploy smart contracts.

For the frontend, we use Next.js with React to build the user interface.

For Web3 integration, we use ethers.js or web3.js to connect the frontend to the wallet and smart contract.

For data verification, we query Flare's FTSO (Flare Time Series Oracle) and Data Connector to get real-world data.

6.SMART CONTRACT ARCHITECTURE

The main smart contract is called ReputationSystem.sol.

It stores data using mappings and structs:

A mapping called reputation that links each wallet address to their reputation score number

A mapping called submissions that links each submission ID to its full submission details

A counter called submissionCount to track total submissions

A Submission contains these details:

id: unique number of the submission

submitter: the wallet address that submitted it

dataHash: a hash of the actual data submitted

timestamp: when it was submitted

stake: how much tokens were locked as security

finalized: whether the submission has been checked

isCorrect: whether the oracle verified it as correct

The main functions the contract provides are:

submitData function: A user calls this to submit data along with a stake amount. The contract records the submission and locks the tokens.

validateData function: Other users call this to vote whether a submission is true or false.

finalizeSubmission function: This is called to check the submission against oracle data and update the reputation score.

getReputation function: This is a read-only function that returns the reputation score for any wallet address.

getSubmission function: This returns all the details of a specific submission.

The reputation logic works like this:

When a submission is verified as correct by the oracle, the submitter's reputation increases by 10 points, and they get their stake back plus 2 reward tokens.

When a submission is found to be false, the submitter's reputation decreases by 20 points and 30 percent of their stake is taken away.

Reputation scores cannot go below minus 100 to prevent unlimited negative scores.

7.DATA FLOW EXPLANATION

The complete flow is:

First, a user submits data. They open the frontend application and fill in the data they want to submit, then approve the token stake amount.

The frontend calls the submitData function on the smart contract with the data hash and stake amount. The user's wallet pops up and asks for confirmation, then signs the transaction.

The smart contract records this submission, saves it to the submissions mapping, and locks the user's tokens.

Next, other community members see this new submission and decide whether it is true or false. They call the validateData function to vote.

Then the submission needs to be finalized. The smart contract queries Flare's FTSO or Data Connector to get the real-world data and compare it with what was submitted.

Based on this comparison, the smart contract updates the reputation score. If the data matches the oracle data, the reputation goes up and the stake is returned with rewards. If it doesn't match, the reputation goes down and some stake is slashed.

Finally, the reputation score is now stored on the blockchain in the reputation mapping. Any other dApp on Flare can query this score to know how trustworthy this wallet is. The user can also check their own reputation in the dApp dashboard.

8.GETTING STARTED

To run this project you need Node.js version 16 or higher, npm or yarn, MetaMask or a compatible wallet, and Flare Coston2 testnet tokens which you can get for free from a faucet.

To install, first clone the repository from GitHub. Then go into the contracts folder, install dependencies with npm install, compile the smart contracts with npx hardhat compile, and deploy them to the Flare Coston2 testnet with npx hardhat run scripts deploy.js.

Then go into the frontend app folder, install dependencies, and run npm run dev to start the development server. Open your browser to localhost 3000, connect your wallet, and you can start submitting data.

9.WHY FLARE

Flare is the best blockchain for this project for several reasons. First, Flare is specifically designed as a blockchain for data, so it has built-in oracle technology called FTSO and Data Connector. This means we don't have to use external oracle services. Second, Flare is EVM-compatible so we can write Solidity code and use tools like Hardhat just like on Ethereum. Third, Flare uses Proof of Stake consensus which is fast and efficient with low transaction costs. Fourth, Flare's ecosystem is growing and reputation systems are seen as critical infrastructure for Web3 data marketplaces.

10.KEY WEB3 CONCEPTS USED

Smart contracts are the key concept. Instead of a company deciding reputation scores, the smart contract code automatically enforces the reputation rules for everyone equally.

Blockchain immutability means once a submission or reputation update is recorded in a block, it cannot be changed or deleted. This prevents cheating.

Proof of Stake consensus on Flare means validators with staked coins propose and verify blocks. Our contract lives on this secure layer.

Oracles like FTSO provide real-world data so the contract can verify whether submitted data is actually true.

Wallet signing means users sign transactions with their private key, which proves they own that wallet and authorized that action.

State variables are the on-chain storage where reputation scores live permanently on the blockchain.

11.SECURITY CONSIDERATIONS

Stake slashing discourages false submissions because users lose tokens when they lie.

Oracle consensus means submissions are only finalized if the oracle data confirms they are correct, so there is no single point of failure.

Access control means only the submitter can withdraw their stake and only the contract owner can adjust system parameters.

Immutable history means all submissions and updates are recorded on the blockchain forever, so everything is fully auditable.

12.PROJECT FILE STRUCTURE

The contracts folder contains all the Solidity smart contract code, the deployment script, and the Hardhat configuration.

The frontend folder contains the Next.js and React code for the user interface. It has components for the UI, hooks for Web3 integration, utilities and helpers, and the configuration file that stores the contract ABI and addresses.

13.HOW TO USE THE DAPP

As a data submitter, you connect your wallet to the application, enter the data you want to submit like a weather reading or a review, approve the stake amount, and click submit. Your wallet signs the transaction which gets recorded on-chain.

As a validator, you browse the list of pending submissions, review each one and decide if it is true or false, and vote via the contract function. You earn small rewards if the majority agrees with your vote.

To check your reputation, you can view your reputation score in the dApp dashboard. The score equals the number of correct submissions you made minus penalties for false submissions. A higher score means more people trust your data.

