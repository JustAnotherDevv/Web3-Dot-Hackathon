import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ChainSelector from '@/components/ChainSelector';
import TokenSelector from '@/components/TokenSelector';
import { generateBridgeRoute } from '@/lib/mockData';
import { BridgeRoute } from '@/types';
import { Grid as BridgeIcon, Clock, DollarSign, Route, AlertCircle } from 'lucide-react';

const Bridge: React.FC = () => {
  const [fromChain, setFromChain] = useState(1);
  const [toChain, setToChain] = useState(137);
  const [token, setToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [route, setRoute] = useState<BridgeRoute | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetRoute = async () => {
    if (!amount || amount === '0') return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newRoute = generateBridgeRoute(fromChain, toChain, token, amount);
      setRoute(newRoute);
      setIsLoading(false);
    }, 1000);
  };

  const handleBridge = () => {
    // Simulate bridge transaction
    alert('Bridge transaction initiated! This may take a few minutes to complete.');
  };

  const swapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BridgeIcon className="h-5 w-5" />
            <span>Cross-Chain Bridge</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Chain */}
          <ChainSelector
            value={fromChain}
            onValueChange={setFromChain}
            label="From Chain"
          />

          {/* To Chain */}
          <ChainSelector
            value={toChain}
            onValueChange={setToChain}
            label="To Chain"
          />

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={swapChains}
              className="rounded-full border border-border/40"
            >
              <Route className="h-4 w-4" />
            </Button>
          </div>

          {/* Token Selection */}
          <TokenSelector
            value={token}
            onValueChange={setToken}
            label="Token"
          />

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="text-sm text-muted-foreground">
              Balance: 2.5 {token}
            </div>
          </div>

          {/* Get Route Button */}
          <Button
            onClick={handleGetRoute}
            disabled={!amount || isLoading || fromChain === toChain}
            className="w-full"
            variant="outline"
          >
            {isLoading ? 'Finding Route...' : 'Get Route'}
          </Button>

          {/* Route Details */}
          {route && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Route</span>
                <Badge variant="secondary">{route.route}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Estimated Time
                </span>
                <span className="text-sm font-medium">{route.estimatedTime}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Bridge Fee
                </span>
                <span className="text-sm font-medium">{route.fee}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">You'll receive</span>
                  <span className="text-sm font-medium">
                    {(parseFloat(route.amount) * 0.999).toFixed(4)} {route.token.symbol}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  On {route.toChain.name}
                </div>
              </div>
            </div>
          )}

          {/* Bridge Button */}
          <Button
            onClick={handleBridge}
            disabled={!route}
            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            Bridge Tokens
          </Button>

          {/* Warning */}
          <div className="flex items-start space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-600 dark:text-yellow-400">
              <div className="font-medium">Important:</div>
              <div>Cross-chain bridges can take several minutes to complete. Never close your browser during the bridging process.</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bridge Status */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle className="text-lg">Recent Bridge Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <div>
                  <div className="font-medium">ETH → POLY</div>
                  <div className="text-sm text-muted-foreground">0.5 ETH</div>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <div>
                  <div className="font-medium">USDC → BSC</div>
                  <div className="text-sm text-muted-foreground">1000 USDC</div>
                </div>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bridge;