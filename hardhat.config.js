require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */

const METAMASK_ACCOUNT7_PRIVATE_KEY = "35845f210debb40706fc35afe71253a2165c9e976420d25fa832a25787008b45";

module.exports = {
  solidity: "0.8.19",
  networks: {
    xplaverse: {
      url: `http://34.64.163.205:8545/`,
      accounts: [METAMASK_ACCOUNT7_PRIVATE_KEY]
    }
  }
};