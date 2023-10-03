import { baseGoerli, goerli, mainnet, optimism, optimismGoerli } from 'wagmi/chains'

import { CHAIN_ID, Chain } from '../types/chainTyping'

export const zora = {
  id: 7777777,
  name: 'Zora',
  network: 'zora',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.zora.energy'],
      webSocket: ['wss://rpc.zora.energy'],
    },
    public: {
      http: ['https://rpc.zora.energy'],
      webSocket: ['wss://rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.zora.energy' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 5882,
    },
  },
} as const

export const zoraGoerli = {
  id: 999,
  name: 'Zora Goerli',
  network: 'zora-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Zora Goerli',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.zora.energy'],
      webSocket: ['wss://testnet.rpc.zora.energy'],
    },
    public: {
      http: ['https://testnet.rpc.zora.energy'],
      webSocket: ['wss://testnet.rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.explorer.zora.energy' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 189123,
    },
  },
  testnet: true,
} as const

export const base = {
  id: 8453,
  network: 'base',
  name: 'Base',
  nativeCurrency: { name: 'Base', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://developer-access-mainnet.base.org'],
    },
    public: {
      http: ['https://developer-access-mainnet.base.org'],
    },
  },
  blockExplorers: {
    blockscout: {
      name: 'Basescout',
      url: 'https://base.blockscout.com',
    },
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
    },
    etherscan: {
      name: 'Basescan',
      url: 'https://basescan.org',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
  },
} as const

const MAINNET_CHAINS: Chain[] = [
  { ...mainnet, id: CHAIN_ID.ETHEREUM, slug: 'ethereum', icon: '/chains/ethereum.svg' },
  { ...zora, id: CHAIN_ID.ZORA, slug: 'zora', icon: '/chains/zora.png' },
  {
    ...optimism,
    id: CHAIN_ID.OPTIMISM,
    slug: 'optimism',
    icon: '/chains/optimism.svg',
  },
]

const TESTNET_CHAINS: Chain[] = [
  { ...goerli, id: CHAIN_ID.GOERLI, slug: 'goerli', icon: '/chains/ethereum.svg' },
  {
    ...optimismGoerli,
    id: CHAIN_ID.OPTIMISM_GOERLI,
    slug: 'op-goerli',
    icon: '/chains/optimism.svg',
  },
  {
    ...baseGoerli,
    id: CHAIN_ID.BASE_GOERLI,
    slug: 'base-goerli',
    icon: '/chains/base.svg',
  },
  {
    ...zoraGoerli,
    id: CHAIN_ID.ZORA_GOERLI,
    slug: 'zora-goerli',
    icon: '/chains/zora.png',
  },
]

export const PUBLIC_IS_TESTNET = process.env.NEXT_PUBLIC_NETWORK_TYPE === 'testnet'

export const PUBLIC_ALL_CHAINS = [...MAINNET_CHAINS, ...TESTNET_CHAINS]

export const PUBLIC_DEFAULT_CHAINS = PUBLIC_IS_TESTNET ? TESTNET_CHAINS : MAINNET_CHAINS