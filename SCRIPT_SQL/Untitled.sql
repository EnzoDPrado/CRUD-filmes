#Permite visualizar todos os databases existentes no BD 
show databases;

#Permite apagar um databse e toda a sua estrutura de tabelas e dados
drop database dbcontatos20222;

#Permite criar um novo database no BD
create database db_lion_school;

#Permite ativar a utilizacao de um database
use db_lion_school;

#Permite visualizar todas as tabelas existem dentro de um database
show tables;

create table tbl_aluno (
id int UNSIGNED not null auto_increment primary key,
nome varchar(80) not null,
foto varchar(100)  not null, 
sexo  varchar(1),
rg varchar(15) not null,
cpf varchar(18) not null,
email varchar(256) not null,
telefone varchar(18),
celular varchar(18),
data_nascimento date not null,
unique index(id)
);

create table tbl_curso (
id int UNSIGNED not null auto_increment primary key,
nome varchar(80) not null,
carga_horaria int not null,
icone varchar(100),
sigla varchar(10),
unique index(id)
);

create table tbl_aluno_curso (
id int UNSIGNED not null auto_increment primary key,
id_aluno int unsigned not null,
id_curso int unsigned not null,
matricula varchar(15) not null,
status_aluno varchar(10) not null, 
#Programação para definir uma chave estrangeira
foreign key(id_aluno)
	references tbl_aluno (id),
foreign key(id_curso)
	references tbl_curso (id),
unique index (id)
);

#Permite visualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

insert into tbl_aluno (nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento)
	values('Pedrovs', 'https://cdn-icons-png.flaticon.com/512/892/892694.png?w=360', 'M', '55.547.715-0', '446.477.978-64','enzodp1501@gmail.com', '21321', '(11)99021-6755', '2006-01-15');

#Permite alterar um valor de um atributo de tabela
	#Obs: sempre devemos especificar qual sera o registro que vai sofrer a alteracao
		#geralmente sempre sera a PK
update tbl_aluno set rg = '55.547.715-0' where id = 1;	


#Permite apagar um registro de uma tabela no BD	
	#Obs sempre devemos especificar qual sera o registro que vai sofrer a exclusao
		#geralmente sempre sera a PK
delete from tbl_aluno where id=1;

drop table tbl_usuario;

select * from tbl_curso;

select id from tbl_aluno order by id desc limit 1;

select  tbl_curso.id as id_curso, tbl_curso.nome as nome_curso,tbl_curso.sigla as sigla_curso,tbl_curso.carga_horaria,
		tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno
        from tbl_aluno 
	inner join tbl_aluno_curso
		on tbl_aluno.id = tbl_aluno_curso.id_aluno
	inner join tbl_curso
		on tbl_curso.id = tbl_aluno_curso.id_curso
	where tbl_aluno.id = 24;
	
    
select cast(tbl_curso.id as float) as id_curso, tbl_curso.nome as nome_curso,tbl_curso.sigla as sigla_curso,tbl_curso.carga_horaria,
                        tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno
                        from tbl_aluno 
                    inner join tbl_aluno_curso
                        on tbl_aluno.id = tbl_aluno_curso.id_aluno
                    inner join tbl_curso
                        on tbl_curso.id = tbl_aluno_curso.id_curso
                    where tbl_aluno.id = ${idAluno};


