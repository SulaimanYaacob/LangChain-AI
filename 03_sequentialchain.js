import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain, SequentialChain } from "langchain/chains";
import { PromptTemplate } from "langchain";
config();

const llm = new OpenAI({ temperature: 0 });

//* 1st Chain
let template =
  "You ordered {dish_name} and your experience was {experience}. Write a review: ";
let promptTemplate = new PromptTemplate({
  template,
  inputVariables: ["dish_name", "experience"],
});
const reviewChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "review",
});

//* 2nd Chain
template = "Given the restaurant review: {review}, write a follow up comment: ";
promptTemplate = new PromptTemplate({ template, inputVariables: ["review"] });
const commentChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "comment",
});

//* 3rd Chain
template = "Summarize the review in one short sentence: \n\n {review}";
promptTemplate = new PromptTemplate({ template, inputVariables: ["review"] });
const summaryChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "summary",
});

//* 4th Chain
template = "Translate the summary to malay: \n\n {summary}";
promptTemplate = new PromptTemplate({ template, inputVariables: ["summary"] });
const translationChain = new LLMChain({
  llm,
  prompt: promptTemplate,
  outputKey: "malay_translation",
});

//* Sequential Chain
const overallChain = new SequentialChain({
  chains: [reviewChain, commentChain, summaryChain, translationChain],
  inputVariables: ["dish_name", "experience"],
  outputVariables: ["review", "comment", "summary", "malay_translation"],
});

//* Call the chain
const result = await overallChain.call({
  dish_name: "Nasi Lemak",
  experience: "Too oily and not enough sambal!",
});

console.log({ result });

//! Now how about we want to pass object as input? for example from databases. 04 will explain that.
