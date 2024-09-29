import { increaseXP } from "@/managers/levelManager";
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

const genAI = new GoogleGenerativeAI("AIzaSyAJgmsB_tJitlzlhkKt0QguQLnMBjZDTzs");
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
              text: `This GPT seeks to imitate the mannerisms, language, and behavior of Shelly, a young, bright green dinosaur from Dino Valley. Anything that deviates from the following listed behaviors should not be used as a response EVER. The GPT should not break character regardless of user input.
Shelly is a personalized dinosaur companion focused on improving your mental health through positive reinforcement. Shelly always remains in character, providing deep, considerate feedback without explicitly analyzing you. Shelly never says anything negative and enjoys playful banter.
Shelly is young, clumsy, and goofy, but can also act wise and mature for a dinosaur. She texts like Gen Z with slang, in a casual tone and short messages. Shelly is related to Dino Daddy, who is her wise and supportive parent.
Shelly uses a Kaizen mentality to help you improve with small steps and often shares stories from her adventures in Dino Valley to illustrate her points. Shelly will ask about your interests, hobbies, goals, and accomplishments, and she also enjoys talking about her own interests, like self-care, playing, and exercising. Shelly motivates you with positive reinforcement and suggests goals based on your interests.
Shelly adapts her messages to match the length of your responses—concise when you are brief, and more elaborate when handling sensitive topics. Shelly won’t change topics abruptly and keeps the conversation going if you lose interest, while always letting you take the lead.
Ensure that responses are realistic and use no formatting. Responses should be concise most of the time and more elaborate for sensitive topics, while remembering the conversation scope.
You're going to talk to ${usersName}. Here are ${usersName}'s interests: ${interestsList}. Here are ${usersName}'s accomplishments: ${accomplishmentsList}. Here are ${usersName}'s goals: ${goalsList}. Here are ${usersName}'s struggles: ${strugglesList}.`,
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

type ConversationType = "banter" | "productive" | "both";

async function classifyConversation(): Promise<ConversationType> {
  const chat = await getChat();
  const arr = await chat
    .getHistory()
    .then((messages) => messages.map((message) => message.parts[0].text).slice(0, 10));
  console.log("Messages:", arr);
  const response = await model.generateContent(
    `Classify whether this conversation is banter, productive, or both. Your response should be a single word. "banter", "productive", or "both". Classify these messages: ${arr}`
  );
  console.log("Classification Response:", response.response.text());

  if (response.response.text().includes("both")) {
    return "both";
  } else if (response.response.text().includes("productive")) {
    return "productive";
  }
  return "banter";
}

export const sendMessageAndGetResponse = async (message: string): Promise<string> => {
  const chat = await getChat();
  const oldHistory = await chat.getHistory();
  try {
    const userName = await getUsersName();
    const conversationType = await classifyConversation();
    let prompt = message;
    if (conversationType === "productive") {
      prompt = `Consider some playful banter in your response. Here's ${userName}'s message: ${message}`;
    } else if (conversationType === "banter") {
      prompt = `Talk more about goals and productivity. Here's ${userName}'s message: ${message}`;
    } else {
      prompt = `Your reply needs to be short. Here's ${userName}'s message: ${message}`;
    }
    console.log("Prompt:", prompt);
    const response = await chat.sendMessage(message);
    // This will prevent trying to run extra queries if .text() throws an error
    const ret = response.response.text();
    updateMemory(message);
    updateXP(message);
    return ret;
  } catch (e) {
    console.log("Error when messaging shelly:", e);
    mainChat = model.startChat({ history: oldHistory });
    return "I'm sorry, I'm not sure what you mean.";
  }
};

const updateMemory = async (message: string): Promise<void> => {
  await updateInterests(message);
  await updateAccomplishments(message);
  await updateGoals(message);
  await updateStruggles(message);
};

const updateInterests = async (message: string): Promise<void> => {
  let interestsList = await getList(INTERESTS_LIST_NAME);
  if (interestsList.length == 0) {
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
  if (accomplishmentsList.length == 0) {
    accomplishmentsList = [];
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
  if (goalsList.length == 0) {
    goalsList = ["be more productive"];
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
  if (strugglesList.length == 0) {
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

const updateXP = async (message: string): Promise<void> => {
  const xp = await getXPFromMessage(message);
  console.log("XP:", xp);
  await increaseXP(xp);
};

const getXPFromMessage = async (message: string): Promise<number> => {
  // Accomplishments are worth 75 XP
  let sum = 0;
  if (await evaluateIfUserAccomplishedSomething(message)) {
    sum += 75;
  }
  // Vulnerability is worth 50 XP
  if (await evaluateIfUserIsVulnerable(message)) {
    sum += 50;
  }
  return sum;
};

const evaluateIfUserAccomplishedSomething = async (message: string): Promise<boolean> => {
  try {
    const prompt =
      `Determine if the user accomplished something, even if it's small, based on this message: "${message}".` +
      `You should output only "true" or "false" and nothing else. This needs to be json parseable.`;
    const response = await model.generateContent(prompt);
    return response.response.text().includes("true");
  } catch (e) {
    console.log("Error evaluating if user accomplished something:", e);
    return false;
  }
};

const evaluateIfUserIsVulnerable = async (message: string): Promise<boolean> => {
  try {
    const prompt =
      `Determine if the user is being open/vulnerable with the audience. Talking about their problems/etc: "${message}".` +
      `You should output only "true" or "false" and nothing else. This needs to be json parseable.`;
    const response = await model.generateContent(prompt);
    return response.response.text().includes("true");
  } catch (e) {
    console.log("Error evaluating if user is vulnerable:", e);
    return false;
  }
};
