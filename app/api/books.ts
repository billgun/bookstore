import { error } from 'console';
import { API_URL } from '.';
import { Book } from '@/lib/types';

export async function getBooks() {
  const res = await fetch(`${API_URL}/book`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
  return res as Book[];
}
