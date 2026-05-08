'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

type ImageUploadProps = {
  onFileSelect: (file: File) => void;
};

export function ImageUpload({ onFileSelect }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
      )}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileInputRef.current?.click()}
    >
      <input ref={fileInputRef} type='file' accept='image/*' onChange={handleFileInput} className='hidden' />
      <Upload className='mx-auto h-10 w-10 text-gray-400' />
      <p className='mt-2 text-sm font-medium'>Перетащите фото или выберите файл</p>
      <p className='mt-1 text-xs text-gray-500'>PNG, JPG до 5MB</p>
    </div>
  );
}
