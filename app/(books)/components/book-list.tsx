'use client';

import { getBooks } from '@/app/api/books';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Spinner } from './spinner';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addUserOrder } from '../actions';
import { useToast } from '@/components/ui/use-toast';

export const List = ({ initialList }: { initialList: any[] }) => {
  const [list, setList] = useState(initialList);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const { toast } = useToast();

  useEffect(() => {
    async function loadMoreBooks() {
      setList((prev: any[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...initialList,
      ]);
    }

    if (isInView) {
      loadMoreBooks();
    }
  }, [initialList, isInView]);

  const onClickOrder = ({ id }: { id: number }) => {
    addUserOrder(id);
    toast({
      description: 'Order success',
    });
  };

  return (
    <>
      <div className='flex w-full flex-row flex-wrap justify-between '>
        {list.map((data, i: number) => {
          return (
            <Card key={i} className='flex w-full flex-col md:w-1/2 lg:w-1/3'>
              <CardHeader>
                <CardTitle>{data.name}</CardTitle>
                <CardDescription>{data.writer}</CardDescription>
              </CardHeader>
              <CardContent className='mx-auto'>
                <Image
                  src={`${data.imageUrl}`}
                  alt='Book cover'
                  width={150}
                  height={150}
                />
              </CardContent>
              <CardFooter className='flex w-full flex-1 justify-between'>
                Point: {data.point}
                <div>
                  {data.tag.map((t: string, i: number) => {
                    return <Badge key={i}>{t}</Badge>;
                  })}
                </div>
                <Button onClick={() => onClickOrder({ id: data.id })}>
                  Order
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div ref={ref}>
        <Spinner refId={ref} />
      </div>
    </>
  );
};
