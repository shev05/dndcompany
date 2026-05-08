'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { CreateCharacterDialog } from '@/shared/components/create-character/create-character-dialog';
import { Button } from '@/shared/components/ui';
import { Plus } from 'lucide-react';

export function CreateCharacterButton() {
  const { isAuth } = useAuthStore();
  const [open, setOpen] = useState(false);

  if (!isAuth) return null;

  return (
    <>
      <Button onClick={() => setOpen(true)} className='flex items-center gap-2'>
        <Plus className='size-4' />
        Создать персонажа
      </Button>
      <CreateCharacterDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
