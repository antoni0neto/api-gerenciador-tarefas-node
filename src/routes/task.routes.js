const express = require("express");
const TaskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findById(id);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const task = await TaskModel.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndUpdate(id, req.body);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskModel.findByIdAndDelete(id);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
