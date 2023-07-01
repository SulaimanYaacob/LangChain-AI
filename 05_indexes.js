import { config } from "dotenv";
import { TextLoader } from "langchain/document_loaders/fs/text"; // Load text file & save in memory
import { CharacterTextSplitter } from "langchain/text_splitter"; // Create chunks of text
import { OpenAIEmbeddings } from "langchain/embeddings/openai"; // Converts text to vectors
import { FaissStore } from "langchain/vectorstores/faiss"; // Store vectors in memory
config();

const loader = new TextLoader("./restaurant.txt");
const docs = await loader.load();

const splitter = new CharacterTextSplitter({
  chunkSize: 200, // 200 characters per chunk
  chunkOverlap: 50, // 50 characters overlap between chunks
});

const document = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings();

const vectorstore = await FaissStore.fromDocuments(document, embeddings); // Store vectors in memory
await vectorstore.save("./"); // Save vectors to disk (local)

//! How do we use the stored vectors? (See 06_search.js)
