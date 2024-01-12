import { SplitsClient } from '@0xsplits/splits-sdk'
import { useNetwork } from "wagmi";
import { createPublicClient, http } from "viem";
import { baseGoerli } from "viem/chains";



const readSplits = async () => {
  const { chain } = useNetwork();

  const publicClient = createPublicClient({
    chain: baseGoerli,
    transport: http()
  })
  const splitsClient = new SplitsClient({
    chainId: chain?.id!,
  })

  const args = {
    splitId: '0x6cea4cbd3664b4666b9d672e7a35d8b88c206e9c',
  }

  const response = await splitsClient.getSplitMetadata(args)

  console.log('splits data', response)

}

export default readSplits