import React from 'react';
import { QuoteCalculator } from './QuoteCalculator';
import { ServiceCategory } from '../types';

interface InstantQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceCategory;
  onOrderCreated?: (orderId: string) => void;
}

export const InstantQuoteModal: React.FC<InstantQuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'digitizing',
  onOrderCreated,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full my-8">
        <QuoteCalculator
          initialService={initialService}
          onClose={onClose}
          onOrderCreated={onOrderCreated}
        />
      </div>
    </div>
  );
};
