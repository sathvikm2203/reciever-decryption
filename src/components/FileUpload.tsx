
import React, { useRef } from 'react';
import { FileInput, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.drm')) {
      onFileSelect(file);
    } else if (file) {
      alert('Please select a .drm file');
      event.target.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.drm')) {
      onFileSelect(file);
    } else if (file) {
      alert('Please select a .drm file');
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-blue-900">
        Select DRM File
      </label>
      
      <Card
        className={`p-8 border-2 border-dashed cursor-pointer transition-all duration-200 ${
          selectedFile 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={openFileDialog}
      >
        <div className="text-center">
          {selectedFile ? (
            <div className="space-y-2">
              <FileInput className="w-12 h-12 text-blue-600 mx-auto" />
              <p className="text-blue-900 font-medium">{selectedFile.name}</p>
              <p className="text-blue-600 text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="w-12 h-12 text-blue-400 mx-auto" />
              <p className="text-blue-700">
                Drop your .drm file here or click to browse
              </p>
              <p className="text-blue-500 text-sm">
                Only .drm files are supported
              </p>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".drm"
          onChange={handleFileChange}
          className="hidden"
        />
      </Card>
    </div>
  );
};

export default FileUpload;
