
const HttpController = require("./HttpController");
const TaskService = require("../services/TaskService");

class TaskController extends HttpController {
    configureRoutes(baseUrl){
        this.express.get(`${baseUrl}/tasks`, this.listTasks.bind(this));
        this.express.post(`${baseUrl}/tasks`, this.registerTasks.bind(this));
        this.express.put(`${baseUrl}/tasks/:id`, this.editTask.bind(this));
        this.express.delete(`${baseUrl}/tasks/:id`, this.deleteTask.bind(this));
    }

    async registerTasks(req, res) {
        try {
            const taskService = new TaskService(req.user.id);
            const resultService = await taskService.registerTasks(req.body);

            if(resultService.errors){
                return res.status(400).json({
                    status: 400,
                    erro: resultService.errors
                })
            }

            return res.json({
                msg: 'Tarefa cadastrada com sucesso :)'
            });
            
        } catch (e) {
            req.logger.error('Erro ao processar a requisição de cadastro de tarefas', 'erro=' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Não foi possivel cadastrar a tarefa, tente novamente mais tarde'
            })
        }
    }

    async listTasks(req, res){
        try {
            const taskService = new TaskService(req.user.id);
            const listTasks = await taskService.listTasks(req.query);
            res.json(listTasks);
            
        } catch (e) {
            req.logger.error('Erro ao processar a requisição de listagem de tarefas', 'erro=' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Não foi possivel listar as tarefas, tente novamente mais tarde'
            })
        }
    }

    async editTask(req, res){
        try {
            const taskService = new TaskService(req.user.id);
            const returnService = await taskService.editTask(req.params.id, req.body);

            console.log(returnService.errors)
            if(returnService.errors){
                return res.status(400).json({
                    status: 400,
                    erro: returnService.errors
                });
            }

            res.json({
                msg: 'Tarefa atualizada com sucesso'
            });
            
        } catch (e) {
            req.logger.error('Erro ao processar a requisição de editar uma tarefa', 'erro=' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Não foi possivel editar a tarefa, tente novamente mais tarde'
            })
        }

    }

    async deleteTask(req, res) {
        try {
            const service = new TaskService(req.user.id);
            const returnService = await service.deleteTask(req.params.id);
            if(returnService.errors){
                return res.status(400).json({
                    status: 400,
                    erro: returnService.errors
                });
            }

            res.json({
                msg: 'Tarefa removida com sucesso'
            });
           
        } catch (e) {
            req.logger.error('Erro ao processar a requisição de remoção de tarefas', 'erro=' + e.message);
            res.status(500).json({
                status: 500,
                erro: 'Não foi possivel excluir a tarefa, tente novamente mais tarde'
            })
        }
    }
  
}

module.exports = TaskController;