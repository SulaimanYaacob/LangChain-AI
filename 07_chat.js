import { config } from "dotenv";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory"; //* Able to store the context of the conversation
config();

const chat = new ChatOpenAI({ temperature: 0 });

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    "The following is a friendly conversation between a human and an AI. The AI is helpful, creative, clever, and very friendly."
  ),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
  prompt: chatPrompt,
  llm: chat,
});

const response = await chain.call({
  input: "What are traditional English foods?",
});
const response2 = await chain.call({
  input: "What is the most expensive one's?",
});
const response3 = await chain.call({
  input: "What makes it so expensive?",
});

console.log(response3);

//! Agents (Similar to recursive function) - See 08_agents.js
