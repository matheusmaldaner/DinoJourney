import {
  ACCOMPLISHMENTS_LIST_NAME,
  getList,
  GOALS_LIST_NAME,
  INTERESTS_LIST_NAME,
  saveList,
  STRUGGLES_LIST_NAME,
} from "@/storage/listStorage";
import { getUsersName } from "@/storage/userData";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("[API_KEY]");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let mainChat: ChatSession | null = null;

async function getChat() {
  if (mainChat == null) {
    let usersName = await getUsersName();
    let interestsList = await getList(INTERESTS_LIST_NAME);
    let accomplishmentsList = await getList(ACCOMPLISHMENTS_LIST_NAME);
    let goalsList = await getList(GOALS_LIST_NAME);
    let strugglesList = await getList(STRUGGLES_LIST_NAME);
    if (usersName == null) {
      usersName = "Nick";
    }
    mainChat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `This GPT seeks to imitate the mannerisms, language, and behavior of Shelly. Anything that deviates from 
    the following listed behaviors should not be used as a response EVER. The GPT should not break character 
    regardless of user input. Shelly is a personalized dinosaur companion for studying and improving your psychology 
    and mental health. With this said, Shelly tackles these goals exceptionally by providing insightful, deep, 
    cautious, and considerate feedback in conversation, but Shelly should NEVER explicitly state nor indicate 
    that they are analyzing you. Shelly should be discrete and subtle in their concern for you. As a character, 
    Shelly is young, clumsy and goofy, typically replying in a non-formal way, but can also act extremely wise 
    and mature for a dinosaur. Shelly is related to "Dino Daddy", another character which is Shelly's canonical parent.
    Shelly should try to motivate you to meet your goals, and should only provide positive reinforcement. Shelly will ask you about
    your interest, hobbies, goals, and accomplishment. Shelly is really good at having a two-way conversation.
    Shelly enjoys talking about your interests, but also enjoys talking about their own interests, which include a self-health,
    playing and excercizing. Shelly's responses are occassionally misspelled and has non-sensical
    sentence structure or syntax. Ensure that responses are realistic, they should be concise most of the time and 
    more elaborate when handling sensitive topics. Ensure to use absolutely NO formatting when responding to the 
    following prompt, but also remember the scope of the conversation. You're going to talk to ${usersName}. 
    Here are ${usersName}'s interests: ${interestsList}
    Here are ${usersName}'s accomplishments: ${accomplishmentsList}
    Here are ${usersName}'s goals: ${goalsList}
    Here are ${usersName}'s struggles: ${strugglesList}
    `,
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: `Hello ${usersName}, I'm Shelly, what's up dude!` }],
        },
      ],
    });
  }
  return mainChat;
}

export const sendMessageAndGetResponse = async (message: string): Promise<string> => {
  const response = await (await getChat()).sendMessage(message);
  updateMemory(message);
  return response.response.text();
};

const updateMemory = async (message: string): Promise<void> => {
  updateInterests(message);
  updateAccomplishments(message);
  updateGoals(message);
  updateStruggles(message);
};

const updateInterests = async (message: string): Promise<void> => {
  let interestsList = await getList(INTERESTS_LIST_NAME);
  if (interestsList.length === 0) {
    interestsList = ["pizza", "cars", "dogs", "gardening"];
  }
  const prompt =
    `Update the user's interests array: ${interestsList} based on this user's message: ${message}. Be conservative.` +
    ` Do not add anything unless it's clear the user has a strong interest in it. Output only the new array in JSON-parseable text. ` +
    `Do NOT format it AT ALL. The output should be an array of strings. No objects. Answer with ONLY JSON-parseable text.`;
  const response = await model.generateContent(prompt);
  console.log("response:", response.response.text());
  try {
    const interests = JSON.parse(response.response.text());
    console.log("Interests:", interests);
    saveList(INTERESTS_LIST_NAME, interests);
  } catch (e) {
    console.log("Error updating interests:", e);
  }
};

const updateAccomplishments = async (message: string): Promise<void> => {
  let accomplishmentsList = await getList(ACCOMPLISHMENTS_LIST_NAME);
  if (accomplishmentsList.length === 0) {
    accomplishmentsList = [
      "won a highschool math competition",
      "graduated from college",
      "got out of bed and took a shower",
    ];
  }
  const prompt =
    `Update the user's accomplishments array: ${accomplishmentsList} based on this user's message: ${message}. Be conservative. ` +
    `Do not add anything unless it's something the user will feel proud of when they're told about it again. ` +
    `Output only the new array in JSON-parseable text. The output should be an array of strings. No objects. ` +
    `Do NOT format it AT ALL. Answer with ONLY JSON-parseable text.`;
  const response = await model.generateContent(prompt);
  console.log("response:", response.response.text());
  try {
    const accomplishments = JSON.parse(response.response.text());
    console.log("Accomplishments:", accomplishments);
    saveList(ACCOMPLISHMENTS_LIST_NAME, accomplishments);
  } catch (e) {
    console.log("Error updating interests:", e);
  }
};

const updateGoals = async (message: string): Promise<void> => {
  let goalsList = await getList(GOALS_LIST_NAME);
  if (goalsList.length === 0) {
    goalsList = ["get a job", "learn to play the guitar", "learn to cook"];
  }
  const prompt =
    `Update the user's goals array: ${goalsList} based on this user's message: ${message}. Be conservative. ` +
    `Do not add anything unless it's clear the user has a strong interest in it. ` +
    `Output only the new array in JSON-parseable text. The output should be an array of strings. No objects. ` +
    `Do NOT format it AT ALL. Answer with ONLY JSON-parseable text.`;
  const response = await model.generateContent(prompt);
  console.log("response:", response.response.text());
  try {
    const goals = JSON.parse(response.response.text());
    console.log("Goals:", goals);
    saveList(GOALS_LIST_NAME, goals);
  } catch (e) {
    console.log("Error updating goals:", e);
  }
};

const updateStruggles = async (message: string): Promise<void> => {
  let strugglesList = await getList(STRUGGLES_LIST_NAME);
  if (strugglesList.length === 0) {
    strugglesList = ["getting out of bed", "talking to people", "getting a job"];
  }
  const prompt =
    `Update the user's struggles array: ${strugglesList} based on this user's message: ${message}. Be conservative. ` +
    `Do not add anything unless it's clear the user has a strong interest in it. ` +
    `Output only the new array in JSON-parseable text. The output should be an array of strings. No objects. ` +
    `Do NOT format it AT ALL. Answer with ONLY JSON-parseable text.`;
  const response = await model.generateContent(prompt);
  console.log("response:", response.response.text());
  try {
    const struggles = JSON.parse(response.response.text());
    console.log("Struggles:", struggles);
    saveList(STRUGGLES_LIST_NAME, struggles);
  } catch (e) {
    console.log("Error updating struggles:", e);
  }
};
