import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("GroupRegistry", function () {
  let groupRegistry: any;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
    
    const GroupRegistry = await ethers.getContractFactory("GroupRegistry");
    groupRegistry = await GroupRegistry.deploy();
  });

  it("Should register a new group", async function () {
    const tx = await groupRegistry.registerGroup(
      "Test Group",
      "Test Mission", 
      "ipfs://test-metadata"
    );
    
    await expect(tx)
      .to.emit(groupRegistry, "GroupRegistered")
      .withArgs(1, owner.address, "Test Group", "ipfs://test-metadata");
  });

  it("Should not allow duplicate group registration", async function () {
    await groupRegistry.registerGroup("Test Group", "Mission", "ipfs://test");
    
    await expect(
      groupRegistry.registerGroup("Another Group", "Mission", "ipfs://test2")
    ).to.be.revertedWith("Address already owns a group");
  });
});
