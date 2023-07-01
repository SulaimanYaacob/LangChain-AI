import { config } from "dotenv";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";
config();

process.env.LANGCHAIN_HANDLER = "langchain";
const model = new ChatOpenAI({ temperature: 0 });
const tools = [new Calculator()];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "chat-conversational-react-description",
  verbose: true,
});

const input0 = "What is the most expensive book?";
const result0 = await executor.call({ input: input0 });
console.log(result0);

const input1 = "What is 10 divided by 3?";
const result1 = await executor.call({ input: input1 });
console.log(result1);
