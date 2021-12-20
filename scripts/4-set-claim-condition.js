import sdk from "./1-initialize-sdk.js";

const BUNDLE_DROP_MODULE_ADDRESS = "0x8c55f4187e44b4da5f585BE3c1ff8a9C37865788"
const bundleDrop = sdk.getBundleDropModule(BUNDLE_DROP_MODULE_ADDRESS);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    // Specify conditions.
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 100_000,
      maxQuantityPerTransaction: 1,
    });
    
    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("✅  Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})()