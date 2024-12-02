const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const task = await TaskModel.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndUpdate(id, req.body);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndDelete(id);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(8000, console.log("Listening on port 8000"));
