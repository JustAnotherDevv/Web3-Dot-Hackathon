import { Chain, Token } from '@/types';

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpc: 'https://mainnet.infura.io/v3/key',
    explorer: 'https://etherscan.io',
    icon: '🔷',
    color: '#627EEA'
  },
  {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpc: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    icon: '🟣',
    color: '#8247E5'
  },
  {
    id: 56,
    name: 'BNB Chain',
    symbol: 'BNB',
    rpc: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    icon: '🟡',
    color: '#F3BA2F'
  },
  {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    rpc: 'https://arb1.arbitrum.io/rpc',
    explorer: 'https://arbiscan.io',
    icon: '🔵',
    color: '#28A0F0'
  },
  {
    id: 10,
    name: 'Optimism',
    symbol: 'ETH',
    rpc: 'https://mainnet.optimism.io',
    explorer: 'https://optimistic.etherscan.io',
    icon: '🔴',
    color: '#FF0420'
  }
];

export const POPULAR_TOKENS: Token[] = [
  {
    address: '0x0000000000000000000000000000000000000000',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    icon: '🔷',
    chainId: 1
  },
  {
    address: '0xA0b86a33E6441b0e22f73d07a4d0736E8e0C5a34',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    icon: '💵',
    chainId: 1
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    icon: '🟢',
    chainId: 1
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    icon: '🟠',
    chainId: 1
  }
];

export const DEFI_PROTOCOLS = [
  {
    name: 'Aave',
    type: 'lending',
    icon: '👻',
    color: '#B6509E',
    apy: 4.2,
    tvl: '$12.5B'
  },
  {
    name: 'Compound',
    type: 'lending',
    icon: '🌿',
    color: '#00D395',
    apy: 3.8,
    tvl: '$8.2B'
  },
  {
    name: 'Uniswap',
    type: 'farming',
    icon: '🦄',
    color: '#FF007A',
    apy: 12.5,
    tvl: '$4.1B'
  },
  {
    name: 'Curve',
    type: 'farming',
    icon: '🌀',
    color: '#40E0D0',
    apy: 8.3,
    tvl: '$3.8B'
  }
];