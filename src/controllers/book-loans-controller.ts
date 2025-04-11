import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/app-error";
import { z } from "zod";

class BookLoansControllers {
  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const bodySchema = z.object({
        book_id: z.number({ required_error: "book id is required" }),
        user: z.string({ required_error: "user is required" }),
      });

      const { book_id, user } = bodySchema.parse(request.body);

      const book = await knex<BookLoansRepository>("book-loans")
        .select()
        .where({ book_id })
        .whereNull("closed_at")
        .first();

      if(book) {
        throw new AppError("book is on loan")
      }
      
      await knex<BookLoansRepository>("book-loans").insert({ book_id, user });

      return response.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }

  async index(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { title, user } = request.query;

      const books = await knex<BookLoansRepository>("book-loans")
        .select(
          "book-loans.id",
          "books.title",
          "book-loans.user",
          "book-loans.created_at",
          "book-loans.closed_at"
        )
        .whereLike("books.title", `%${title ?? ""}%`)
        .andWhereLike("book-loans.user", `%${user ?? ""}%`)
        .join("books", "books.id", "book-loans.book_id");

      return response.json(books);
    } catch (error) {
      next(error);
    }
  }

  async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const loan = await knex<BookLoansRepository>("book-loans")
        .select()
        .where({ id })
        .first();

      if (loan?.closed_at) {
        throw new AppError("loan already completed");
      }

      await knex<BookLoansRepository>("book-loans")
        .update({ closed_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "id must to be a number",
        })
        .parse(request.params.id);

      const loan = await knex<BookLoansRepository>("book-loans")
        .select()
        .where({ id })
        .first();

      if (!loan) {
        throw new AppError("loan not found");
      }

      await knex<BookLoansRepository>("book-loans").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { BookLoansControllers };
