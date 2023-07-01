import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain";
config();

const model = new OpenAI({ temperature: 0 });
const template = `Be funny and stupid when answering questions\n Questions: {question}`;
const prompt = new PromptTemplate({ template, inputVariables: ["question"] });

const chain = new LLMChain({ llm: model, prompt });

const result = await chain.call({
  question: "What is the capital city of malaysia",
});

console.log({ result });
