
import React from 'react';
import { FileText } from 'lucide-react';

interface PDFPreviewProps {
  content: string;
  filename: string;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ content, filename }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-blue-700">
        <FileText className="w-5 h-5" />
        <span className="font-medium">PDF Document</span>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 min-h-96 relative">
        {/* Simulated PDF preview */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        </div>
        
        {/* Watermark overlay for PDF */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="transform rotate-45 text-blue-600/20 text-6xl font-bold select-none">
            DECRYPTED
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> PDF content would be rendered here. 
            The actual implementation would require a PDF viewer library like react-pdf.
          </p>
          <p className="text-blue-600 text-xs mt-2">
            Content preview: {content.substring(0, 100)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
