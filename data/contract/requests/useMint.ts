import zora1155CreatorABI from "../abis/Zora-1155-Creator";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import { ethers, utils } from "ethers";
import { SPLIT_MAIN_ADDRESS_GOERLI_BASE,
  MINE_ADMIN_EOA,
  MINE_TEST_EOA,
  MINE_TEST_EOA_2,
  NULL_ADDRESS,
  BONDING_CURVE_GOERLI_BASE_V2,
  BONDING_CURVE_V3_GB
} from "../../../constants/addresses";

const useMint = (tokenAddress: `0x${string}`, tokenID: number, price: string, recipient: `0x${string}`) => {

  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);
  //base goerli address
  const formattedPrice = ethers.utils.parseEther(price).toBigInt()
  const creatorContract = {
    address: tokenAddress,
    abi: zora1155CreatorABI
  } as const;


  const { config } = usePrepareContractWrite({
    ...creatorContract,
    functionName: "mintWithRewards",
    args: [
      BONDING_CURVE_V3_GB,
      BigInt(tokenID),
      BigInt(1),
      utils.defaultAbiCoder.encode(
        ['address'],
        [recipient]
      ) as `0x${string}`,
      MINE_ADMIN_EOA
    ],
    value: formattedPrice,
    // onError(error) {
    //   return console.log("error with prepare write", error);
    //
    // }

  })



  const { data, write, error, isError} = useContractWrite({
    ...config,
    onSettled(data, error) {
      if (error) {
        setSettled(false);
        return console.log("error settling mint tx", error);
      }
      setSettled(true);
    },
    onError(error) {
      if (chain?.network !== 'base-goerli') return console.log("wrong network");
      return console.log("error minting tx", error);
    },
  });


  const {
    isLoading: isTxLoading,
    isSuccess,
    data: txData,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    data,
    isTxLoading,
    isSuccess,
    write,
    settled,
    txData,
  };
}

export default useMint;

