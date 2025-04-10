import { Knex } from "knex";
import { title } from "process";

export async function seed(knex: Knex): Promise<void> {
    await knex("books").insert([
        { author_id: 1, title: "The Hobbit" },
        { author_id: 1, title: "The Lord of the Rings" },
        { author_id: 1, title: "The Silmarillion" },
      
        { author_id: 2, title: "One Hundred Years of Solitude" },
        { author_id: 2, title: "Love in the Time of Cholera" },
        { author_id: 2, title: "Chronicle of a Death Foretold" },
      
        { author_id: 3, title: "Pride and Prejudice" },
        { author_id: 3, title: "Emma" },
        { author_id: 3, title: "Sense and Sensibility" },
      
        { author_id: 4, title: "1984" },
        { author_id: 4, title: "Animal Farm" },
        { author_id: 4, title: "Homage to Catalonia" },
      
        { author_id: 5, title: "Norwegian Wood" },
        { author_id: 5, title: "Kafka on the Shore" },
        { author_id: 5, title: "1Q84" },
      
        { author_id: 6, title: "Harry Potter and the Sorcerer's Stone" },
        { author_id: 6, title: "Harry Potter and the Prisoner of Azkaban" },
        { author_id: 6, title: "Harry Potter and the Deathly Hallows" },
      
        { author_id: 7, title: "The Old Man and the Sea" },
        { author_id: 7, title: "A Farewell to Arms" },
        { author_id: 7, title: "For Whom the Bell Tolls" },
      
        { author_id: 8, title: "Mrs Dalloway" },
        { author_id: 8, title: "To the Lighthouse" },
        { author_id: 8, title: "Orlando" },
      
        { author_id: 9, title: "War and Peace" },
        { author_id: 9, title: "Anna Karenina" },
        { author_id: 9, title: "The Death of Ivan Ilyich" },
      
        { author_id: 10, title: "The House of the Spirits" },
        { author_id: 10, title: "Of Love and Shadows" },
        { author_id: 10, title: "Paula" },
      
        { author_id: 11, title: "Things Fall Apart" },
        { author_id: 11, title: "No Longer at Ease" },
        { author_id: 11, title: "Arrow of God" }
      ]);
};
