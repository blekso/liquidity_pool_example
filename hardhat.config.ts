import "dotenv/config";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

export default {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/18a02414da964b1580793f867ac1660d`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
