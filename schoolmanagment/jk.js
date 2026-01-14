// Function to create and start a countdown for each event
function createCountdown(eventName, eventDate) {
    const countdownContainer = document.createElement('div');
    countdownContainer.classList.add('event-container');

    countdownContainer.innerHTML = `
        <h2>${eventName}</h2>
        <div class="countdown">
            <div class="time">
                <span class="days">00</span>
                <p>Days</p>
            </div>
            <div class="time">
                <span class="hours">00</span>
                <p>Hours</p>
            </div>
            <div class="time">
                <span class="minutes">00</span>
                <p>Minutes</p>
            </div>
            <div class="time">
                <span class="seconds">00</span>
                <p>Seconds</p>
            </div>
        </div>
    `;

    document.getElementById('event-list').appendChild(countdownContainer);
    alert(`${eventName} countdown has started!`);

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(eventDate).getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownContainer.querySelector('.days').innerText = days;
        countdownContainer.querySelector('.hours').innerText = hours;
        countdownContainer.querySelector('.minutes').innerText = minutes;
        countdownContainer.querySelector('.seconds').innerText = seconds;

        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownContainer.innerHTML = `<h3>${eventName} has started!</h3>`;
        }
    }, 1000);
}

// Event listener for the form submission to add an event
document.getElementById('event-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (!eventName || !eventDate) {
        alert('Please enter a valid event name and date.');
        return;
    }

    createCountdown(eventName, eventDate);
    document.getElementById('event-form').reset();
});

// Event listener for showing and hiding the background color picker
document.getElementById('background-color-menu').addEventListener('click', function () {
    const colorPicker = document.getElementById('color-picker');
    colorPicker.style.display = colorPicker.style.display === 'none' || colorPicker.style.display === '' ? 'block' : 'none';
});

// Event listener for the background color picker
document.getElementById('background-color').addEventListener('input', function () {
    document.body.style.backgroundColor = this.value;
});

// Event listener to show the chatbot
document.getElementById('chatbot-menu').addEventListener('click', function () {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'flex';
});

// Event listener to close the chatbot
document.getElementById('close-chatbot').addEventListener('click', function () {
    document.getElementById('chatbot').style.display = 'none';
});

// Event listener for sending messages in the chatbot
document.getElementById('send-chatbot-message').addEventListener('click', function () {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (message) {
        const messageContainer = document.getElementById('chatbot-messages');
        const userMessage = document.createElement('p');
        userMessage.textContent = `You: ${message}`;
        messageContainer.appendChild(userMessage);

        // Add a simulated AI response
        const botMessage = document.createElement('p');
        botMessage.textContent = `AI: This is a simulated response to "${message}".`;
        messageContainer.appendChild(botMessage);

        messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to the bottom
        input.value = '';
    }
});
