module.exports = (implementation) => {
    if (!implementation.registerTasks){
        throw new Error(`A classe ${implementation} não implementou o método cadastrar tarefas!`)
    }

    if(!implementation.editTask){
        throw new Error(`A classe ${implementation} não implementou o método editar tarefas!`)
    }

    if(!implementation.deleteTask){
        throw new Error(`A classe ${implementation} não implementou o método deletar uma tarefa!`)
    }

    if(!implementation.filterByUserPeriodAndStatus){
        throw new Error(`A classe ${implementation} não implementou o método filtrar usuario!`)
    }

    if(!implementation.filterTaskById){
        throw new Error(`A classe ${implementation} não implementou o método buscar por id!`)
    }


    return implementation;
}