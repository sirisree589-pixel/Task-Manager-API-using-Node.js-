const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Task Manager API is running 🚀");
});

// In-memory storage
let tasks = [];
let id = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// CREATE task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const newTask = {
    id: id++,
    title,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask);
});

// TEST POST route (optional)
app.post("/test", (req, res) => {
  res.send("POST working ✅");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});