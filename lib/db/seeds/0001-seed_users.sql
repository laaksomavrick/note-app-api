-- password is hashed version of 'qweqweqwe'
TRUNCATE TABLE users CASCADE;
INSERT INTO users (email, password)
VALUES
('john.doe@gmail.com','$2a$10$/.2bYV530p90tgdVjDLP6uq/4cLC.qbfdYDQ0GylP2p/IPL39lgKq'),
('jane.doe@gmail.com','$2a$10$/.2bYV530p90tgdVjDLP6uq/4cLC.qbfdYDQ0GylP2p/IPL39lgKq'),
('jim.doe@hotmail.com','$2a$10$/.2bYV530p90tgdVjDLP6uq/4cLC.qbfdYDQ0GylP2p/IPL39lgKq')
;