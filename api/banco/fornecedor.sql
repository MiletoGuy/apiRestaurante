CREATE TABLE fornecedor
(
    id          serial primary key,
    nome        varchar(60) NOT NULL,
    email       text NOT NULL UNIQUE,
    cnpj        varchar(14) NOT NULL UNIQUE,
    telefone    varchar(11) NOT NULL
);