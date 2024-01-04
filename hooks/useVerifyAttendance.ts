import React, { useMemo } from 'react'
import { useBalance, useNetwork, useContractRead } from 'wagmi'
import { BigNumber, ethers } from 'ethers'
import zora1155CreatorABI from '../data/contract/abis/Zora-1155-Creator'

export function useVerifyAttendance(
  walletAddress: `0x${string}`,
  tokenID: number,
  tokenAddress: `0x${string}`
) {
  const { chain } = useNetwork()
  const [isVerified, setVerified] = React.useState(false)

  const creatorContract = {
    address: tokenAddress,
    abi: zora1155CreatorABI,
  } as const
  ;``
  // const tokenCount =  data?.value ? Number(ethers.utils.formatEther(data?.value!)) : 0

  const { data, isError, isLoading, isSuccess, error } = useContractRead({
    ...creatorContract,
    functionName: 'balanceOf',
    args: [walletAddress, BigInt(tokenID)],
  })

  useMemo<number>(() => {
    const tokenCount = data ? Number(ethers.utils.formatEther(data!)) : 0
    if (tokenCount > 0) {
      setVerified(true)
    }

    return tokenCount
  }, [data])

  return { isVerified, isError, isLoading }
}
