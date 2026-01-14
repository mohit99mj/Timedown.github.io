// Chatbot Functionality
document.getElementById('chatbot-menu').addEventListener('click', function () {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '' ? 'block' : 'none';
});

document.getElementById('close-chatbot').addEventListener('click', function () {
    document.getElementById('chatbot-container').style.display = 'none';
});

document.getElementById('send-chatbot-message').addEventListener('click', function () {
    const inputField = document.getElementById('chatbot-input');
    const userMessage = inputField.value.trim();

    if (userMessage === '') {
        alert('Please enter a message.');
        return;
    }

    // Display the user's message
    displayMessage('User', userMessage);
    inputField.value = '';

    // Send the message to the backend for AI processing
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
        .then(response => response.json())
        .then(data => {
            // Display AI's response
            displayMessage('AI', data.reply);
        })
        .catch(error => {
            console.error('Error:', error);
            displayMessage('AI', 'Error: Unable to get a response right now.');
        });
});

function displayMessage(sender, message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
