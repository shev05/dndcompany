'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui';
import { useAuthStore } from '@/store/auth-store';

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Неверный email или пароль');
    } else {
      const session = await fetch('/api/auth/session').then((res) => res.json());
      setUser(session?.user ?? null);
      onClose();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вход</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='email' className='mb-1 block text-sm font-medium'>
              Email
            </label>
            <Input id='email' name='email' type='email' required className='w-full rounded-md border px-3 py-2' />
          </div>
          <div>
            <label htmlFor='password' className='mb-1 block text-sm font-medium'>
              Пароль
            </label>
            <Input
              id='password'
              name='password'
              type='password'
              required
              className='w-full rounded-md border px-3 py-2'
            />
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
          <Button
            type='submit'
            disabled={loading}
            className='bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md px-4 py-2 disabled:opacity-50'
          >
            {loading ? 'Входим...' : 'Войти'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
