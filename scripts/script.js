// 1. Get references to the HTML elements
const cardNameInput = document.getElementById('cardName');
const assigneeInput = document.getElementById('assignee');
const creatorInput = document.getElementById('creator');
const taskDateInput = document.getElementById('taskDate'); 
const descriptionInput = document.getElementById('description');
const addButton = document.getElementById('addButton');
const cardContainer = document.getElementById('cardContainer');

/**
 * Helper function to create the card element
 * This follows modular programming best practices.
 */
const createCardElement = (data) => {
    const card = document.createElement('div');
    card.className = 'task-card';

    // Build the internal structure using template literals
    card.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Due Date:</strong> ${data.date ? data.date : 'No date set'}</p>
        <p><strong>Assignee:</strong> ${data.assignee}</p>
        <p><strong>Creator:</strong> ${data.creator}</p>
        <p><strong>Description:</strong> ${data.desc}</p>
        <button class="delete-btn">Remove Card</button>
    `;

    // Toggle completed status when the card (not the button) is clicked
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') {
            card.classList.toggle('completed');
        }
    });

    // Add delete functionality to the button
    card.querySelector('.delete-btn').addEventListener('click', () => {
        card.remove();
    });

    return card;
};

/**
 * Main function to handle adding a new task
 * Requirement: Create software to demonstrate what was learned [cite: 6]
 */
const addTask = () => {
    // Capture data from the 5 fields
    const taskData = {
        name: cardNameInput.value.trim(),
        assignee: assigneeInput.value.trim(),
        creator: creatorInput.value.trim(),
        date: taskDateInput.value,
        desc: descriptionInput.value.trim()
    };

    // Validation: Require at least a Task Name
    if (taskData.name === "") {
        alert("Please enter at least a Task Name!");
        return;
    }

    // Create the card and add it to the page
    const newCard = createCardElement(taskData);
    cardContainer.appendChild(newCard);

    // Clear all inputs for the next task
    [cardNameInput, assigneeInput, creatorInput, taskDateInput, descriptionInput].forEach(input => input.value = "");
    
    console.log("Task added successfully."); // Useful for debugging
};

// 2. Add event listener to the add button
addButton.addEventListener('click', addTask);

// 3. Bonus: Allow adding with the Enter key from any field
[cardNameInput, assigneeInput, creatorInput, descriptionInput].forEach(field => {
    field.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});