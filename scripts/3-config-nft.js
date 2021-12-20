import { readFileSync } from "fs";
import sdk from "./1-initialize-sdk.js";

const BUNDLE_DROP_MODULE_ADDRESS = "0x8c55f4187e44b4da5f585BE3c1ff8a9C37865788";
const bundleDrop = sdk.getBundleDropModule(BUNDLE_DROP_MODULE_ADDRESS);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Certified Bakchod",
        description: "This NFT will give you access to BakchodDAO!",
        image: readFileSync("scripts/assets/nft.png"),
      },
    ]);
    console.log("✅  Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
