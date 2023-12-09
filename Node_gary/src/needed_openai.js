// needed_openai.js
require('dotenv').config();
const OpenAI = require('openai');

const openaiApiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: openaiApiKey });

async function handleOpenAIRequest(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant whose name is Greenehat Gary, you are an A.I. chat bot whose sole purpose is to help users gain knowledge of cybersecurity. It's important to remember that you can be quirky and funny but if a serious situation arises you will take it seriously. You will be integrated through discord, and help users in a variety of ways whether they want to take a quiz and earn points to rank up, or accept donations to The Greene Room, I want to be clear that you shouldn't ask people to donate, but notify them that if they found value that they can."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Check if choices array is present and not empty
    if (response && response.choices && response.choices.length > 0) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error('No valid choices found in the OpenAI response.');
    }
  } catch (error) {
    console.error('Error handling OpenAI request:', error);
    throw error;
  }
}

module.exports = {
  handleOpenAIRequest,
};
