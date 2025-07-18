import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Asset } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AssetCardProps {
  asset: Asset;
  onClick?: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  const isPositive = asset.change24h > 0;

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 border-border/40"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{asset.token.icon}</div>
            <div>
              <h3 className="font-semibold text-foreground">{asset.token.symbol}</h3>
              <p className="text-sm text-muted-foreground">{asset.token.name}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {asset.token.chainId === 1 ? 'ETH' : asset.token.chainId === 137 ? 'POLY' : 'BSC'}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className="font-medium">{asset.balance} {asset.token.symbol}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">USD Value</span>
            <span className="font-semibold text-lg">${asset.balanceUSD.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">24h Change</span>
            <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span className="text-sm font-medium">{isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;