import { configureChains } from 'wagmi'
import { baseGoerli, goerli, mainnet, optimism, optimismGoerli, zora, base } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

// import { PUBLIC_IS_TESTNET, base, zora, zoraGoerli } from '../../constants/defaultChains'
import { RPC_URL } from '../../constants/rpc'
import { CHAIN_ID } from '../../types/chainTyping'
import { zoraGoerli } from "../../constants/defaultChains";
import { publicProvider } from "wagmi/providers/public";

// const MAINNET_CHAINS = [mainnet, zora, base, optimism]
// // Mainnet is required here due to hooks like useEnsData that only pull data from mainnet
// const TESTNET_CHAINS = [mainnet, goerli, optimismGoerli, baseGoerli, zoraGoerli]
//
// const AVAILIBLE_CHAINS = PUBLIC_IS_TESTNET ? TESTNET_CHAINS : MAINNET_CHAINS

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [base, baseGoerli, mainnet, goerli],
  [
    // alchemyProvider({
    //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string,
    // }),
    publicProvider()
  ]
)

export { chains, publicClient, webSocketPublicClient }