'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from '../api';
import { revalidatePath } from 'next/cache';

export async function addUserOrder(id: number) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('jwt')?.value;

  if (!accessToken) {
    redirect('/login');
    throw new Error('Session timed out');
  }

  const res = await fetch(`${API_URL}/order/${id}`, {
    method: 'POST',
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

  revalidatePath('/', 'layout');
  return res;
}
