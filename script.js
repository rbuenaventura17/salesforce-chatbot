const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Set your OpenAI API key and ChatGPT API endpoint directly (for demonstration purposes)
const apiKey = 'OPENAI_API_KEY';
const endpoint = 'CHATGPT_API_ENDPOINT';

// Initial greeting
chatMessages.innerHTML += `
    <div class="message-container assistant-message">
        <div class="message">R-Bot: Welcome! I'm R-Bot, a generative AI-based chatbot crafted by Rose Buenaventura to showcase the seamless integration of AI technology. Together, we can explore and enhance your Salesforce expertise. Feel free to ask any Salesforce-related questions, and let's embark on a journey to elevate your skills as a Salesforce Administrator!</div>
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
    try {
        const response = await fetch(endpoint + '?model=gpt-3.5-turbo-0613', {
            method: 'GET',  // Use 'GET' method
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
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

        const data = await response.json();

        // Extract the assistant's reply from the API response
        const assistantReply = data.choices[0].message.content;
        return assistantReply;

    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}
