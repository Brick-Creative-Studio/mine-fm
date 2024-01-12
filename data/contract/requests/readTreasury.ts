import { useEffect, useMemo, useState } from "react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import splitMain from "../abis/SplitMain";
import {
  BONDING_CURVE_V3_GB,
  NULL_ADDRESS,
  SPLIT_MAIN_ADDRESS_GOERLI_BASE
} from "../../../constants/addresses";
import { ethers } from "ethers";

export default function readTreasury(tokenContract: `0x${string}`){

  const { chain } = useNetwork();

  const splitMainContract = {
    address: SPLIT_MAIN_ADDRESS_GOERLI_BASE,
    abi: splitMain,
    chainId: chain?.id,
  } as const;

  const { data, isError, isLoading, isSuccess } = useContractRead({
    ...splitMainContract,
    functionName: 'getETHBalance',
    args: [tokenContract],

  })

  return useMemo<number>(() => {
    if (!data || isError) {
      return 0
    }

    return Number(ethers.utils.formatEther(data))
  }, [data])

}