'use client';
import { deleteUserOrder } from '@/app/api/order';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// interface OrderProps {
//   orders: any[];
// }
export default function Orders({
  orders,
  point,
}: {
  orders: any[];
  point: number;
}) {
  const [userOrders, setUserOrders] = useState(orders);
  const [points, setPoints] = useState(point);
  const router = useRouter();

  const onClickDelete = ({ id, point }: { id: number; point: number }) => {
    const updatedList = userOrders.filter((order) => order.id !== id);
    setUserOrders(updatedList);
    setPoints(points + point);
    deleteUserOrder(id);
    router.refresh();
  };

  return (
    <>
      <Label>Point {point}</Label>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='hidden w-[100px] sm:table-cell'>
              <span className='sr-only'>Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Writer</TableHead>
            <TableHead className='hidden md:table-cell'>Tags</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userOrders.map((data) => {
            return (
              <TableRow key={data.id}>
                <TableCell className='hidden sm:table-cell'>
                  <Image
                    alt='Product image'
                    className='aspect-square rounded-md object-cover'
                    height='64'
                    src={`${data.book.imageUrl}`}
                    width='64'
                  />
                </TableCell>
                <TableCell className='font-medium'>{data.book.name}</TableCell>
                <TableCell className='font-medium'>
                  {data.book.writer}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {data.book.tag.map((t: string, i: number) => {
                    return <Badge key={i}>{t}</Badge>;
                  })}
                </TableCell>
                <TableCell>{data.book.point}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      onClickDelete({ id: data.id, point: data.book.point })
                    }
                    variant={'destructive'}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
