import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/app-error";
import { z } from "zod";
import { title } from "process";

class BooksController {
  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const bodySchema = z.object({
        title: z.string({ required_error: "title is required" }),
        author_id: z.number({ required_error: "author_id is required" }),
      });

      const { title, author_id } = bodySchema.parse(request.body);

      const author = await knex<AuthorRepository>("authors")
        .select()
        .where("id", author_id)
        .first();

      if (!author) {
        throw new AppError("author not found");
      }

      await knex<BooksRepository>("books").insert({ title, author_id });

      return response.status(201).json();
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
      const { title, author } = request.query;

      const books = await knex<BooksRepository>("books")
        .select(
          "books.id",
          knex.raw("authors.name AS author"),
          "books.title",
          "books.created_at",
          "books.updated_at"
        )
        .whereLike("title", `%${title ?? ""}%`)
        .andWhereLike("authors.name", `%${author ?? ""}%`)
        .join("authors", "authors.id", "books.author_id");

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
        .refine((value) => !isNaN(value), {
          message: "id must to be a number",
        })
        .parse(request.params.id);

      const bodySchema = z.object({
        author_id: z.number({ required_error: "author_id is required" }),
        title: z.string({ required_error: "title is required" }),
      });

      const { title, author_id } = bodySchema.parse(request.body);

      const book = await knex<BooksRepository>("books")
        .select()
        .where({ id })
        .first();

      if (!book) {
        throw new AppError("book not found");
      }

      await knex<BooksRepository>("books")
        .update({
          title,
          author_id,
          updated_at: knex.fn.now(),
        })
        .where({ id });

      return response.status(200).json(book);
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

      const book = await knex<BooksRepository>("books")
        .select()
        .where({ id })
        .first();

      if (!book) {
        throw new AppError("book not found");
      }

      await knex<BooksRepository>("books").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { BooksController };
