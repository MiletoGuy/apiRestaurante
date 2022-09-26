CREATE TABLE fornecedor
(
    id          serial primary key,
    nome        varchar(60),
    email       text,
    cnpj        varchar(14),
    telefone    varchar(11)
);