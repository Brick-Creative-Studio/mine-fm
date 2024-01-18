import { ethers } from "ethers";

const calculateAudienceSplit = (weight: number, treasurySum: number) => {
  const ADMIN_FEE = 0.10
  const ARTIST_SPLIT = 0.50
  const AUDIENCE_SPLIT = 0.40

  if (weight <= 0) {
    return {
      ethSplit: 0,
      percentageSplit: 0
    }
  } else {
    return {
     ethSplit: (weight * AUDIENCE_SPLIT) * treasurySum,
     percentageSplit: weight * AUDIENCE_SPLIT
    }
  }
}

export default calculateAudienceSplit;