/*********************************************************************
 * Objetivo: Arquivo responsável pela manipulacao de dados com o BD 
 *      (insert, update, delete e select)
 * Autor: Enzo D. Prado
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 * 
 *********************************************************************/

const insertCurso = async function(curso){

    try{    

        
     //Import da classe prismaClient, que é responsável pelas interacoes com o BD
     const { PrismaClient } = require('@prisma/client');

     //Instancia da classe PrismaClient
     const prisma = new PrismaClient();

    

    let sql = `insert into tbl_curso(nome,
                                    sigla,
                                    carga_horaria,
                                    icone)
                                    values(
                                        '${curso.nome}',
                                        '${curso.sigla}',
                                        '${curso.carga_horaria}',
                                        '${curso.icone}'
                                )`;

                                    
  //Executa o script SQL no Banco de dados
  const result = await prisma.$executeRawUnsafe(sql);

  if(result)
    return true
else
    return false

    }catch(error){
        return false
    }
}

//Funcao para atualizar um registro no BD
const updateCurso = async function (curso) {
    try {

        //Import da classe prismaClient, que é responsável pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client');

        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_curso set nome        = '${curso.nome}',
                                    sigla           = '${curso.sigla}',
                                    carga_horaria   = '${curso.carga_horaria}',
                                    icone           =  '${curso.icone}'

                                    
                            where id = '${curso.id}'
                        `;
       
        
        // Executa o script SQL no Banco de dados 
        //($executeRawUnsafe permite encaminhar uma variavel contendo o script)
        const result = await prisma.$executeRawUnsafe (sql);
        console.log(result)
        //Verifica se o script foi executado com sucesso no BD
        if (result)
            return true;
        else
            return false;

    } catch (error) {
        return false;
    }

}



const deleteCurso = async function(id){

    try{
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

    }catch(error){
        return false
    }
   

}

const selectAllCursos = async function(){

     //Import da classe PrismaClient
    const {PrismaClient} = require ('@prisma/client');

    //Instancia do PrismaClient
    const prisma = new PrismaClient();

    //Criar um objeto do tipo RecordSet(rsCursos) para receber os dados do DB
    //Através do script SQL(select)
    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, sigla, carga_horaria, icone from tbl_curso order by id desc`;
    
    if(rsCursos.length > 0) {
        return rsCursos;
    }
    else   {
        console.log(`asdasdasdasd`);
        return false
    }
        

    
    
}

const selectByIdCurso = async function(id){
        //Import da classe prismaClient
    const {PrismaClient} = require('@prisma/client');

    //Instancia do PrismaClient
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id,
                                        nome,
                                        sigla,
                                        carga_horaria,
                                        icone
                                        from tbl_curso
                                        where id = ${id}`
                                    
    const rsCurso = await prisma.$queryRawUnsafe(sql);
    

    if(rsCurso.length > 0)
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