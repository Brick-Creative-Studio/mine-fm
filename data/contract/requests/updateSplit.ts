import splitMainABI from "../abis/SplitMain";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import { MINE_ADMIN_EOA, SPLIT_MAIN_ADDRESS_GOERLI_BASE } from "../../../constants/addresses";
import { Rsvp } from "../../../types/Rsvp";
import { ethers } from "ethers";


const updateSplit = (splitWallet: `0x${string}`, roster: Rsvp[] ) => {
  const { chain } = useNetwork();


  let recipientAddresses: `0x${string}`[] = [];
  let percentageSplits: number[] = [];


  function formatPercentage(split: number): number {
    const percentageValue = split * 100;

    const formattedPercentage = percentageValue.toFixed(4);
    return  Number.parseFloat(formattedPercentage.replace('.', ''));
  }

  function sortHexadecimalArray(addressArray: `0x${string}`[]): `0x${string}`[] {
    // Use a custom comparator function to convert hex strings to numbers
    // and compare them numerically.
    const comparator = (a: string, b: string): number => {
      const numA = parseInt(a, 16);
      const numB = parseInt(b, 16);

      if (numA < numB) return -1;
      if (numA > numB) return 1;
      return 0;
    };

    // Use the custom comparator to sort the array
    return addressArray.sort(comparator);
  }


  function sortRoster(roster: Rsvp[]){
    roster.sort((rsvpOne, rsvpTwo) =>
      rsvpOne.walletAddress < rsvpTwo.walletAddress ? -1 :
        rsvpOne.walletAddress > rsvpTwo.walletAddress ? 1 : 0 );

    roster.map((rsvp, index, roster) => {
      recipientAddresses.push(rsvp.walletAddress as `0x${string}`);
      const formattedPercentage = formatPercentage(rsvp.weight)
      percentageSplits.push(formattedPercentage)
    })
  }

  if(roster.length > 1){
    sortRoster(roster)
    percentageSplits[0] =   percentageSplits[0] + 1

    sortHexadecimalArray(recipientAddresses)


  } else if(roster.length === 1) {
    recipientAddresses.push(roster[0].walletAddress as `0x${string}`);
    const formattedPercentage = ethers.utils.parseEther(roster[0].weight.toString()).toNumber()
    percentageSplits.push(formattedPercentage)
  }

  const splitContract = {
    address: SPLIT_MAIN_ADDRESS_GOERLI_BASE as `0x${string}`,
    abi: splitMainABI,
  } as const;



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
