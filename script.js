// 🔁 Use the correct container for chat history
const input = document.getElementById("user-input");
const chatHistory = document.getElementById("chat-history");
const sendButton = document.getElementById("send-button");

// When the "Send" button is clicked
sendButton.addEventListener("click", sendMessage);

function sendMessage() {
  const userText = input.value.trim();

  if (userText === "") return;

  // ✅ Display user's message
  const userMessage = document.createElement("div");
  userMessage.className = "user-msg";
  userMessage.textContent = `👤 You: ${userText}`;
  chatHistory.appendChild(userMessage);

  // ✅ Get and display bot's reply
  const botResponse = getBotResponse(userText);
  const botMessage = document.createElement("div");
  botMessage.className = "bot-msg";
  botMessage.textContent = `🤖 Bot: ${botResponse}`;
  chatHistory.appendChild(botMessage);

  // ✅ Scroll to bottom
  chatHistory.scrollTop = chatHistory.scrollHeight;

  // ✅ Clear the input box
  input.value = "";
}

// 🔍 Match the user's question to the best answer in qaData
function getBotResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  let bestMatch = null;
  let highestMatchScore = 0;

  for (let i = 0; i < qaData.length; i++) {
    const question = qaData[i].question.toLowerCase();
    const score = getSimilarityScore(input, question);

    if (score > highestMatchScore) {
      highestMatchScore = score;
      bestMatch = qaData[i];
    }
  }

  if (highestMatchScore > 0.5) {
    return bestMatch.answer;
  }

  return "Sorry, I don't know the answer to that yet. Try asking a different question.";
}

// 🤝 Calculate similarity between input and stored question
function getSimilarityScore(input, question) {
  const inputWords = input.split(" ");
  const questionWords = question.split(" ");
  let matchCount = 0;

  inputWords.forEach(word => {
    if (questionWords.includes(word)) {
      matchCount++;
    }
  });

  return matchCount / questionWords.length;
}

// 🌓 Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
