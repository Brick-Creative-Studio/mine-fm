import splitMainABI from "../abis/SplitMain";
import { useNetwork, useWaitForTransaction, useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { useState } from "react";
import sortHexadecimalArray from "../../../utils/sortHexadecimalArray";
import { SPLIT_MAIN_ADDRESS_GOERLI_BASE,
  MINE_ADMIN_EOA,
  MINE_TEST_EOA,
  MINE_TEST_EOA_2
} from "../../../constants/addresses";

const useCreateSplit = (ownerAddress: `0x${string}`) => {
  const { chain } = useNetwork();
  const [settled, setSettled] = useState<boolean>(false);

  const splitContract = {
    address: SPLIT_MAIN_ADDRESS_GOERLI_BASE,
    abi: splitMainABI,
  } as const;

  const splitArgs = sortHexadecimalArray([MINE_ADMIN_EOA, ownerAddress])

  const { config } = usePrepareContractWrite({
    ...splitContract,
    functionName: "createSplit",
    args: [splitArgs, [500000, 500000], 0, MINE_ADMIN_EOA]
  })


  const { data, write, error, isError} = useContractWrite({
    ...config,
    onSettled(data, error) {
      if (error) {
        setSettled(false);
        return console.log("error settling", error);
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