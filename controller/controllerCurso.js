/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo D. Prado
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

//arquivo de mensagens padronizadas
const {MESSAGE_ERROR, MESSAGE_SUCCES, MESSAGE_SUCCESS} = require('../modulo/config.js');

//Funcao para gerar um novo curso
const novoCurso = async function(curso){
    //Validacao dos campos obrigatórios
    if(curso.nome == '' || curso.nome == undefined || curso.carga_horaria == ''|| curso.carga_horaria == undefined)
        return{status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    else{
        //import da model de curso
        const novoCurso = require('../model/DAO/curso.js');

        //chama a funcao para inserir um novo curso
        const result = await novoCurso.insertCurso(curso);

        if(result)
            return{status:201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        else
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }
}

//Funcao para atualizar um registro
const atualizarCurso = async function(curso){
    //Validaçao para o ID como campo obrigatório 
    if(curso.id == '' || curso.id == undefined)
        return{status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
    //Validacao campos obrigatórios
    else if(curso.nome == '' || curso.nome == undefined || curso.carga_horaria == ''|| curso.carga_horaria == undefined)
        return{status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    else{
        //import da model de curso
        const atualizarCurso = require('../model/DAO/curso.js');

        //chama a funcao para atualizar um curso
        const result = await atualizarCurso.updateCurso(curso);

        if(result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        else
            return {status:500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

// const excluirCurso = async function(id){
//     //Validaçao para o ID como campo obrigatório 
//     if(curso.id == '' || curso.id == undefined)
//         return{status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}
//     else{
//         //Validacao para verificar se ID existe no DB
//         const curso = await busca

//     }
// }    