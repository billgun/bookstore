'use client';

import { logout } from '@/app/api/user';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();
  const onClickLogout = () => {
    logout();
    router.push('/');
    router.refresh();
  };
  return (
    <Button variant={'ghost'} onClick={onClickLogout}>
      Logout
    </Button>
  );
};
