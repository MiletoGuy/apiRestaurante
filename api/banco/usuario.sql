CREATE TABLE usuario
(
    id      serial primary key,
    usuario text NOT NULL UNIQUE,
    senha   text NOT NULL
);