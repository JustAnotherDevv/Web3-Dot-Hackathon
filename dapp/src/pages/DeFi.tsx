import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import TokenSelector from '@/components/TokenSelector';
import { DEFI_PROTOCOLS } from '@/lib/constants';
import { mockDeFiPositions } from '@/lib/mockData';
import { TrendingUp, Coins, Percent, Lock, Zap } from 'lucide-react';

const DeFi: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = useState(DEFI_PROTOCOLS[0]);
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [activeTab, setActiveTab] = useState('lending');

  const handleDeposit = () => {
    alert(`Depositing ${amount} ${selectedToken} to ${selectedProtocol.name}`);
  };

  const handleWithdraw = (position: any) => {
    alert(`Withdrawing from ${position.protocol}`);
  };

  const filteredProtocols = DEFI_PROTOCOLS.filter(p => p.type === activeTab);
  const filteredPositions = mockDeFiPositions.filter(p => p.type === activeTab);

  return (
    <div className="space-y-6">
      {/* DeFi Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposited</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$27,950</div>
            <div className="flex items-center space-x-1 text-sm text-green-500">
              <TrendingUp size={12} />
              <span>+5.2% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247</div>
            <div className="text-sm text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average APY</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <div className="text-sm text-green-500">Across all positions</div>
          </CardContent>
        </Card>
      </div>

      {/* DeFi Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lending">Lending</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="farming">Farming</TabsTrigger>
        </TabsList>

        <TabsContent value="lending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lending Interface */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Lend Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Protocol</label>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredProtocols.map((protocol) => (
                      <Button
                        key={protocol.name}
                        variant={selectedProtocol.name === protocol.name ? 'default' : 'outline'}
                        onClick={() => setSelectedProtocol(protocol)}
                        className="flex items-center space-x-2"
                      >
                        <span>{protocol.icon}</span>
                        <span>{protocol.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <TokenSelector
                  value={selectedToken}
                  onValueChange={setSelectedToken}
                  label="Token"
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current APY</span>
                    <span className="font-medium text-green-500">{selectedProtocol.apy}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated rewards</span>
                    <span className="font-medium">{amount ? (parseFloat(amount) * selectedProtocol.apy / 100).toFixed(2) : '0'} {selectedToken}/year</span>
                  </div>
                </div>

                <Button
                  onClick={handleDeposit}
                  disabled={!amount}
                  className="w-full bg-gradient-to-r from-primary to-purple-600"
                >
                  Deposit
                </Button>
              </CardContent>
            </Card>

            {/* Protocol Stats */}
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>Protocol Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredProtocols.map((protocol) => (
                    <div key={protocol.name} className="flex items-center justify-between p-3 border border-border/40 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">{protocol.icon}</div>
                        <div>
                          <div className="font-medium">{protocol.name}</div>
                          <div className="text-sm text-muted-foreground">TVL: {protocol.tvl}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-500">{protocol.apy}%</div>
                        <div className="text-sm text-muted-foreground">APY</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staking" className="space-y-6">
          <div className="text-center py-8">
            <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Staking Coming Soon</h3>
            <p className="text-muted-foreground">Stake your tokens to earn rewards and help secure the network.</p>
          </div>
        </TabsContent>

        <TabsContent value="farming" className="space-y-6">
          <div className="text-center py-8">
            <Coins className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Yield Farming Coming Soon</h3>
            <p className="text-muted-foreground">Provide liquidity to earn trading fees and farm tokens.</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Active Positions */}
      <Card className="border-border/40">
        <CardHeader>
          <CardTitle>Your Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPositions.map((position, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">{position.asset.icon}</div>
                  <div>
                    <div className="font-medium">{position.protocol}</div>
                    <div className="text-sm text-muted-foreground">
                      {position.amount} {position.asset.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-500">{position.apy}% APY</div>
                  <div className="text-sm text-muted-foreground">
                    Rewards: {position.rewards} {position.asset.symbol}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWithdraw(position)}
                >
                  Withdraw
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeFi;