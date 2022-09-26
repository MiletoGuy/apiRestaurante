CREATE TABLE pedido
(
    id             serial primary key,
    quantidade     integer NOT NULL,
    id_produto     integer,
    id_cliente     integer,
    id_funcionario integer,
    estado         varchar(20),
    FOREIGN KEY (id_produto) REFERENCES produto (id),
    FOREIGN KEY (id_cliente) REFERENCES cliente (id),
    FOREIGN KEY (id_funcionario) REFERENCES funcionario (id)
);