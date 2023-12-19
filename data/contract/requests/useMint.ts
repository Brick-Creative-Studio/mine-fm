import zora1155CreatorABI from "../abis/Zora-1155-Creator";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import { ethers, utils } from "ethers";
import { decodeEventLog, encodeAbiParameters, encodeFunctionData, parseAbiParameter, zeroAddress } from "viem";
import { SPLIT_MAIN_ADDRESS_GOERLI_BASE,
  MINE_ADMIN_EOA,
  MINE_TEST_EOA,
  MINE_TEST_EOA_2,
  NULL_ADDRESS,
  BONDING_CURVE_ADDRESS_GOERLI_BASE,
  BONDING_CURVE_V2_GOERLI_BASE
} from "../../../constants/addresses";
import { BigNumber } from "ethers";

const useMint = (tokenAddress: `0x${string}`, tokenID: number, price: string) => {

  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);
  //base goerli address
  const formattedPrice = ethers.utils.parseEther(price).toBigInt()
  console.log('price', formattedPrice)
  const creatorContract = {
    address: tokenAddress,
    abi: zora1155CreatorABI
  } as const;

  const { config } = usePrepareContractWrite({
    ...creatorContract,
    functionName: "mint",
    args: [
      BONDING_CURVE_V2_GOERLI_BASE,
      BigInt(tokenID),
      BigInt('1'),
      utils.defaultAbiCoder.encode(
        ['address'],
        [MINE_ADMIN_EOA]
      ) as `0x${string}`
    ],
    value: formattedPrice,
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
    },
  });


  const {
    isLoading,
    isSuccess,
    data: txData,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    data,
    isLoading,
    isSuccess,
    write,
    settled,
    txData,
  };
}

export default useMint;

