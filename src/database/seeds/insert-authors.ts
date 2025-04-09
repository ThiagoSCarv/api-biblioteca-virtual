import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("authors").insert([
    { name: "Gabriel García Márquez" },
    { name: "Jane Austen" },
    { name: "George Orwell" },
    { name: "Haruki Murakami" },
    { name: "J.K. Rowling" },
    { name: "Ernest Hemingway" },
    { name: "Virginia Woolf" },
    { name: "Leo Tolstoy" },
    { name: "Isabel Allende" },
    { name: "Chinua Achebe" },
  ]);
}
