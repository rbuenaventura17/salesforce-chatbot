const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Initial greeting
chatMessages.innerHTML += `
    <div class="message-container assistant-message">
        <div class="message">R-Bot: Welcome! R-Bot, this generative AI-based chatbot, was created by Rose Buenaventura to showcase her skills in adapting AI technology. Built in collaboration with AI, R-Bot can assist you in answering questions related to Salesforce, aiding you in becoming a more proficient Salesforce Administrator.</div> 
    </div>
`;

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const userMessage = userInput.value;

    // Add user's message to the chat
    chatMessages.innerHTML += `
        <div class="message-container user-message">
            <div class="message">${userMessage}</div>
        </div>
    `;

    // Display typing indicator
    chatMessages.innerHTML += `
        <div class="message-container assistant-message">
            <div class="typing-indicator">...</div>
        </div>
    `;

    try {
        // Call the function to send the user's message to ChatGPT API and get the response
        const chatGPTResponse = await getChatGPTResponse(userMessage);

        // Remove typing indicator
        document.querySelector('.typing-indicator').remove();

        // Add ChatGPT's response to the chat
        chatMessages.innerHTML += `
            <div class="message-container assistant-message">
                <div class="message">${chatGPTResponse}</div>
            </div>
        `;

    } catch (error) {
        // Log the error details to the console
        console.error('Error:', error.message);

        // Display an error message in the chat
        chatMessages.innerHTML += `
            <div class="message-container assistant-message">
                <div class="message" style="background-color: #e53935; color: white; text-align: center; border-radius: 8px;">Error: ${error.message}</div>
            </div>
        `;
    }

    // Clear the input field
    userInput.value = '';
}

// Function to send user's message to ChatGPT API and get the response
async function getChatGPTResponse(userMessage) {
    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;

    // Replace 'YOUR_CHATGPT_API_ENDPOINT' with your actual ChatGPT API endpoint
    const endpoint = process.env.CHATGPT_API_ENDPOINT;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-0613',
                messages: [
                    {
                        role: 'system',
                        content: 'User joined the chat.',
                    },
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract the assistant's reply from the API response
        const assistantReply = data.choices[0].message.content;
        return assistantReply;

    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}
