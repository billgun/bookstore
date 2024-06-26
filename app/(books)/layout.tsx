import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getUserProfile, getUserSession } from '../api/user';
import { LogoutButton } from './components/logout-button';

interface RootLayoutProps {
  children: React.ReactNode;
}
export default async function DashboardPageLayout({
  children,
}: RootLayoutProps) {
  const profile = await getUserSession();
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Link
            href='/'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <Package2 className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          {!profile ? (
            <Link
              href='/login'
              className='text-muted-foreground transition-colors hover:text-foreground'
            >
              Login
            </Link>
          ) : (
            <LogoutButton />
          )}
          <Link
            href='/orders'
            className='text-muted-foreground transition-colors hover:text-foreground'
          >
            Orders
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='shrink-0 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href='/'
                className='flex items-center gap-2 text-lg font-semibold'
              >
                <Package2 className='h-6 w-6' />
                <span className='sr-only'>Acme Inc</span>
              </Link>
              <Link
                href='/login'
                className='text-muted-foreground hover:text-foreground'
              >
                Login
              </Link>
              <Link
                href='/orders'
                className='text-muted-foreground hover:text-foreground'
              >
                Orders
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
        {children}
      </main>
    </div>
  );
}
