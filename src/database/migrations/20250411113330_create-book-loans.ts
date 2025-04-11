import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("book-loans", (table) => {
    table.increments("id").primary(),
      table.integer("book_id").notNullable().references("id").inTable("books"),
      table.text("user").notNullable(),
      table.timestamp("created_at").defaultTo(knex.fn.now()),
      table.timestamp("closed_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("book-loans");
}
