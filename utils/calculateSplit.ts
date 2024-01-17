import { ethers } from "ethers";

const calculateSplit = (weight: number, treasurySum: number) => {
  const ADMIN_FEE = 0.10
  const ARTIST_SPLIT = 0.50
  const AUDIENCE_SPLIT = 0.40

  if (weight <= 0) {
    return 0
  } else {
    return (weight * AUDIENCE_SPLIT) * treasurySum
  }
}

export default calculateSplit;