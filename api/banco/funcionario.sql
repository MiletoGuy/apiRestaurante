CREATE TABLE funcionario
(
    id       serial primary key,
    nome     varchar(60) NOT NULL,
    email    text NOT NULL,
    cpf      varchar(11) NOT NULL UNIQUE,
    telefone varchar(11) NOT NULL,
    dt_entrada DATE NOT NULL,
    dt_saida DATE
);