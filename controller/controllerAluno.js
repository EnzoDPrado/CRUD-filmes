/*********************************************************************
 * Objetivo: Arquivo resposnsável manipulacao de recebimento, 
 * tratamento e retorno de dados entre a API e a model
 * Autor: Enzo D. Prado
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

//arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js');

//Funcao para gerar um novo aluno
const novoAluno = async function (aluno) {

    //Validacao de campos obrigatórios
    if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    //Validacao para verificar email válido    
    else if (!aluno.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de aluno
        const novoAluno = require('../model/DAO/aluno.js');

        //chama a funcao para inserir um novo aluno
        const result = await novoAluno.insertAluno(aluno);
        
        if (result)
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//Funcao para atualizar um registro
const atualizarAluno = async function (aluno) {

    
    //Validaçao para o ID como campo obrigatório
    if (aluno.id == ''|| aluno.id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatórios
    else if (aluno.nome == '' || aluno.nome == undefined || aluno.foto == '' || aluno.foto == undefined || aluno.rg == '' || aluno.rg == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    //Validacao para verificar email válido    
    else if (!aluno.email.includes('@'))
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de aluno
        const atualizarAluno = require('../model/DAO/aluno.js');

        //chama a funcao para atualizar um aluno
        const result = await atualizarAluno.updateAluno(aluno);
        
        if (result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }


}

//Funcao para excluir um registro
const excluirAluno = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const aluno = await buscarAluno(id);

        //Valida se foi encontrado um registro valido
        if (aluno)
        {
            //import da model de aluno
            const excluirAluno = require('../model/DAO/aluno.js');
            //chama a funcao para atualizar um aluno
            const result = await excluirAluno.deleteAluno(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar todos os registros
const listarAlunos = async function () {
    let dadosAlunosJSON = {};

    const { selectAllAlunos } = require ('../model/DAO/aluno.js');

    const dadosAlunos = await selectAllAlunos();

    if (dadosAlunos)
    {
        //Conversao do tipo de dados BigInt para int (?????????)
        //dadosAlunos.forEach(element => {
          //  element.id = Number(element.id)
        //});
        
        //Criamos uma chave alunos no JSON para retornar o array de alunos
        dadosAlunosJSON.alunos = dadosAlunos;

        return dadosAlunosJSON;
    }
    else
        return false;
}

//Funcao para retornar um registro baseado no ID
const buscarAluno = async function (id) {
    let dadosAlunosJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdAluno } = require ('../model/DAO/aluno.js');

        const dadosAluno = await selectByIdAluno(id);

        if (dadosAluno)
        {
            //Conversao do tipo de dados BigInt para int (?????????)
            //dadosAlunos.forEach(element => {
            //  element.id = Number(element.id)
            //});
            
            //Criamos uma chave alunos no JSON para retornar o array de alunos
            dadosAlunosJSON.aluno = dadosAluno;

            return dadosAlunosJSON;
        }
        else
            return false;
    }
}

module.exports = {
    listarAlunos,
    novoAluno,
    atualizarAluno,
    excluirAluno,
    buscarAluno
}
