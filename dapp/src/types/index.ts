export interface Chain {
  id: number;
  name: string;
  symbol: string;
  rpc: string;
  explorer: string;
  icon: string;
  color: string;
}

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
  chainId: number;
}

export interface Asset {
  token: Token;
  balance: string;
  balanceUSD: number;
  price: number;
  change24h: number;
}

export interface Transaction {
  hash: string;
  type: 'swap' | 'bridge' | 'defi';
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  fromToken: Token;
  toToken: Token;
  amount: string;
  chainId: number;
}

export interface DeFiPosition {
  protocol: string;
  type: 'lending' | 'staking' | 'farming';
  asset: Token;
  amount: string;
  apy: number;
  rewards: string;
  chainId: number;
}

export interface SwapQuote {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  priceImpact: number;
  gasEstimate: string;
  route: string[];
}

export interface BridgeRoute {
  fromChain: Chain;
  toChain: Chain;
  token: Token;
  amount: string;
  estimatedTime: string;
  fee: string;
  route: string;
}