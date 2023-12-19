import { useEffect, useMemo, useState } from "react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import { formatEther } from "ethers/lib/utils";
import  zora1155CreatorABI  from "../abis/Zora-1155-Creator";
import { BigNumber } from "ethers";
import { TokenInfo } from "../../../types/TokenInfo";

export default function useTokenInfo(address: string, tokenId: number){
  const { chain } = useNetwork();

  const creatorContract = {
    address: address as `0x${string}`,
    abi: zora1155CreatorABI,
    chainId: chain?.id,
  } as const;


  const { data, isError, isLoading, isSuccess } = useContractRead({
    ...creatorContract,
    functionName: 'getTokenInfo',
    args: [BigInt(tokenId)],

  })

  const tokenInfo = useMemo<TokenInfo>(() => {
    if (!data || isError) {
      return {
        uri: "",
        maxSupply: 0,
        totalMinted: 0
      };
    }

    const { uri, maxSupply, totalMinted } = data;

    return {
      uri: uri,
      maxSupply: Number(maxSupply),
      totalMinted: Number(totalMinted)
    }
  }, [data])

  return tokenInfo

}