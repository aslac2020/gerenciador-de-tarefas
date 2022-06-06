const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    idUser: {
        type: 'string',
        required: true
    },
    dataEstimatedTask: {
        type: Date,
        required: true
    },
    dataConclusionTask: {
        type: Date,
        required: false
    }
});

const Task = mongoose.model('tarefas', TaskSchema);
module.exports = Task;