import readline from "readline";
import { config } from "dotenv";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { BufferMemory } from "langchain/memory";
import chalk from "chalk";
config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

async function askQuestion() {
  rl.question("> ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    await chain.call({ input }).then(({ response }) => {
      console.log(chalk.blue(`${response} \n`));
      askQuestion();
    });
  });
}

askQuestion();
