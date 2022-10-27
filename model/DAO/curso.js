/*********************************************************************
 * Objetivo: Arquivo resposnsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo D. Prado
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

const insertCurso = async function(curso){
    
    //Import da classe prismaClient, que é responsável pelas interações com o DB
    const {PrismaClient, prisma} = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `insert into tbl_curso(nome,
                                    carga_horaria,
                                    icone,
                                    sigla)
                                    values(
                                        '${curso.nome}',
                                        '${curso.carga_horaria}',
                                        '${curso.sigla}'
                                )`;

                                    
  //Executa o script SQL no Banco de dados
  const result = await prisma.$executeRawUnsafe(sql);

  if(result)
    return true
else
    return false

}

const updateCurso = async function(curso){
    //Import da classe prismaClient, que é responsável pelas interações com o DB
    const {PrismaClient} = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `update tbl_curso set nome            = '${curso.nome}',
                                    carga_horaria   = '${curso.carga_horaria}',
                                    icone           = '${curso.sigla}'
                            where id = '${curso.id}'
                        `;

    //Executa o script sql no banco de dados
    const result = await prisma.$executeRawUnsafe(sql);

    //Verificar se o result foi executado no DB
    if(result)
        return true
    else
        return false

}

const deleteCurso = async function(id){
    //Import da calsse prismaClient
    const{PrismaClient} = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `delete from tbl_curso
                        where id = '${id}'
                    `;

    //Executa o script SQL no Banco de dados
    const result = await prisma.$executeRawUnsafe(sql);

    //Verificar se o script esta sendo corretamente executado no banco de dados
    if(result)
        return true
    else
        return false

}

const selectAllCursos = async function(){
    //Import da classe PrismaClient
    const {PrismaClient} = require ('@prisma/client');

    //Instancia do PrismaClient
    const prisma = new PrismaClient();

    //Criar um objeto do tipo RecordSet(rsCursos) para receber os dados do DB
    //Através do script SQL(select)
    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, carga_horaria, icone from tbl_curso order by id desc`;

    if(rsCursos.lenght > 0)
        return rsCursos;
    else   
        return false
}

const selectByIdCurso = async function(id){
    //Import da classe prismaClient
    const {PrismaClient} = require('@prisma/client');

    //Instancia do PrismaClient
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id,
                                        nome,
                                        carga_horaria,
                                        sigla
                                        from tbl_curso
                                        where id = ${id}`
                                    
    const rsCurso = await prisma.$queryRawUnsafe(sql);

    if(rsCurso > 0)
        return rsCurso;
    else
        return false;
}


module.exports = {
    selectAllCursos,
    insertCurso,
    updateCurso,
    deleteCurso,
    selectByIdCurso
}