'use server';

import { API_URL } from '@/app/api';
import { Order } from '@/lib/types';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';

export async function getUserOrder() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('jwt')?.value;

  if (!accessToken) {
    redirect('/login');
  }

  const res = await fetch(`${API_URL}/order`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      redirect('/login');
    });
  return res as Order[];
}

export async function deleteUserOrder(id: number) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('jwt')?.value;

  await fetch(`${API_URL}/order/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  });
}
