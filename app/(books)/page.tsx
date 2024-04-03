import Link from 'next/link';
import { CircleUser, Menu, Package2, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { List } from './components/book-list';
import { getBooks } from '../api/books';

export default async function DashboardPage() {
  const list = await getBooks().then((res) => {
    return res;
  });
  return (
    <div className='w-full'>
      <List initialList={list} />
    </div>
  );
}
