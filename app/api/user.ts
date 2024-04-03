'use server';

import { API_URL } from '@/app/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getUserSession() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('jwt')?.value;

  if (!accessToken) {
    return null;
  }

  const res = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }).then((res) => {
    return res.json();
  });
  return res;
}

export async function getUserProfile() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('jwt')?.value;

  if (!accessToken) {
    redirect('/login');
  }

  const res = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  }).then((res) => {
    return res.json();
  });
  return res;
}

export async function logout() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('jwt')?.value;

  if (!accessToken) {
    redirect('/login');
  }
  cookieStore.delete('jwt');
}
