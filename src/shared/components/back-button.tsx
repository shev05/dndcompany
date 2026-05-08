'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant='outline' size='sm' onClick={() => router.back()}>
      <ArrowLeft className='size-4' />
      Назад
    </Button>
  );
}
