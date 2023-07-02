import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

export const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    name: z.string().describe("Human name"),
    surname: z.string().describe("Human surname"),
    age: z.number().int().positive().describe("Human age"),
    appearance: z.string().describe("Human appearance description"),
    shortBio: z.string().describe("Short bio description"),
    university: z.string().describe("Human university if attended"),
    gender: z.string().describe("Gender of the human"),
    interests: z.array(z.string()).describe("Json array of interests"),
  })
);
