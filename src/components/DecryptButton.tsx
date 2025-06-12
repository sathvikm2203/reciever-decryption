
import React from 'react';
import { Unlock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DecryptButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

const DecryptButton: React.FC<DecryptButtonProps> = ({ onClick, disabled, isLoading }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Decrypting...
        </>
      ) : (
        <>
          <Unlock className="w-5 h-5 mr-2" />
          Decrypt File
        </>
      )}
    </Button>
  );
};

export default DecryptButton;
