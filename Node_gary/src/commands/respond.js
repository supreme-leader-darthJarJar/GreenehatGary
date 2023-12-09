// commands/respond.js
const { handleOpenAIRequest } = require('../needed_openai'); // Adjust the path based on your project structure

module.exports = {
  name: 'respond',
  description: 'Make the bot respond to a prompt',
  execute(message, args) {
    const prompt = args.join(' ');
    
    // Call the function to handle OpenAI API request
    handleOpenAIRequest(prompt)
      .then(response => {
        // Respond to the user with the generated response
        message.reply(response);
      })
      .catch(error => {
        console.error('Error handling OpenAI request:', error);
        message.reply('There was an error handling the OpenAI request!');
      });
  },
};
