import ollama from "ollama";

console.log("Before call");

const response = await ollama.chat({
  model: "qwen2.5:0.5b",
  messages: [
    {
      role: "user",
      content: "Hello"
    }
  ]
});

console.log("After call");
console.log(response.message.content);