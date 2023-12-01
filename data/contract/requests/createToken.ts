import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import  zora1155CreatorABI  from "../abis/Zora-1155-Creator";
import { useNetwork, useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { encodeFunctionData } from 'viem'



const useCreateToken = (maxSupply : number, createReferralAddress: string) => {
  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);

  const address = '0xe96D19CC5d24CD4e71ab9C2eDf3D487156C26A3a'
  const zoraCreator1155 = {
    address: address as `0x${string}`,
    abi: zora1155CreatorABI,
  } as const;

  const { config } = usePrepareContractWrite({
    ...zoraCreator1155,
    functionName: "setupNewTokenWithCreateReferral",
    args: ['', BigInt(2000), createReferralAddress as `0x${string}`],
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


function constructCreate1155TokenCalls(){
  const contractCalls = [];

  const BondingCurveAddress = '0xA23f1ffb3e6FCF78fc62Cc8ADCA81fD2d28DB3Cd' as `0x${string}`;




}

export default useCreateToken