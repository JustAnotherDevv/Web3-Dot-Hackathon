import { Asset, Transaction, DeFiPosition, SwapQuote, BridgeRoute } from '@/types';
import { SUPPORTED_CHAINS, POPULAR_TOKENS } from './constants';

export const mockAssets: Asset[] = [
  {
    token: POPULAR_TOKENS[0],
    balance: '2.5',
    balanceUSD: 8750,
    price: 3500,
    change24h: 2.3
  },
  {
    token: POPULAR_TOKENS[1],
    balance: '5000',
    balanceUSD: 5000,
    price: 1,
    change24h: 0.1
  },
  {
    token: POPULAR_TOKENS[2],
    balance: '3000',
    balanceUSD: 3000,
    price: 1,
    change24h: -0.2
  },
  {
    token: POPULAR_TOKENS[3],
    balance: '0.15',
    balanceUSD: 10200,
    price: 68000,
    change24h: 1.8
  }
];

export const mockTransactions: Transaction[] = [
  {
    hash: '0x1234...5678',
    type: 'swap',
    status: 'confirmed',
    timestamp: Date.now() - 3600000,
    fromToken: POPULAR_TOKENS[1],
    toToken: POPULAR_TOKENS[0],
    amount: '1000',
    chainId: 1
  },
  {
    hash: '0x8765...4321',
    type: 'bridge',
    status: 'pending',
    timestamp: Date.now() - 1800000,
    fromToken: POPULAR_TOKENS[0],
    toToken: POPULAR_TOKENS[0],
    amount: '0.5',
    chainId: 137
  },
  {
    hash: '0xabcd...efgh',
    type: 'defi',
    status: 'confirmed',
    timestamp: Date.now() - 7200000,
    fromToken: POPULAR_TOKENS[1],
    toToken: POPULAR_TOKENS[1],
    amount: '2000',
    chainId: 1
  }
];

export const mockDeFiPositions: DeFiPosition[] = [
  {
    protocol: 'Aave',
    type: 'lending',
    asset: POPULAR_TOKENS[1],
    amount: '10000',
    apy: 4.2,
    rewards: '42',
    chainId: 1
  },
  {
    protocol: 'Compound',
    type: 'lending',
    asset: POPULAR_TOKENS[0],
    amount: '1.5',
    apy: 3.8,
    rewards: '0.057',
    chainId: 1
  },
  {
    protocol: 'Uniswap',
    type: 'farming',
    asset: POPULAR_TOKENS[2],
    amount: '5000',
    apy: 12.5,
    rewards: '625',
    chainId: 1
  }
];

export const generateSwapQuote = (fromToken: string, toToken: string, amount: string): SwapQuote => {
  const fromTokenData = POPULAR_TOKENS.find(t => t.symbol === fromToken) || POPULAR_TOKENS[0];
  const toTokenData = POPULAR_TOKENS.find(t => t.symbol === toToken) || POPULAR_TOKENS[1];
  
  return {
    fromToken: fromTokenData,
    toToken: toTokenData,
    fromAmount: amount,
    toAmount: (parseFloat(amount) * 0.998).toString(),
    priceImpact: 0.2,
    gasEstimate: '0.005',
    route: ['Uniswap V3', 'Curve']
  };
};

export const generateBridgeRoute = (fromChain: number, toChain: number, token: string, amount: string): BridgeRoute => {
  const fromChainData = SUPPORTED_CHAINS.find(c => c.id === fromChain) || SUPPORTED_CHAINS[0];
  const toChainData = SUPPORTED_CHAINS.find(c => c.id === toChain) || SUPPORTED_CHAINS[1];
  const tokenData = POPULAR_TOKENS.find(t => t.symbol === token) || POPULAR_TOKENS[0];
  
  return {
    fromChain: fromChainData,
    toChain: toChainData,
    token: tokenData,
    amount,
    estimatedTime: '3-5 minutes',
    fee: '0.1%',
    route: 'Multichain Bridge'
  };
};