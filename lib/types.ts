export interface Book {
  id: number;
  name: string;
  writer: string;
  imageUrl: string;
  point: number;
  tag: string[];
}

export interface Order {
  id: number;
  user: User;
  book: Book;
}

export interface User {
  id: number;
  name: string;
  email: string;
  point: number;
}
