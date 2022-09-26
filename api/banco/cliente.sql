CREATE TABLE cliente
(
    id       serial primary key,
    nome     varchar(60) NOT NULL,
    email    text,
    cpf      varchar(11) UNIQUE,
    telefone varchar(11)
);