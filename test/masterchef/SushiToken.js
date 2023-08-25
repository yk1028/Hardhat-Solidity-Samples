const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

const TOTAL_SUPPLY = 1000000

describe("Sushi Token contract", function () {
    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const hardhatToken = await ethers.deployContract("SushiToken");

        hardhatToken.mint(owner, TOTAL_SUPPLY)

        // Fixtures can return anything you consider useful for your tests
        return { hardhatToken, owner, addr1, addr2 };
    }
    it("Should transfer sushi tokens between accounts", async function () {
        const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
            deployTokenFixture
        );

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(TOTAL_SUPPLY).to.equal(ownerBalance);

        // Transfer 50 tokens from owner to addr1
        await expect(
            hardhatToken.transfer(addr1.address, 50)
        ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50]);

        // Transfer 50 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
        await expect(
            hardhatToken.connect(addr1).transfer(addr2.address, 50)
        ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50]);
    });
});