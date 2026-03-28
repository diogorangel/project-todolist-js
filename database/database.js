const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// This ensures the DB file is created in the root project folder
const dbPath = path.resolve(__dirname, '../taskmanager.db'); 
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        task_name TEXT, 
        due_date TEXT, 
        description TEXT, 
        assignee_id INTEGER, 
        completed INTEGER DEFAULT 0,
        FOREIGN KEY (assignee_id) REFERENCES users(id))`);
});

// --- ADD YOUR FUNCTIONS HERE ---

// CREATE: Add a new task 
function createTask(name, date, desc, userId) {
    const sql = `INSERT INTO tasks (task_name, due_date, description, assignee_id) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, date, desc, userId], function(err) {
        if (err) return console.error(err.message);
        console.log(`Task added with ID: ${this.lastID}`);
    });
}

// READ: Get tasks using a JOIN
function getTasks() {
    const sql = `SELECT tasks.*, users.username FROM tasks LEFT JOIN users ON tasks.assignee_id = users.id`;
    db.all(sql, [], (err, rows) => {
        if (err) throw err;
        // Loop through the result sets to display them
        console.table(rows); 
    });
}

// UPDATE: Mark task as completed 
function updateStatus(taskId, status) {
    const sql = `UPDATE tasks SET completed = ? WHERE id = ?`;
    db.run(sql, [status, taskId]);
}

// Export functions for use in your main program 
module.exports = db;