import { config } from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains"; // Retrieve & Load Data from FaissStore
import { OpenAI } from "langchain/llms/openai";
config();

const embeddings = new OpenAIEmbeddings();
const vectorStore = await FaissStore.load("./", embeddings); // Load vectors from disk (local)

const model = new OpenAI({ temperature: 0 });

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model),
  retriever: vectorStore.asRetriever(), //Retrieve documents from vectorStore
  returnSourceDocuments: true,
});

const res = await chain.call({
  query: "Is there any job vacancies?",
});

console.log(res.text);

//! Now lets try to create memory store to keep up the context of the conversation (See 07_chat.js)
