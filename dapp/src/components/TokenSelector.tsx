import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { POPULAR_TOKENS } from '@/lib/constants';

interface TokenSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ value, onValueChange, label }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select token" />
        </SelectTrigger>
        <SelectContent>
          {POPULAR_TOKENS.map((token) => (
            <SelectItem key={token.symbol} value={token.symbol}>
              <div className="flex items-center space-x-2">
                <span>{token.icon}</span>
                <span>{token.symbol}</span>
                <span className="text-muted-foreground text-sm">{token.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TokenSelector;