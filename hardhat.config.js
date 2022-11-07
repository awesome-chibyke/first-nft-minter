// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
//   paths: {
//     artifacts: "./src/srctifacts",
//   },
//   network: {
//     hardhat: {
//       chainId: 1337,
//     },
//   },
// };

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  paths: {
      artifacts: "./src/arctifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
    mumbai: {
      url: process.env.POLYYGON_URL,
      accounts: [`0x${process.env.POLYYGON_PRIVATE_KEY}`],
    },
  },
};
