import db from '../database/database';
import Book from '../models/Book';
import { Request } from 'express';

export const listBooks = async () => {
    return db<Book>('Book').select('*');
};

export const listSpecificBook = async (req: Request) => {
    let idBook: number;
    try {
        idBook = Number(req.params.id);
    } catch {
        return new Error('ID not a number');
    }

    return db<Book>('Book').where('id', idBook).first();
};

export const addBookToDatabase = async (req: Request) => {
    const noCopies = Number(req.body.noCopies);
    delete req.body.noCopies;

    await db<Book>('Book').insert(req.body);

    const requestBook: Book = req.body;

    for (let i = 0; i < noCopies; i += 1) {
        await db('BookCopy').insert({ ID_BOOK: Number(requestBook.ID) });
    }
};
