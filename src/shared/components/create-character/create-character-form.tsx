'use client';

import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

type FormData = {
  name: string;
  class: string;
  race: string;
  description: string;
  backstory: string;
};

type CreateCharacterFormProps = {
  onSubmit: (formData: globalThis.FormData) => Promise<void>;
  loading: boolean;
  error: string;
};

export function CreateCharacterForm({ onSubmit, loading, error }: CreateCharacterFormProps) {
  return (
    <form action={onSubmit} className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label htmlFor='name' className='mb-1 block text-sm font-medium'>
            Имя
          </label>
          <Input id='name' name='name' required placeholder='Гэндальф' />
        </div>
        <div>
          <label htmlFor='class' className='mb-1 block text-sm font-medium'>
            Класс
          </label>
          <Input id='class' name='class' required placeholder='Маг' />
        </div>
      </div>
      <div>
        <label htmlFor='race' className='mb-1 block text-sm font-medium'>
          Раса
        </label>
        <Input id='race' name='race' placeholder='Майа' />
      </div>
      <div>
        <label htmlFor='description' className='mb-1 block text-sm font-medium'>
          Описание
        </label>
        <Input id='description' name='description' placeholder='Краткое описание' />
      </div>
      <div>
        <label htmlFor='backstory' className='mb-1 block text-sm font-medium'>
          Предыстория
        </label>
        <Textarea
          id='backstory'
          name='backstory'
          rows={4}
          className='w-full resize-none rounded-md border px-3 py-2 text-sm'
          placeholder='История персонажа...'
        />
      </div>
      {error && <p className='text-sm text-red-500'>{error}</p>}
      <Button type='submit' disabled={loading} className='w-full'>
        {loading ? 'Создаём...' : 'Создать'}
      </Button>
    </form>
  );
}
