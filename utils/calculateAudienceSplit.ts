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
    const ethSplit = Math.ceil((weight * AUDIENCE_SPLIT) * treasurySum  * 10000) / 10000
    console.log('eth split:', ethSplit)
    return {
     ethSplit: ethSplit,
    }
  }
}

export default calculateAudienceSplit;