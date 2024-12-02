const TaskModel = require("../models/task.model");
const { notFoundError } = require("../errors/mongodb.errors");

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const { id } = this.req.params;
            const task = await TaskModel.findById(id);
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const task = await TaskModel.create(this.req.body);
            this.res.status(201).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const { id } = this.req.params;
            const task = await TaskModel.findByIdAndUpdate(id, this.req.body);
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async delete() {
        try {
            const { id } = this.req.params;
            const task = await TaskModel.findByIdAndDelete(id);
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
