function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();

  if (userText === "") return;

  // Show user's message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = userText;
  chatBox.appendChild(userMessage);

  // Get bot response
  const botMessage = document.createElement("div");
  botMessage.className = "message bot";
  botMessage.textContent = getBotResponse(userText);
  chatBox.appendChild(botMessage);

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;

  input.value = "";
}

// Simple Q&A logic (next step: connect to your dataset or AI)
function getBotResponse(userInput) {
  const input = userInput.toLowerCase().trim();

  // Try to find the best match using a basic similarity check
  let bestMatch = null;
  let highestMatchScore = 0;

  for (let i = 0; i < qaData.length; i++) {
    const question = qaData[i].question.toLowerCase();
    let score = getSimilarityScore(input, question);

    if (score > highestMatchScore) {
      highestMatchScore = score;
      bestMatch = qaData[i];
    }
  }

  if (highestMatchScore > 0.5) { // only respond if there's a decent match
    return bestMatch.answer;
  }

  return "Sorry, I don't know the answer to that yet. Try asking a different question.";
}
// Compare similarity between two strings using basic word matching
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

