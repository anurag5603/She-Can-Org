import React from 'react';
import { Check } from 'lucide-react';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select options..."
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option}
          onClick={() => toggleOption(option)}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${
            selected.includes(option)
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-800 font-medium">{option}</span>
            {selected.includes(option) && (
              <Check className="w-5 h-5 text-emerald-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};