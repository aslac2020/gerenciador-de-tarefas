module.exports = (implementation) => {
    if (!implementation.cadastrar){
        throw new Error(`A classe ${implementation} não implementou o método cadastrar!`)
    }


    return implementation;
}