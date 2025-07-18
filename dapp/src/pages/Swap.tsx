import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import TokenSelector from '@/components/TokenSelector';
import ChainSelector from '@/components/ChainSelector';
import { generateSwapQuote } from '@/lib/mockData';
import { SwapQuote } from '@/types';
import { ArrowUpDown, Settings, Info, Zap, AlertTriangle } from 'lucide-react';

const Swap: React.FC = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [selectedChain, setSelectedChain] = useState(1);
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [slippage, setSlippage] = useState('0.5');

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleGetQuote = async () => {
    if (!fromAmount || fromAmount === '0') return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newQuote = generateSwapQuote(fromToken, toToken, fromAmount);
      setQuote(newQuote);
      setIsLoading(false);
    }, 1000);
  };

  const handleSwap = () => {
    // Simulate swap transaction
    alert('Swap initiated! Check your wallet for confirmation.');
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Swap</span>
            </CardTitle>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chain Selection */}
          <ChainSelector
            value={selectedChain}
            onValueChange={setSelectedChain}
            label="Network"
          />

          {/* From Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <TokenSelector
                  value={fromToken}
                  onValueChange={setFromToken}
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Balance: 2.5 {fromToken}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapTokens}
              className="rounded-full border border-border/40"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.0"
                value={quote?.toAmount || ''}
                readOnly
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <TokenSelector
                  value={toToken}
                  onValueChange={setToToken}
                />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Balance: 5,000 {toToken}
            </div>
          </div>

          {/* Slippage Settings */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Slippage Tolerance</label>
            <div className="flex space-x-2">
              {['0.1', '0.5', '1.0'].map((value) => (
                <Button
                  key={value}
                  variant={slippage === value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </Button>
              ))}
              <Input
                type="number"
                placeholder="Custom"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-20"
              />
            </div>
          </div>

          {/* Get Quote Button */}
          <Button
            onClick={handleGetQuote}
            disabled={!fromAmount || isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? 'Getting Quote...' : 'Get Quote'}
          </Button>

          {/* Quote Details */}
          {quote && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rate</span>
                <span className="text-sm font-medium">
                  1 {quote.fromToken.symbol} = {(parseFloat(quote.toAmount) / parseFloat(quote.fromAmount)).toFixed(4)} {quote.toToken.symbol}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price Impact</span>
                <div className="flex items-center space-x-1">
                  {quote.priceImpact > 3 && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                  <span className={`text-sm font-medium ${quote.priceImpact > 3 ? 'text-yellow-500' : 'text-foreground'}`}>
                    {quote.priceImpact.toFixed(2)}%
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Gas Fee</span>
                <span className="text-sm font-medium">{quote.gasEstimate} ETH</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Route</span>
                <div className="flex items-center space-x-1">
                  {quote.route.map((route, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {route}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            onClick={handleSwap}
            disabled={!quote}
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            Swap
          </Button>

          {/* Info */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Best rates aggregated from multiple DEXs</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Swap;