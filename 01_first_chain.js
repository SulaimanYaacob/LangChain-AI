import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain";
config();

const model = new OpenAI({ temperature: 0 });
const template = `Be funny when answering questions\n Questions: {question}`;

const prompt = new PromptTemplate({ template, inputVariables: ["question"] });

//* Alternative way to create PromptTemplate without stating inputVariables
const altPrompt = PromptTemplate.fromTemplate(template); // same as above
console.log(altPrompt.inputVariables);

// const chain = new LLMChain({ llm: model, prompt });

// const result = await chain.call({
//   question: "What is the capital city of malaysia",
// });

// console.log({ result });
