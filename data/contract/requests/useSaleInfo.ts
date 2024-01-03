import { useEffect, useMemo, useState } from "react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import bondingCurveStrategyABI from "../abis/BondingCurveStrategy";
import {
  BONDING_CURVE_V3_GB,
  NULL_ADDRESS,
} from "../../../constants/addresses";


type SaleInfo = {
  basePricePerToken: bigint;
  saleStart: bigint;
  saleEnd: bigint;
  fundsRecipient: `0x${string}`;
  scalingFactor: bigint
}

export function useSaleInfo(tokenContract: `0x${string}`, tokenId: number){

  const { chain } = useNetwork();
  const SCALING_FACTOR = 110

  const bondingCurveContract = {
    address: BONDING_CURVE_V3_GB,
    abi: bondingCurveStrategyABI,
    chainId: chain?.id,
  } as const;

  const { data, isError, isLoading, isSuccess } = useContractRead({
    ...bondingCurveContract,
    functionName: 'sale',
    args: [tokenContract, BigInt(tokenId)],

  })

  const saleInfo = useMemo<SaleInfo>(() => {
    if (!data || isError) {
      return {
        saleStart: BigInt(0),
        saleEnd: BigInt(0),
        basePricePerToken: BigInt(0),
        scalingFactor: BigInt(SCALING_FACTOR),
        initialTokenPrice: BigInt(0),
        fundsRecipient: NULL_ADDRESS
      };
    }

    const {
      saleStart,
      saleEnd,
      fundsRecipient,
      basePricePerToken,
      initialTokenPrice,
      scalingFactor
    } = data;

    return {
      saleStart: saleStart,
      saleEnd: saleEnd,
      fundsRecipient: fundsRecipient,
      basePricePerToken: basePricePerToken,
      initialTokenPrice: initialTokenPrice,
      scalingFactor: scalingFactor,
    }
  }, [data])



  return saleInfo;
}
