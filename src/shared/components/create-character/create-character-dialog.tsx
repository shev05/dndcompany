/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ImageUpload } from './image-upload';
import { ImageCrop } from './image-crop';
import { CreateCharacterForm } from './create-character-form';
import { X } from 'lucide-react';
import { addCharacter } from '@/app/person/action';

type Props = { open: boolean; onClose: () => void };

export function CreateCharacterDialog({ open, onClose }: Props) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileSelect(file: File) {
    const url = URL.createObjectURL(file);
    setImgSrc(url);
  }

  function handleCropComplete(file: File) {
    URL.revokeObjectURL(imgSrc);
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setImgSrc('');
  }

  async function handleSubmit(formData: globalThis.FormData) {
    setLoading(true);
    setError('');
    if (imageFile) formData.set('image', imageFile);
    try {
      await addCharacter(formData);
      setPreview(null);
      setImageFile(null);
      onClose();
      router.refresh();
    } catch {
      setError('Ошибка при создании персонажа');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Создание персонажа</DialogTitle>
        </DialogHeader>

        <div>
          <label className='mb-1 block text-sm font-medium'>Изображение</label>
          {preview ? (
            <div className='relative h-24 w-24 overflow-hidden rounded-lg border'>
              <img src={preview} alt='Preview' className='h-full w-full object-cover' />
              <button
                type='button'
                onClick={() => {
                  setPreview(null);
                  setImageFile(null);
                }}
                className='absolute top-1 right-1 rounded-full bg-black/50 p-0.5 text-white'
              >
                <X className='size-3' />
              </button>
            </div>
          ) : imgSrc ? (
            <ImageCrop imgSrc={imgSrc} onCropComplete={handleCropComplete} onBack={() => setImgSrc('')} />
          ) : (
            <ImageUpload onFileSelect={handleFileSelect} />
          )}
        </div>

        <CreateCharacterForm onSubmit={handleSubmit} loading={loading} error={error} />
      </DialogContent>
    </Dialog>
  );
}
