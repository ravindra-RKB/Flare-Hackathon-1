import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Address for FDC Hub and Contract Registry on Coston2
    const FDC_HUB_ADDRESS = "0x5d475306B33544D08Fb39572626e2e69A5D6E115"; // Coston2 FdcHub
    const CONTRACT_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019"; // Coston2 ContractRegistry

    // 1. Deploy Reputation
    console.log("Deploying FlareTrustReputation...");
    const Reputation = await ethers.getContractFactory("FlareTrustReputation");
    const reputation = await Reputation.deploy(FDC_HUB_ADDRESS);
    await reputation.waitForDeployment();
    const repAddr = await reputation.getAddress();
    console.log("FlareTrustReputation deployed to:", repAddr);

    // 2. Deploy Core
    console.log("Deploying FlareTrustCore...");
    const Core = await ethers.getContractFactory("FlareTrustCore");
    const core = await Core.deploy(repAddr, CONTRACT_REGISTRY_ADDRESS);
    await core.waitForDeployment();
    const coreAddr = await core.getAddress();
    console.log("FlareTrustCore deployed to:", coreAddr);

    // 3. Link Core to Reputation
    console.log("Linking contracts...");
    const reputationContract = await ethers.getContractAt("FlareTrustReputation", repAddr);
    await reputationContract.setCoreContract(coreAddr);
    console.log("Linked Core to Reputation");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
