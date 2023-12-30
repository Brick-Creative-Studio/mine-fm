import { useEffect, useMemo, useState } from "react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import bondingCurveV2ABI from "../abis/BCS_v2";
import {
  BONDING_CURVE_V2_GOERLI_BASE,
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
    address: BONDING_CURVE_V2_GOERLI_BASE,
    abi: bondingCurveV2ABI,
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
        fundsRecipient: NULL_ADDRESS
      };
    }

    const {
      saleStart,
      saleEnd,
      fundsRecipient,
      basePricePerToken,
      scalingFactor
    } = data;

    return {
      saleStart: saleStart,
      saleEnd: saleEnd,
      fundsRecipient: fundsRecipient,
      basePricePerToken: basePricePerToken,
      scalingFactor: scalingFactor,
    }
  }, [data])



  return saleInfo;
}
