import sdk from "./1-initialize-sdk.js";

const APP_MODULE_ADDRESS = "0xfa93594E7E87b2C1DE379E1439A256CF824375c6";
const app = sdk.getAppModule(APP_MODULE_ADDRESS);

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "BakchodDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "BAKAR",
    });

    console.log(
      "✅  Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();