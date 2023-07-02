import { config } from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { OutputFixingParser } from "langchain/output_parsers";
import { parser } from "./schema/person_detail.js";
config();

const llm = new OpenAI({ temperature: 0 });

const template = `
  Generate details of hypothetical person.\n{format_instructions}
  Person description: {description}
`;

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template,
  inputVariables: ["description"],
  partialVariables: { format_instructions: formatInstructions },
});

const input = await prompt.format({
  description: "A dad who has is a scientist and innovator.",
});

const response = await llm.call(input);

try {
  console.log(await parser.parse(response));
} catch (e) {
  console.log("Failed to parse bad output: ", e);

  const fixParser = OutputFixingParser.fromLLM(
    new OpenAI({ temperature: 0 }),
    parser
  );

  const output = await fixParser.parse(response);
  console.log("Fixed output: ", output);
}
