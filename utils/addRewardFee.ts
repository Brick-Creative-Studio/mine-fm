import { ethers } from "ethers";

const addRewardFee = (basePrice: number | string | bigint) => {
  const ZORA_REWARD_FEE = 0.000777

  if (typeof basePrice === 'number') {
    return basePrice + ZORA_REWARD_FEE
  } else if (typeof basePrice === 'bigint') {
    return basePrice + BigInt(ethers.utils.parseEther(ZORA_REWARD_FEE.toString()).toBigInt())
  } else {
    return BigInt(basePrice) + BigInt(ZORA_REWARD_FEE)
  }
}

export default addRewardFee;