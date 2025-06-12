
import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface StatusMessageProps {
  status: {
    type: 'idle' | 'success' | 'error';
    message: string;
  };
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  if (!status.message) return null;

  const getStatusConfig = () => {
    switch (status.type) {
      case 'success':
        return {
          icon: CheckCircle,
          className: 'text-green-700 bg-green-50 border-green-200',
          iconColor: 'text-green-600'
        };
      case 'error':
        return {
          icon: XCircle,
          className: 'text-red-700 bg-red-50 border-red-200',
          iconColor: 'text-red-600'
        };
      default:
        return {
          icon: Info,
          className: 'text-blue-700 bg-blue-50 border-blue-200',
          iconColor: 'text-blue-600'
        };
    }
  };

  const { icon: Icon, className, iconColor } = getStatusConfig();

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg border ${className}`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
      <p className="text-sm font-medium">{status.message}</p>
    </div>
  );
};

export default StatusMessage;
