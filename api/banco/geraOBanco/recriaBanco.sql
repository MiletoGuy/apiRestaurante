DROP DATABASE IF EXISTS restaurante;

ALTER SEQUENCE IF EXISTS cliente_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS fornecedor_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS funcionario_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS pedido_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS produto_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS usuario_id_seq RESTART WITH 1;

CREATE DATABASE restaurante;