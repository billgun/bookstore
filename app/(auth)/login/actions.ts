'use server';

import { API_URL } from '@/app/api';
import { cookies } from 'next/headers';

export interface Credentials {
  email: string;
  password: string;
}

export async function signIn(credentials: Credentials) {
  const cookieStore = cookies();
  const res = await fetch(`${API_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    return res.json();
  });
  cookieStore.delete('jwt');
  cookieStore.set('jwt', res.access_token);

  // const res1 = await fetch(`${API_URL}/profile`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-type': 'application/json',
  //     Authorization: 'Bearer ' + res.access_token,
  //   },
  // }).then((res1) => {
  //   return res1.json();
  // });
  // console.log(res1);
}
