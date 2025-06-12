
import React from 'react';
import { Card } from '@/components/ui/card';
import PDFPreview from './PDFPreview';
import ImagePreview from './ImagePreview';
import TextPreview from './TextPreview';

interface DecryptedContent {
  content: string;
  fileType: string;
  filename: string;
  isExpired: boolean;
}

interface FilePreviewProps {
  content: DecryptedContent;
}

const FilePreview: React.FC<FilePreviewProps> = ({ content }) => {
  const renderPreview = () => {
    const fileType = content.fileType.toLowerCase();
    
    if (fileType === 'pdf') {
      return <PDFPreview content={content.content} filename={content.filename} />;
    }
    
    if (fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileType)) {
      return <ImagePreview content={content.content} filename={content.filename} />;
    }
    
    // Default to text preview for any other type
    return <TextPreview content={content.content} filename={content.filename} />;
  };

  return (
    <Card className="p-6 bg-white border-blue-200 shadow-xl">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-blue-900">
          {content.filename}
        </h3>
        <p className="text-sm text-blue-600">
          File Type: {content.fileType}
        </p>
      </div>
      
      <div className="relative">
        {renderPreview()}
        
        {/* Watermark overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 right-4 bg-blue-600/20 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
            DECRYPTED CONTENT
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilePreview;
