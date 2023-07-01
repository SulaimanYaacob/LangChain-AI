import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";
import { PromptTemplate } from "langchain";
config();

const llm = new OpenAI({ temperature: 0 }); // model

const responseTemplate1 = `
    You are a confused bot that creates more questions to a response text.
    If customers are unsatisfied, offer them a real world assistant to talk to.
    You will get a sentiment and subject as input and evaluate.

    text: {input}
`;

const responseTemplate2 = `
    You are an annoying bot. Your job is to make the customer feel annoyed and unsatisfied.
    Reflect on the input you receive.

    text: {input}
`;

const reviewPromptTemplate1 = new PromptTemplate({
  template: responseTemplate1,
  inputVariables: ["input"],
});

const reviewPromptTemplate2 = new PromptTemplate({
  template: responseTemplate2,
  inputVariables: ["input"],
});

const reviewChain1 = new LLMChain({ llm, prompt: reviewPromptTemplate1 });
const reviewChain2 = new LLMChain({ llm, prompt: reviewPromptTemplate2 });

const overallChain = new SimpleSequentialChain({
  chains: [reviewChain1, reviewChain2],
  verbose: true, // log the chain's progress
});

const result = await overallChain.call({
  input: "Ughh!! What is this cheap product? I want a refund!",
});

//! How to handle multiple Input? 03 will explain that.
