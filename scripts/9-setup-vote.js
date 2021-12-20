import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const VOTE_MODULE_ADDRESS = "0x901dad8fa5594D1fE39E92d11DF82c9d6d74eeb8";
const TOKEN_MODULE_ADDRESS = "0x799Ed6EF7117DAf8Fb6054918B506791fAD88120";

const voteModule = sdk.getVoteModule(VOTE_MODULE_ADDRESS);
const tokenModule = sdk.getTokenModule(TOKEN_MODULE_ADDRESS);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Transfer 90% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("✅  Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
