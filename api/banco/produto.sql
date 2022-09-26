CREATE TABLE produto
(
    id         serial primary key,
    nome       varchar(60) NOT NULL,
    valor      numeric NOT NULL,
    emEstoque  integer NOT NULL,
    fornecedor integer,
    FOREIGN KEY (fornecedor) REFERENCES fornecedor(id)
);