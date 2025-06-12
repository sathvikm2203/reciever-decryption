
import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  content: string;
  filename: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ content, filename }) => {
  // In a real implementation, content would be base64 or blob URL
  const imageUrl = content.startsWith('data:') ? content : `data:image/jpeg;base64,${content}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-blue-700">
        <ImageIcon className="w-5 h-5" />
        <span className="font-medium">Image File</span>
      </div>
      
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="relative inline-block max-w-full">
          <img
            src={imageUrl}
            alt={filename}
            className="max-w-full h-auto rounded shadow-lg"
            onError={(e) => {
              // Fallback for invalid image data
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-96 h-64 bg-gray-200 rounded flex items-center justify-center">
                    <p class="text-gray-600">Image preview unavailable</p>
                  </div>
                `;
              }
            }}
            style={{ userSelect: 'none', pointerEvents: 'none' }}
          />
          
          {/* Embedded watermark overlay */}
          <div className="absolute top-4 left-4 bg-blue-600/80 text-white px-2 py-1 rounded text-xs font-medium">
            DECRYPTED
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
