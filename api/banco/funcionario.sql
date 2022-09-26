CREATE TABLE funcionario
(
    id       serial primary key,
    nome     varchar(60),
    email    text,
    cpf      varchar(11),
    telefone varchar(11),
    dt_entrada DATE NOT NULL,
    dt_saida DATE
);