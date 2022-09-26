INSERT INTO cliente (nome, email, cpf, telefone) VALUES ('Tales Cliente', 'tales.cliente@email.com','12345678910','45900112233');
INSERT INTO fornecedor (nome, email, cnpj, telefone) VALUES ('Tales Fornecedor', 'tales.fornecedor@email.com','00111222000133','45900008888');
INSERT INTO funcionario (nome, email, cpf, telefone, dt_entrada) VALUES ('Tales Funcionario', 'tales.funcionario@email.com','01987654321','45911223344',NOW());
INSERT INTO produto (nome, valor, emEstoque, fornecedor) VALUES ('Banana', '2.45', 15, 1);
INSERT INTO produto (nome, valor, emEstoque, fornecedor) VALUES ('Abacaxi', '6.75', 32, 1);
INSERT INTO pedido (quantidade, id_produto, id_cliente, id_funcionario,estado) VALUES (15, 1, 1, 1, 'ABERTO');
INSERT INTO pedido (quantidade, id_produto, id_cliente, id_funcionario,estado) VALUES (4, 2, 1, 1, 'ABERTO');
INSERT INTO usuario (usuario, senha) VALUES ('Tales','123');
