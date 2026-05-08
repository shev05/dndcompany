/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import type { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type ImageCropProps = {
  imgSrc: string;
  onCropComplete: (croppedImage: File) => void;
  onBack: () => void;
};

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
}

export function ImageCrop({ imgSrc, onCropComplete, onBack }: ImageCropProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }, []);

  async function handleSave() {
    if (imgRef.current && completedCrop) {
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const canvas = document.createElement('canvas');
      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;

      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png', 1.0);
      });

      const file = new File([blob], 'character.png', { type: 'image/png' });
      onCropComplete(file);
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-center'>
        <ReactCrop
          crop={crop}
          onChange={(_, p) => setCrop(p)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}
          circularCrop={false}
          className='max-h-[350px]'
        >
          <img ref={imgRef} src={imgSrc} alt='Обрезка' onLoad={onImageLoad} className='max-h-[350px] object-contain' />
        </ReactCrop>
      </div>

      <div className='flex justify-between'>
        <button type='button' onClick={onBack} className='rounded-md border px-3 py-2 text-sm'>
          Назад
        </button>
        <button
          type='button'
          onClick={handleSave}
          disabled={!completedCrop?.width}
          className='bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm disabled:opacity-50'
        >
          Обрезать
        </button>
      </div>
    </div>
  );
}
