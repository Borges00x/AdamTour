create database adamtur;
use adamtur;

SELECT * FROM cadastro;
SELECT * FROM suporte;
SELECT * FROM passagens;

insert into passagens (data_de_partida, data_de_volta, destino, horario_de_partida, nome_da_empresa, partida, preco) values 
("23/01/2025", "" , "São Paulo, São Paulo", "15:50", "Aguia Azul", "Rio de Janeiro, Rio de Janeiro", "120,00"),
("23/01/2025", "22/02/2025" , "Bahia, Salvador", "13:00", "Cooltijo", "Rio de Janeiro, Rio de Janeiro", "200,00"),
("23/01/2025", "10/01/2025" , "São Paulo, São Paulo", "09:30", "Aguia Azul", "Rio de Janeiro, Rio de Janeiro", "130,00"),
("23/01/2025", "" , "Rio de Janeiro, Rio de Janeiro", "20:00", "Cooltijo", "Bahia, Salvador", "250,00"),
("23/01/2025", "01/03/2025" , "Rio de Janeiro, Rio de Janeiro", "17:00", "Zambucando", "São Paulo, São Paulo", "150,00")