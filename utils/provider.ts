import { ethers } from 'ethers'
import type { Provider } from '@ethersproject/abstract-provider'

let provider: Provider | undefined

export function getProvider(): Provider | undefined {
  if (!provider) {
    // Use static provider to prevent re-querying for chain id since this won't change
    provider = new ethers.providers.StaticJsonRpcProvider(process?.env?.ETH_RPC_URL)
  }
  return provider
}
