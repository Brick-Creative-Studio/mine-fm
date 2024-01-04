import { useEffect, useMemo, useState } from "react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import bondingCurveStrategyABI from "../abis/BondingCurveStrategy";
import {
  BONDING_CURVE_V3_GB,
  NULL_ADDRESS,
} from "../../../constants/addresses";

export function getPreviousTokenPrice(tokenContract: `0x${string}`, tokenId: number){

  const { chain } = useNetwork();

  const bondingCurveContract = {
    address: BONDING_CURVE_V3_GB,
    abi: bondingCurveStrategyABI,
    chainId: chain?.id,
  } as const;

  const { data, isError, isLoading, isSuccess } = useContractRead({
    ...bondingCurveContract,
    functionName: 'getPreviousTokenPrice',
    args: [tokenContract, BigInt(tokenId)],

  })

  return useMemo<bigint>(() => {
    if (!data || isError) {
      return BigInt(0)
    }

    return data
  }, [data])
}