import type { Entry } from '$lib/catalogue/type';
import client from './client';

const BOOKS_QUERY = `*[
  _type == "book"
]{...}`;

const options = { next: { revalidate: 30 } };

async function fetchBooks(): Promise<Entry[]> {
  return await client.fetch<Entry[]>(BOOKS_QUERY, {}, options);
}

export { fetchBooks };
