import splitMainABI from "../abis/SplitMain";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import { SPLIT_MAIN_ADDRESS_GOERLI_BASE } from "../../../constants/addresses";


const useUpdateSplit = (splitWallet: `0x${string}`, recipientAddresses: `0x${string}`[] , percentageSplits: number[] ) => {
  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);


  const splitContract = {
    address: SPLIT_MAIN_ADDRESS_GOERLI_BASE as `0x${string}`,
    abi: splitMainABI,
  } as const;

  const { config } = usePrepareContractWrite({
    ...splitContract,
    functionName: "updateSplit",
    //sample address on sample split
    // NOTICE: address args need to be sorted to work with rA index matching pS index
    args: [splitWallet, recipientAddresses, percentageSplits, 0]
  })

  const { data, write, error, isError} = useContractWrite({
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

export default useUpdateSplit
