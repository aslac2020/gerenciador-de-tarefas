module.exports = (implementation) => {
    if (!implementation.register){
        throw new Error(`A classe ${implementation} não implementou o método cadastrar!`)
    }

    if(!implementation.filterUser){
        throw new Error(`A classe ${implementation} não implementou o método filtrar!`)
    }


    return implementation;
}