const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This stays secure on the server
});

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: body.message }],
  });

  return {
    statusCode: 200,
    body: JSON.stringify(completion),
  };
};
