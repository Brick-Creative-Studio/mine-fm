import splitMainABI from "../abis/SplitMain";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";


const useUpdateSplit = (splitProxy: `0x${string}`) => {
  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);


  //base goerli address
  const splitMainAddress = '0x454fd3973A8E532258BD132ae5C696AC2faaE180'

  const splitContract = {
    address: splitMainAddress as `0x${string}`,
    abi: splitMainABI,
  } as const;

  const { config } = usePrepareContractWrite({
    ...splitContract,
    functionName: "updateSplit",
    args: [splitProxy, ["0x364D9b4449331888913D80F52592394c60A155eC" as `0x${string}`,  "0x4258Ad8929893a1404bf04152D888Ae8881A9be4" as `0x${string}`, "0x4bF7F16fDF430DAEAEE579A80233d97A11A81Ae2" as `0x${string}` ], [ 250000, 250000, 500000], 0]
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
