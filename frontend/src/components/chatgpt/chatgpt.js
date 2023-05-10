const { Configuration, OpenAIApi } = require("openai");

export default async function chatgpt(msg) {
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  let human=msg
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "This website has the ability to predict five recipes based on the available ingredients provided. Along with the prediction, it also provides information about the recipe, including what it is about, cooking instructions, ingredients, cooking time, as well as its calorie, protein, fat, and carbohydrate value. If no ingredients are provided, the user will be prompted to provide them.It also predicts how to cook food asked by user External links should not be included. For any questions not related to food, the AI model will respond with 'Sorry, as an AI model, I am not trained to answer this question. For any queries related to food, feel free to contact AVP '.\"\n\nHuman: "+human+" AI:",
    temperature: 1,
    max_tokens: 2256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const responseText = response.data.choices[0].text;
  return responseText;
}
