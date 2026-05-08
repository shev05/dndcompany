'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/shared/components/ui/navigation-menu';
import { useAuthStore } from '@/store/auth-store';
import { useState } from 'react';
import { Button } from '../ui';
import { LoginDialog } from '../login';
import { signOut } from 'next-auth/react';

const navItems = [
  { title: 'Главная', href: '/' },
  { title: 'Персонажи', href: '/person' },
  { title: 'Сюжет', href: '/story' },
];

export function NavMenu() {
  const { isAuth, user, logout } = useAuthStore();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <NavigationMenu className='w-full max-w-full'>
        <NavigationMenuList className='justify-center'>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href={item.href}>{item.title}</Link>}
              />
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            {isAuth ? (
              <div className='flex items-center gap-2 px-2'>
                <span className='text-sm'>{user?.name}</span>
                <Button
                  onClick={() => {
                    logout();
                    signOut({ redirect: false });
                  }}
                  className='text-muted-foreground text-sm hover:text-foreground'
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <Button onClick={() => setLoginOpen(true)} className={navigationMenuTriggerStyle()}>
                Войти
              </Button>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
