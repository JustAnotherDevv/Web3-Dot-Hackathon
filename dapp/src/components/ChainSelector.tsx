import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SUPPORTED_CHAINS } from '@/lib/constants';

interface ChainSelectorProps {
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({ value, onValueChange, label }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <Select value={value.toString()} onValueChange={(v) => onValueChange(parseInt(v))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select chain" />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_CHAINS.map((chain) => (
            <SelectItem key={chain.id} value={chain.id.toString()}>
              <div className="flex items-center space-x-2">
                <span>{chain.icon}</span>
                <span>{chain.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChainSelector;