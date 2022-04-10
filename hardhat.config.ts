import "dotenv/config";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

export default {
  solidity: "0.8.13",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/3eb7af332c664fe2ab71b6b4bea58070`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
