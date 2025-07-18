import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AssetCard from '@/components/AssetCard';
import { mockAssets, mockTransactions, mockDeFiPositions } from '@/lib/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Wallet, DollarSign, Activity, Clock } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.balanceUSD, 0);
  const totalDeFiValue = mockDeFiPositions.reduce((sum, position) => sum + parseFloat(position.amount), 0);

  const portfolioData = mockAssets.map((asset, index) => ({
    name: asset.token.symbol,
    value: asset.balanceUSD,
    fill: ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'][index % 4]
  }));

  const performanceData = [
    { name: 'Jan', value: 24000 },
    { name: 'Feb', value: 26000 },
    { name: 'Mar', value: 28000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 29000 },
    { name: 'Jun', value: totalValue },
  ];

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString() + ' ' + new Date(timestamp).toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-sm text-green-500">
              <TrendingUp size={12} />
              <span>+2.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssets.length}</div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Across {new Set(mockAssets.map(a => a.token.chainId)).size} chains</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DeFi Positions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDeFiValue.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-sm text-green-500">
              <TrendingUp size={12} />
              <span>8.2% average APY</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <div className="flex space-x-2">
              {['24h', '7d', '30d', '1y'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assets and Transactions */}
      <Tabs defaultValue="assets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="defi">DeFi Positions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAssets.map((asset, index) => (
              <AssetCard key={index} asset={asset} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border/40 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(tx.status)}`} />
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {tx.fromToken.symbol} → {tx.toToken.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{tx.amount} {tx.fromToken.symbol}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock size={12} className="mr-1" />
                        {formatTime(tx.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="defi" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockDeFiPositions.map((position, index) => (
              <Card key={index} className="border-border/40">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="text-xl">{position.asset.icon}</div>
                      <div>
                        <div className="font-semibold">{position.protocol}</div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {position.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{position.amount} {position.asset.symbol}</div>
                      <div className="text-sm text-green-500">{position.apy}% APY</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Rewards: {position.rewards} {position.asset.symbol}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;