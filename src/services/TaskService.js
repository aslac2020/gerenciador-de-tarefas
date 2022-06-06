const TaskRepository = require("../repositories/impl/MongoDBTasksRepository");

class TaskService {
  constructor(idUser) {
    this.idUser = idUser;
  }

  async listTasks(filter = {}) {
    filter.idUser = this.idUser;
    return TaskRepository.filterByUserPeriodAndStatus(filter);
  }

  async registerTasks(dateTasks) {
    const listErrors = [];
    if (!dateTasks) {
      listErrors.push("Favor enviar os dados para cadastro de tarefas");
    } else {
      if (!dateTasks.name || !dateTasks.name.trim()) {
        listErrors.push("Nome da tarefa é obrigatório");
      } else if (dateTasks.name.length < 4) {
        listErrors.push("Nome da tarefa de pelo menos 4 caracteres");
      }

      if (!dateTasks.dataEstimatedTask || !dateTasks.dataEstimatedTask.trim()) {
        listErrors.push("Data prevista de conclusão é obrigatória");
      }
    }

    const retorno = { errors: null, task: null };

    if (listErrors.length) {
      retorno.errors = listErrors;
    } else {
      const dataEstimatedTask = new Date(dateTasks.dataEstimatedTask);
      //Verifica se tem data de conclusão, se não seta null
      const dataConclusionTask = dateTasks.dataConclusionTask
        ? new Date(dateTasks.dataConclusionTask)
        : null;

      const task = {
        name: dateTasks.name,
        dataEstimatedTask,
        dataConclusionTask,
        idUser: this.idUser,
      };

      retorno.task = await TaskRepository.registerTasks(task);
    }

    return retorno;
  }

  async editTask(id, dateTasks) {
    const listErrors = [];

    if (!id) {
      listErrors.push("ID da tarefa é obrigatório");
    } else {
      const taskBD = await TaskRepository.filterTaskById(id);
      // se a tarefa não existir no banco ou pertencer a outro usuário, informamos que ela não existe
      if (!taskBD || taskBD.idUser !== this.idUser) {
        listErrors.push("Tarefa não foi encontrada");
      }

      if (
        dateTasks.name &&
        dateTasks.name.trim() &&
        dateTasks.name.trim().length < 4
      ) {
        listErrors.push("Nome da tarefa precisa ter pelo menos 4 caracteres");
      }
    }

    const retorno = {
      errors: null,
      tasks: null,
    };

    if (listErrors.length) {
      retorno.errors = listErrors;
    }

    const dadosAtualizar = {};
    if (dateTasks.name && dateTasks.name.trim()) {
      dadosAtualizar.name = dateTasks.name;
    }

    if (dateTasks.dataEstimatedTask && dateTasks.dataEstimatedTask.trim()) {
      dadosAtualizar.dataEstimatedTask = new Date(dateTasks.dataEstimatedTask);
    }

    if (dateTasks.dataConclusionTask && dateTasks.dataConclusionTask.trim()) {
      dadosAtualizar.dataConclusionTask = new Date(
        dateTasks.dataConclusionTask
      );
    }

    const tarefaEditada = await TaskRepository.editTask(id, dadosAtualizar);
    retorno.tasks = tarefaEditada;
    return retorno;
  }

  async deleteTask(id) {
    const listErrors = [];
    if (!id) {
      listErrors.push("ID da tarefa é obrigatório");
    } else {
      const taskBD = await TaskRepository.filterTaskById(id);
      // se a tarefa não existir no banco ou pertencer a outro usuário, informamos que ela não existe
      if (!taskBD || taskBD.idUser !== this.idUser) {
        listErrors.push("Tarefa não foi encontrada");
      }

      const response = { errors: null };
      if (listErrors.length) {
        response.errors = listErrors;
      } else {
        await TaskRepository.deleteTask(id);
      }
      return response;
    }
  }
}

module.exports = TaskService;
