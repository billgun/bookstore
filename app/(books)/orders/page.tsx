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
import { getUserProfile } from '@/app/api/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getUserOrder } from '@/app/api/order';
import Orders from './components/orders';
import { Label } from '@/components/ui/label';

export const revalidate = 0;

export default async function DashboardPage() {
  const res = await getUserProfile();
  console.log(res);

  const order = await getUserOrder();
  return (
    <div className='flex w-full items-center'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Orders orders={order} point={res.point} />
        </CardContent>
      </Card>
    </div>
  );
}
