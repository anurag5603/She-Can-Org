import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrev?: () => void;
  canGoNext: boolean;
  isLast?: boolean;
  isLoading?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  subtitle,
  children,
  onNext,
  onPrev,
  canGoNext,
  isLast,
  isLoading
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto animate-in slide-in-from-right-5 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">{subtitle}</p>
        )}
      </div>

      <div className="mb-8">
        {children}
      </div>

      <div className="flex justify-between">
        {onPrev ? (
          <button
            onClick={onPrev}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onNext}
          disabled={!canGoNext || isLoading}
          className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all ${
            canGoNext && !isLoading
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              {isLast ? 'Generate Plan' : 'Next'}
              {!isLast && <ChevronRight className="w-5 h-5 ml-2" />}
            </>
          )}
        </button>
      </div>
    </div>
  );
};