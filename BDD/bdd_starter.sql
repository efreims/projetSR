/*****************************************************************************
*																			 *
*					PROJET Sécurité et Réseaux                               *
*																			 *
*	Damois Hugo, Duval Arnaud, LEFREVRE Noé, SENGCHANH Dylan				 *
*  	SOK Michael, WERNERT Sébastien					 						 *
*																			 *
*	15/06/2022																 *
*																			 *
******************************************************************************/

DROP DATABASE IF exists bddvigenere;
CREATE DATABASE bddvigenere;

use bddvigenere;

CREATE TABLE users(
    userId INT PRIMARY KEY NOT NULL AUTO_INCREMENT, -- Attention j'ai changé id pour userId !!!
    name TEXT,
    email TEXT,
    password TEXT,
    admin BOOL, -- à quoi sert un admin dans notre appli ??
    city TEXT,
    privatekey TEXT,
    publickey TEXT,
    n TEXT
);

CREATE TABLE message(
	messageId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ciphertext TEXT,
    ciphertextReturn TEXT,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    messageDate TEXT,
    /*messageRead BOOL,*/
	FOREIGN KEY(senderID) REFERENCES users(userID),
	FOREIGN KEY(receiverID) REFERENCES users(userID)
);

INSERT INTO users (name, email, password, admin, city, privatekey, publickey, n) VALUES ('user1', 'user@email.com', 'password', 0, 'Paris','9971186155715648044031895581440077502738072551557674008479729918959642274978206495394176745041733649628549384102419232924972786643620238325705918396429749885999346685926732593726234258935295326629353727358690802980690853969854250432011466393716160039272729479231389457014944236838610484874959992380252903675','1933016700025326525575675728258935059133919947241317115031855412191819616848699692073244346868908592444879866980198855676506830318750444400370342269931871405474689124962577600174094625240093130930939121196845334482079741197049662961437109525904280600154717167182439505787506385568565231472094817254915185107','20646356343673451882295309058756696030478790312464216646183632107445740583327108416612145320091834457939233163664266270979858727082792102978553414388959818694032665089601595721650300652596104242545663581565541762624088623973805506627043141703138753025160525276744090303743496957452482977039760431877500902737');
INSERT INTO users (name, email, password, admin, city, privatekey, publickey, n) VALUES ('admin', 'admin@email.com', 'password', 1, 'Paris','9971186155715648044031895581440077502738072551557674008479729918959642274978206495394176745041733649628549384102419232924972786643620238325705918396429749885999346685926732593726234258935295326629353727358690802980690853969854250432011466393716160039272729479231389457014944236838610484874959992380252903675','1933016700025326525575675728258935059133919947241317115031855412191819616848699692073244346868908592444879866980198855676506830318750444400370342269931871405474689124962577600174094625240093130930939121196845334482079741197049662961437109525904280600154717167182439505787506385568565231472094817254915185107','20646356343673451882295309058756696030478790312464216646183632107445740583327108416612145320091834457939233163664266270979858727082792102978553414388959818694032665089601595721650300652596104242545663581565541762624088623973805506627043141703138753025160525276744090303743496957452482977039760431877500902737');

insert into message (ciphertext, senderId, receiverId) values ("blabla",1,2);

create view ciphertextForReceiver as
SELECT ciphertext, messageDate, receiver.privatekey, sender.publickey, message.receiverId, message.senderId
from message
join users sender on sender.userId = message.senderId
join users receiver on receiver.userId = message.receiverId;

create view ciphertextForSender as
SELECT ciphertextReturn, messageDate, sender.privatekey, sender.publickey, message.receiverId, message.senderId from message
join users sender on sender.userId = message.senderId
join users receiver on receiver.userId = message.receiverId;

select * from ciphertextForReceiver;
select * from ciphertextForSender;
select * from users;
/*Table ZIP*/


