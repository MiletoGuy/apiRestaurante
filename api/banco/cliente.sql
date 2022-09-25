CREATE TABLE cliente
(
    id       serial primary key,
    nome     varchar(60),
    email    text,
    cpf      varchar(11),
    telefone varchar(11)
);