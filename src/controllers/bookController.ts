import { Router, Request, Response } from 'express';
import {
    listBooks,
    listSpecificBook,
    addBookToDatabase,
} from '../services/booksService';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();

        this.router.get('/', this.getBooks.bind(this));

        this.router.get('/:id', this.getBook.bind(this));

        this.router.post('/', this.createBook.bind(this));
    }

    async getBooks(_req: Request, res: Response) {
        const books = await listBooks();
        return res.status(200).json(books);
    }

    async getBook(req: Request, res: Response) {
        try {
            const specificBook = await listSpecificBook(req);

            if (specificBook === undefined) {
                return res.status(404).json({
                    error: 'Book not found',
                    error_description: `The book ${req.query.id} is not in the database`,
                });
            }
            return res.status(200).json(specificBook);
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                error: 'ID not Number',
                error_description: `The id ${req.query.id} is not a Number`,
            });
        }
    }

    async createBook(req: Request, res: Response) {
        try {
            await addBookToDatabase(req);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                error_description: 'Error when inserting the book',
            });
        }

        return res.status(200).json({
            message: 'Book created successfully',
        });
    }
}

export default new BookController().router;
