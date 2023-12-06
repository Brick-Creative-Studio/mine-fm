import splitMainABI from "../abis/SplitMain";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import { SPLIT_MAIN_ADDRESS_GOERLI_BASE,
  MINE_ADMIN_EOA,
  MINE_TEST_EOA
} from "../../../constants/addresses";

const useCreateSplit = (ownerAddress: `0x${string}`) => {
  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);
  //base goerli address

  const splitContract = {
    address: SPLIT_MAIN_ADDRESS_GOERLI_BASE,
    abi: splitMainABI,
  } as const;

  const { config } = usePrepareContractWrite({
    ...splitContract,
    functionName: "createSplit",
    args: [[MINE_TEST_EOA, ownerAddress], [500000, 500000], 0, MINE_ADMIN_EOA]
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

export default useCreateSplit