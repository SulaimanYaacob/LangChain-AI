import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain";
import { StructuredOutputParser } from "langchain/output_parsers";
config();

const llm = new OpenAI({ temperature: 0 });

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "answer to the user's question",
});

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `Be humorous when answering questions\n{format_instructions}\n Questions: {question}`,
  inputVariables: ["question"],
  partialVariables: { format_instructions: formatInstructions },
});

const input = await prompt.format({
  question: "What is the tallest building in the world?",
});

console.log(input);

const response = await llm.call(input);

console.log(response); // only strings are returned

console.log(await parser.parse(response)); // returns an object with the keys and values
