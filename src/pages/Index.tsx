
import React, { useState, useCallback, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import PasswordInput from '../components/PasswordInput';
import DecryptButton from '../components/DecryptButton';
import FilePreview from '../components/FilePreview';
import StatusMessage from '../components/StatusMessage';
import { useSecurityBlocking } from '../hooks/useSecurityBlocking';
import { Card } from '@/components/ui/card';

interface DecryptedContent {
  content: string;
  fileType: string;
  filename: string;
  isExpired: boolean;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [decryptedContent, setDecryptedContent] = useState<DecryptedContent | null>(null);

  // Enable security blocking
  useSecurityBlocking();

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setDecryptedContent(null);
    setStatus({ type: 'idle', message: '' });
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const handleDecrypt = async () => {
    if (!selectedFile || !password) {
      setStatus({ type: 'error', message: 'Please select a file and enter a password' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'idle', message: 'Decrypting file...' });

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/decrypt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Decryption failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.isExpired) {
        setStatus({ type: 'error', message: 'File has expired and cannot be accessed' });
        setDecryptedContent(null);
      } else {
        setDecryptedContent({
          content: result.content,
          fileType: result.fileType,
          filename: selectedFile.name,
          isExpired: false
        });
        setStatus({ type: 'success', message: 'File decrypted successfully' });
      }
    } catch (error) {
      console.error('Decryption error:', error);
      setStatus({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Decryption failed' 
      });
      setDecryptedContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPassword('');
    setDecryptedContent(null);
    setStatus({ type: 'idle', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">File Decryptor</h1>
          <p className="text-blue-700">Secure file decryption and preview system</p>
        </div>

        {!decryptedContent ? (
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <div className="space-y-6">
              <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
              
              <PasswordInput 
                value={password} 
                onChange={handlePasswordChange}
                disabled={isLoading}
              />
              
              <DecryptButton 
                onClick={handleDecrypt}
                disabled={!selectedFile || !password || isLoading}
                isLoading={isLoading}
              />
              
              <StatusMessage status={status} />
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-900">Decrypted Content</h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Decrypt Another File
              </button>
            </div>
            
            <FilePreview content={decryptedContent} />
            
            <StatusMessage status={status} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
