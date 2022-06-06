const TaskRepository = require('../TaskRepository');
const Task = require('..//../models/Task');
const StatusTasks = require('../../enum/StatusTasks');

const transformTask = (taskDb) => {
    return {
        id: taskDb._doc._id,
        name: taskDb._doc.name,
        dataEstimatedTask: taskDb._doc.dataEstimatedTask,
        dataConclusionTask: taskDb._doc.dataConclusionTask,
        idUser: taskDb._doc.idUser
    }
}


class MongoDBTasksRepository{
  static registerTasks(dataTask){
    return Task.create(dataTask);
  }

  static editTask(id, dados){
    return Task.findByIdAndUpdate(id, dados);
  }

  static deleteTask(id){
    return Task.findByIdAndDelete(id);
  }

  static async filterByUserPeriodAndStatus({
      periodoDe,
      periodoAte,
      status,
      idUser
  }){
      const query = {
          idUser
      }

      if(periodoDe && periodoDe.trim()){
          const dataPeriodoDe = new Date(periodoDe);
          //aplica filtro >=
          query.dataEstimatedTask = {
              $gte: dataPeriodoDe
          }
      }

      if(periodoAte && periodoAte.trim()){
        const dataPeriodoAte = new Date(periodoAte);
        if(!query.dataEstimatedTask){
            query.dataEstimatedTask = {};
        } 
        //aplica filtro <= dataPeriodoAte
        query.dataEstimatedTask.$lte = dataPeriodoAte;
    }

    if(status && status.trim()){
        const statusInt = parseInt(status);
        if(statusInt === StatusTasks.OPEN){
            query.dataConclusionTask = null;
        } else if (statusInt === StatusTasks.CONCLUSED){
            //filtra a data diferente de null $ne
            query.dataConclusionTask = {
                $ne: null,
            }
        }
    } 
    
    //busca as tarefas no banco e transforma os dados
    const tasks = await Task.find(query);
    if(tasks){
        return tasks.map(t => transformTask(t));
    }

    return [];
}

static async filterTaskById(idTask) {
    const taskDb = await Task.findById(idTask);
    if(taskDb){
        return transformTask(taskDb);
    }

    return null;
  }


}
module.exports = TaskRepository(MongoDBTasksRepository);
