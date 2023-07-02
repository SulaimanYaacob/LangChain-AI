import { config } from "dotenv";
import { PromptTemplate } from "langchain";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAI } from "langchain/llms/openai";
import { parser } from "../schema/person_detail.js";
config({ path: "../.env" });

const llm = new OpenAI({ temperature: 0, maxTokens: 2000 });

const loader = new PDFLoader("../elon.pdf"); // load pdf doc about elon musk
const docs = await loader.load();
// console.log(docs);

const formatInstructions = parser.getFormatInstructions();
const template =
  "Extract information from the person description.\n{format_instructions}\nThe response should be presented in a markdown JSON codeblock.\nPerson description: {inputText}";
const prompt = new PromptTemplate({
  template,
  inputVariables: ["inputText"],
  partialVariables: { format_instructions: formatInstructions },
});

const input = await prompt.format({
  inputText: docs[0].pageContent,
});

const response = await llm.call(input);

console.log(await parser.parse(response));
