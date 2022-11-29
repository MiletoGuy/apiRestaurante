CREATE EXTENSION pgcrypto;
CREATE TABLE cliente
(
    id       serial primary key,
    nome     varchar(60) NOT NULL,
    email    text,
    cpf      varchar(11) UNIQUE,
    telefone varchar(11)
);

CREATE TABLE fornecedor
(
    id          serial primary key,
    nome        varchar(60) NOT NULL,
    email       text NOT NULL UNIQUE,
    cnpj        varchar(14) NOT NULL UNIQUE,
    telefone    varchar(11) NOT NULL
);

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

CREATE TABLE produto
(
    id         serial primary key,
    nome       varchar(60) NOT NULL,
    valor      numeric NOT NULL,
    emEstoque  integer NOT NULL,
    fornecedor integer,
    FOREIGN KEY (fornecedor) REFERENCES fornecedor(id)
);

CREATE TABLE pedido
(
    id             serial primary key,
    quantidade     integer NOT NULL,
    id_produto     integer,
    id_cliente     integer,
    id_funcionario integer,
    estado         varchar(20) NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produto (id),
    FOREIGN KEY (id_cliente) REFERENCES cliente (id),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario (id)
);

CREATE TABLE usuario
(
    id      serial primary key,
    usuario text NOT NULL UNIQUE,
    senha   text NOT NULL
);