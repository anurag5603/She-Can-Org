import React from 'react';
import { Check } from 'lucide-react';

interface SingleSelectProps {
  options: { value: string; label: string; description?: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  selected,
  onChange
}) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-102 ${
            selected === option.value
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-800 font-medium">{option.label}</span>
              {option.description && (
                <p className="text-gray-600 text-sm mt-1">{option.description}</p>
              )}
            </div>
            {selected === option.value && (
              <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};