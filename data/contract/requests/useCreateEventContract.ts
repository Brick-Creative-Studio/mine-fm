import type {
  Address,
} from "viem";
import { decodeEventLog, encodeFunctionData, zeroAddress } from "viem";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import  zora1155CreatorABI  from "../abis/Zora-1155-Creator";
import bondingCurveV2ABI from "../abis/BCS_v2";
import zoraContractFactoryABI from "../abis/Zora-1155-Factory";
import { useNetwork, useWaitForTransaction } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { BONDING_CURVE_V2_GOERLI_BASE,
  MINE_ADMIN_EOA,
  ZORA_FACTORY_GOERLI_BASE,
  NULL_ADDRESS,
  EX_SPLIT_WALLET_GOERLI_BASE
} from "../../../constants/addresses";

export function useCreateEventContract({ tokenURI, createReferral, ownerAddress, saleStart, saleEnd, basePrice, splitAddress } : {
  tokenURI: string,
  createReferral: `0x${string}`,
  ownerAddress: `0x${string}`
  saleStart: number,
  saleEnd: number,
  basePrice: string,
  splitAddress: `0x${string}`

}){



  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);

  const constructActions = () => {
    const contractCalls = [];


    const setupNewToken = encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: "setupNewTokenWithCreateReferral",
      args: [tokenURI,  BigInt(2000), createReferral as `0x${string}`],
    });

    type RoyaltySettingsType = {
      royaltyBPS: number;
      royaltyRecipient: Address;
    };

    const royaltyConfig = encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: 'updateRoyaltiesForToken',
      args: [
        BigInt(0),
        {
          royaltyBPS: 0,
          royaltyRecipient: ownerAddress ? ownerAddress : NULL_ADDRESS,
          royaltyMintSchedule: 0,
        },
      ],
    })

    const bondingCurveApproval = encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: "addPermission",
      args: [
        BigInt(0),
        BONDING_CURVE_V2_GOERLI_BASE,
        BigInt(2 ** 2), // PERMISSION_BIT_MINTER
      ],
    });

    const saleData = encodeFunctionData({
      abi: bondingCurveV2ABI,
      functionName: 'setSale',
      args: [
        BigInt(1),
        {
          basePricePerToken: BigInt(ethers.utils.parseEther(basePrice).toBigInt()),
          saleStart: BigInt(saleStart),
          saleEnd: BigInt(saleEnd),
          fundsRecipient: splitAddress || NULL_ADDRESS,
          scalingFactor: BigInt( 110)
        },
      ],
    })

    const callSale = encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: 'callSale',
      args: [BigInt(0), BONDING_CURVE_V2_GOERLI_BASE, saleData],
    })

    contractCalls.push(setupNewToken, bondingCurveApproval, callSale)

    return contractCalls;
  }

  const setUpActions = constructActions();

  const zora1155Factory = {
    address: ZORA_FACTORY_GOERLI_BASE,
    abi: zoraContractFactoryABI,
  } as const;
  // console.log('encoded arg setup',setUp)

  const { config } = usePrepareContractWrite({
    ...zora1155Factory,
    functionName: "createContract",
    chainId: 84531,
    args: [tokenURI,
      'Test MFM Contract',
      {
      royaltyBPS: 0,
      royaltyRecipient: MINE_ADMIN_EOA,
      royaltyMintSchedule: 0,
    },
      MINE_ADMIN_EOA ,
      setUpActions as `0x${string}`[],
    ],
  });

  const { data, write, error, isError } = useContractWrite({
    ...config,
    onSettled(data, error) {
      if (error) {
        setSettled(false);
        return console.log("error settling");
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