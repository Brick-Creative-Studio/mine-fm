import type {
  Address,
  Hex,
  PublicClient,
  WalletClient,
  SimulateContractParameters,
  TransactionReceipt,
} from "viem";
import { decodeEventLog, encodeFunctionData, zeroAddress } from "viem";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import  zora1155CreatorABI  from "../abis/Zora-1155-Creator";
import bondingCurveStrategyABI from "../abis/BondingCurveStrategy";
import zoraContractFactoryABI from "../abis/Zora-1155-Factory";
import { useNetwork, useWaitForTransaction } from "wagmi";
import { useEffect, useState } from "react";
import { create1155CreatorClient } from "@zoralabs/protocol-sdk";
import { useEventStore } from "../../../stores";
import { useWalletClient } from 'wagmi'




export const useCreateToken = ( nextTokenId: number,
                                // How many NFTs upon initialization to mint to the creator
                                tokenMetadataURI: string,
                                price: number,
                                // Address to use as the create referral, optional.
                                createReferral: `0x${string}`,
                                // wallet sending the transaction
                                account: `0x${string}`,
                                saleStart: number,
                                saleEnd: number,
                                fundsRecipient: `0x${string}`) => {

  // @ts-ignore
  const SALE_END_FOREVER = 18446744073709551615n;
  const { metaDataURL } = useEventStore()
// Default royalty bps
  const ROYALTY_BPS_DEFAULT = 1000;

  type SalesConfigParamsType = {
    // defaults to 0
    pricePerToken?: bigint;
    // defaults to 0, in seconds
    saleStart?: bigint;
    // defaults to forever, in seconds
    saleEnd?: bigint;
    // max tokens that can be minted per address
    maxTokensPerAddress?: bigint;
    fundsRecipient?: Address;
  };
  const bondingCurveAddress = '0x7512DE296b1C273475e22Dccf8268edDe8dF3b7A' as `0x${string}`;

 const DEFAULT_SALE_SETTINGS = {
    fundsRecipient: zeroAddress,
    // Free Mint
    basePricePerToken: BigInt(0),
    // Sale start time – defaults to beginning of unix time
    saleStart: 0,
    // This is the end of uint64, plenty of time
    saleEnd: SALE_END_FOREVER,
    // 0 Here means no limit
    maxTokensPerAddress: 0,
    scalingFactor: BigInt(110)
 };

// Hardcode the permission bit for the minter
  const PERMISSION_BIT_MINTER = BigInt(2 ** 2)
  ;

  type ContractType =
    | {
    name: string;
    uri: string;
    defaultAdmin?: Address;
  }
    | Address;

  type RoyaltySettingsType = {
    royaltyBPS: number;
    royaltyRecipient: Address;
  };

  const maxSupply = BigInt(2000);
  const mintToCreatorCount = BigInt(1);

  const salesConfig = encodeFunctionData({
    abi: bondingCurveStrategyABI,
    functionName: 'setSale',
    args: [
      BigInt(nextTokenId),
      {
        basePricePerToken: BigInt(price),
        saleStart: BigInt(saleStart) || BigInt(0),
        saleEnd: BigInt(saleEnd) || BigInt(0),
        fundsRecipient: fundsRecipient,
        scalingFactor: BigInt(110)
      },
    ],
  })

  const salesConfigWithDefaults = {
    // Set static sales default.
    ...DEFAULT_SALE_SETTINGS,
    // Override with user settings.
    salesConfig,
  };


  const setupActions = [
    encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: "assumeLastTokenIdMatches",
      args: [BigInt(nextTokenId - 1)],
    }),
    createReferral
      ? encodeFunctionData({
        abi: zora1155CreatorABI,
        functionName: "setupNewTokenWithCreateReferral",
        args: [tokenMetadataURI, maxSupply, createReferral],
      })
      : encodeFunctionData({
        abi: zora1155CreatorABI,
        functionName: "setupNewToken",
        args: [tokenMetadataURI, maxSupply],
      }),
    encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: "addPermission",
      args: [BigInt(nextTokenId), bondingCurveAddress, PERMISSION_BIT_MINTER],
    }),
    encodeFunctionData({
      abi: zora1155CreatorABI,
      functionName: "callSale",
      args: [
        BigInt(nextTokenId),
        bondingCurveAddress,
        encodeFunctionData({
          abi: bondingCurveStrategyABI,
          functionName: 'setSale',
          args: [
            BigInt(nextTokenId),
            {
              basePricePerToken: BigInt(price),
              saleStart: BigInt(saleStart) || BigInt(0),
              saleEnd: BigInt(saleEnd) || BigInt(0),
              fundsRecipient: fundsRecipient,
              scalingFactor: BigInt(110)
            },
          ],
        }),
      ],
    }),
  ];

  if (mintToCreatorCount) {
    setupActions.push(
      encodeFunctionData({
        abi: zora1155CreatorABI,
        functionName: "adminMint",
        args: ["0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2", BigInt(nextTokenId), mintToCreatorCount, "0x"],
      }),
    );
  }


    setupActions.push(
      encodeFunctionData({
        abi: zora1155CreatorABI,
        functionName: "updateRoyaltiesForToken",
        args: [
          BigInt(nextTokenId),
          {
            royaltyMintSchedule: 0,
            royaltyBPS: 0 || ROYALTY_BPS_DEFAULT,
            royaltyRecipient: "0x",
          },
        ],
      }),
    );

  //
  // const writeConfig: PrepareWriteContractResult = await prepareWriteContract({
  //   abi: ZoraCreator1155FactoryImpl.abi,
  //   address: addresses.ZORA_1155.FACTORY_PROXY[chainId],
  //   functionName: 'createContract',
  //   chainId,
  //   args: [
  //     collection.contractURI,
  //     collection.contractName,
  //     royaltyConfig,
  //     creatorAddress,
  //     create1155TokensCalls,
  //   ],
  // })
  //
  // const { hash } = await writeContract(writeConfig)


}

export async function createContract({
                                       publicClient,
                                       walletClient,
                                       metaDataURL
                                     }: {
  publicClient: PublicClient;
  walletClient: WalletClient;
  metaDataURL: string
}) {
  const creatorClient = create1155CreatorClient({ publicClient });
  const { request } = await creatorClient.createNew1155Token({
    contract: {
      name: "testContract",
      uri: metaDataURL,
    },
    tokenMetadataURI: metaDataURL,
    account: "0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2" as `0x${string}`,
    mintToCreatorCount: 1,
  });
  const { request: simulateRequest } = await publicClient.simulateContract(request);
  const hash = await walletClient.writeContract(simulateRequest);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  return receipt;
}