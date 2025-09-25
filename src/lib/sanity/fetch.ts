import client from './client';
import _ from 'lodash';

const options = { next: { revalidate: 30 } };

const FETCH_QUERY = `*[_type == "book" && language == "zh-CN"]{
  title,
  slug,
  language,
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    ...
  },
}`;

async function fetchBooks() {
  const books = await client.fetch(FETCH_QUERY, {}, options);
  return _.flatten(books.map((book) => book._translations));
}

function getBooksByLocale(books, locale: string) {
  return books?.filter((book) => book.language === locale);
}

function getBookById(books, id: string) {
  const res = books?.filter((book) => book._id === id);
  return res ? res[0] : null;
}

function getBook(books, id: string, locale: string) {
  const res = books?.filter((book) => book._id === id && book.language === locale);
  return res ? res[0] : null;
}

export { fetchBooks, getBooksByLocale, getBookById, getBook };
