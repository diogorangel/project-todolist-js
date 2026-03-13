/**
 * Global state management
 * Requirement: Use a data structure (Array of Objects)
 */
const taskState = []; // Data Structure: Array 

// References to DOM elements
const cardNameInput = document.getElementById('cardName');
const assigneeInput = document.getElementById('assignee');
const creatorInput = document.getElementById('creator');
const taskDateInput = document.getElementById('taskDate'); 
const descriptionInput = document.getElementById('description');
const addButton = document.getElementById('addButton');
const cardContainer = document.getElementById('cardContainer');

/**
 * Renders all cards from the taskState array to the DOM.
 * Requirement: Loops (for-each) and Functions 
 */
function renderCards() {
    cardContainer.innerHTML = ''; // Clear current view

    // Loop through the data structure to build the UI 
    taskState.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'completed' : ''}`;

        card.innerHTML = `
            <h3>${task.name}</h3>
            <p><strong>Due Date:</strong> ${task.date || 'No date set'}</p>
            <p><strong>Assignee:</strong> ${task.assignee}</p>
            <p><strong>Creator:</strong> ${task.creator}</p>
            <p><strong>Description:</strong> ${task.desc}</p>
            <button onclick="removeTask(${index})" class="delete-btn">Remove Card</button>
        `;

        // Conditional logic for completion 
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                toggleComplete(index);
            }
        });

        cardContainer.appendChild(card);
    });
}

/**
 * Adds a new task object to the state array.
 * Requirement: Variables (mutable/immutable) and Expressions 
 */
function addTask() {
    const name = cardNameInput.value.trim(); // Immutable constant 
    
    // Conditional validation 
    if (name === "") {
        alert("Task name is required!");
        return;
    }

    const newTask = {
        name: name,
        assignee: assigneeInput.value.trim(),
        creator: creatorInput.value.trim(),
        date: taskDateInput.value,
        desc: descriptionInput.value.trim(),
        completed: false
    };

    taskState.push(newTask); // Update data structure 
    clearInputs();
    renderCards();
}

/**
 * Toggles the completion status of a task.
 */
function toggleComplete(index) {
    taskState[index].completed = !taskState[index].completed;
    renderCards();
}

/**
 * Removes a task from the state array.
 */
function removeTask(index) {
    taskState.splice(index, 1); // Mutate data structure 
    renderCards();
}

/**
 * Clears form fields after submission.
 */
function clearInputs() {
    [cardNameInput, assigneeInput, creatorInput, taskDateInput, descriptionInput].forEach(i => i.value = "");
}

// Event Listeners
addButton.addEventListener('click', addTask);