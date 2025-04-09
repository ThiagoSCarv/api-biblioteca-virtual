import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/app-error";
import { string, z } from "zod";

class AuthorsController {
  async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "name is required!" }).trim().min(6),
      });

      const { name } = bodySchema.parse(request.body);

      await knex<AuthorRepository>("authors").insert({ name });

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
      const { name } = request.query;

      const authors = await knex<AuthorRepository>("authors")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json(authors);
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
        name: z.string({ required_error: "name is required!" }).trim().min(6),
      });

      const { name } = bodySchema.parse(request.body);

      const author = await knex<AuthorRepository>("authors")
        .select()
        .where({ id })
        .first();

      if (!author) {
        throw new AppError("author not found");
      }

      await knex<AuthorRepository>("authors")
        .update({ name, updated_at: knex.fn.now() })
        .where({ id });

      return response.status(200).json();
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

      const author = await knex<AuthorRepository>("authors")
        .select()
        .where({ id })
        .first();

      if (!author) {
        throw new AppError("author not found");
      }

      await knex<AuthorRepository>("authors").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { AuthorsController };
