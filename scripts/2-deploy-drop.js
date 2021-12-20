import { ethers } from 'ethers'
import { readFileSync } from 'fs'
import sdk from './1-initialize-sdk.js'

const APP_MODULE_ADDRESS = "0xfa93594E7E87b2C1DE379E1439A256CF824375c6";
const app = sdk.getAppModule(APP_MODULE_ADDRESS);

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "BakchodDAO Membership", // collections name
      description: "DAO for all the bakchods out there", // description for the collection
      image: readFileSync("scripts/assets/bakchod.png"), // image for the collection
      primarySaleRecipientAddress: ethers.constants.AddressZero, // address of the primary sale recepient
    })

    console.log(
      "✅  Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅  bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()