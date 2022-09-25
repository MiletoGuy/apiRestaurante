CREATE TABLE produto
(
    id         serial primary key,
    nome       varchar(60),
    valor      numeric,
    emEstoque  integer,
    fornecedor integer
);