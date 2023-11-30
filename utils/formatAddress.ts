import {ethers} from "ethers";
export const formatAddress = (addy: string) => {
  if(ethers.utils.isAddress(addy)) {
    return `${addy.slice(0, 6)}...${addy.slice(
      addy.length - 4,
      addy.length
    )}`;
  } else {
    return addy
  }
};

export default formatAddress