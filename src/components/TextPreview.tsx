
import React from 'react';
import { FileText } from 'lucide-react';

interface TextPreviewProps {
  content: string;
  filename: string;
}

const TextPreview: React.FC<TextPreviewProps> = ({ content, filename }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-blue-700">
        <FileText className="w-5 h-5" />
        <span className="font-medium">Text Document</span>
      </div>
      
      <div className="relative">
        <div 
          className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-96 max-h-96 overflow-y-auto font-mono text-sm leading-relaxed"
          style={{ 
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none'
          }}
        >
          <pre className="whitespace-pre-wrap text-gray-800">
            {content}
          </pre>
        </div>
        
        {/* CSS Watermark Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 50px,
                rgba(37, 99, 235, 0.3) 50px,
                rgba(37, 99, 235, 0.3) 52px
              )`,
              backgroundSize: '70px 70px'
            }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 text-blue-600/20 text-4xl font-bold select-none">
            DECRYPTED CONTENT
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPreview;
