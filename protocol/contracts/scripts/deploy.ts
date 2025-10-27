import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying GroupRegistry...");
  
  const GroupRegistry = await ethers.getContractFactory("GroupRegistry");
  const groupRegistry = await GroupRegistry.deploy();
  
  await groupRegistry.waitForDeployment();
  const address = await groupRegistry.getAddress();
  
  console.log("✅ GroupRegistry deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
