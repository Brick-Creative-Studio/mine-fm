import splitMainABI from "../abis/SplitMain";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import { MINE_ADMIN_EOA, SPLIT_MAIN_ADDRESS_GOERLI_BASE } from "../../../constants/addresses";
import { Rsvp } from "../../../types/Rsvp";
import sortHexadecimalArray from "../../../utils/sortHexadecimalArray";
import { ethers } from "ethers";
import { RsvpStat } from "../../../types/RsvpStat";

const updateSplit = (splitWallet: `0x${string}`, roster: RsvpStat[] ) => {
  const { chain } = useNetwork();


  let recipientAddresses: `0x${string}`[] = [];
  let percentageSplits: number[] = [];


  function formatPercentage(split: number): number {

    const percentageValue = split * 100;

    const formattedPercentage = percentageValue.toFixed(4);

    const x = Number.parseFloat(formattedPercentage.replace('.', ''));
    console.log('percent split', x)
    return x
  }

  function sortRoster(roster: RsvpStat[]){
    roster.sort((rsvpOne, rsvpTwo) =>
      rsvpOne.walletAddress < rsvpTwo.walletAddress ? -1 :
        rsvpOne.walletAddress > rsvpTwo.walletAddress ? 1 : 0 );

    roster.map((rsvp, index, roster) => {
      recipientAddresses.push(rsvp.walletAddress as `0x${string}`)

      const formattedPercentage = formatPercentage(rsvp.percentageSplit)
      percentageSplits.push(formattedPercentage)
    })
  }

  if(roster.length > 1){
    sortRoster(roster)
    // percentageSplits[0] = percentageSplits[0] + 1

    sortHexadecimalArray(recipientAddresses)


  } else if(roster.length === 1) {
    recipientAddresses.push(roster[0].walletAddress as `0x${string}`);
    const formattedPercentage = ethers.utils.parseEther(roster[0].percentageSplit.toString()).toNumber()
    percentageSplits.push(formattedPercentage)
  }

  const splitContract = {
    address: SPLIT_MAIN_ADDRESS_GOERLI_BASE as `0x${string}`,
    abi: splitMainABI,
  } as const;


console.log('percent splits', percentageSplits)
  const { config } = usePrepareContractWrite({
    ...splitContract,
    functionName: "updateSplit",
    // NOTICE: address args need to be sorted to work with rA index matching pS index
    args: [splitWallet, recipientAddresses, percentageSplits, 0]
  })

  const { data, write, error, isError} = useContractWrite({
    ...config,
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
    txData,
  };

}

export default updateSplit
