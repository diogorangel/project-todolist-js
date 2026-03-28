// References to DOM elements
const cardNameInput = document.getElementById('cardName');
const assigneeInput = document.getElementById('assignee');
const creatorInput = document.getElementById('creator');
const taskDateInput = document.getElementById('taskDate'); 
const descriptionInput = document.getElementById('description');
const addButton = document.getElementById('addButton');
const cardContainer = document.getElementById('cardContainer');

/**
 * Renders tasks from the SQL Database to the DOM.
 * Requirement: Loops (for-each) and Database Integration.
 */
async function renderCards() {
    try {
        // Fetch tasks from the Java Spring Boot API
        const response = await fetch('/api/tasks');
        const tasks = await response.json(); // Data Structure: Array of Objects from SQL

        cardContainer.innerHTML = ''; // Clear current view

        // Requirement: Loop through the result sets to build the UI [cite: 30]
        tasks.forEach((task) => {
            const card = document.createElement('div');
            // Check completion status from SQL
            card.className = `task-card ${task.completed ? 'completed' : ''}`;

            card.innerHTML = `
                <h3>${task.taskName}</h3>
                <p><strong>Due Date:</strong> ${task.dueDate || 'No date set'}</p>
                <p><strong>Assignee:</strong> ${task.assignee || 'Unassigned'}</p>
                <p><strong>Creator:</strong> ${task.creator || 'N/A'}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <button onclick="removeTask(${task.id})" class="delete-btn">Remove Card</button>
            `;

            // Conditional logic for completion status
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON') {
                    toggleComplete(task.id, task.completed);
                }
            });

            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load tasks:", error); // Requirement: Error handling [cite: 29]
    }
}

/**
 * Adds a new task object to the SQL database.
 * Requirement: Variables and Expressions.
 */
async function addTask() {
    const name = cardNameInput.value.trim(); // Immutable constant 
    
    // Requirement: Conditional validation [cite: 28]
    if (name === "") {
        alert("Task name is required!");
        return;
    }

    const newTask = {
        taskName: name, // Updated to match Java Entity field names
        assignee: assigneeInput.value.trim(),
        creator: creatorInput.value.trim(),
        dueDate: taskDateInput.value,
        description: descriptionInput.value.trim(),
        completed: false
    };

    // Requirement: Send data to SQL via POST 
    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
    });

    if (response.ok) {
        clearInputs();
        renderCards(); // Refresh UI from SQL
    }
}

/**
 * Toggles the completion status in the SQL database.
 */
async function toggleComplete(id, currentStatus) {
    const newStatus = !currentStatus;
    await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newStatus })
    });
    renderCards();
}

/**
 * Removes a task from the SQL database with a confirmation prompt.
 * Requirement: Conditionals and Functions[cite: 28, 31, 39].
 */
async function removeTask(id) {
    // Action Plan: Applying a "Small and Simple" confirmation logic 
    const userConfirmed = confirm("Do you really want to delete this task?");

    // Requirement: Conditional logic for deletion [cite: 28]
    if (userConfirmed) {
        try {
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                renderCards(); // Refresh UI from SQL database
            } else {
                alert("Error deleting task.");
            }
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    }
}

/**
 * Clears form fields after submission.
 */
function clearInputs() {
    [cardNameInput, assigneeInput, creatorInput, taskDateInput, descriptionInput].forEach(i => i.value = "");
}

// Initial load from Database
window.onload = renderCards;

// Event Listeners
addButton.addEventListener('click', addTask);