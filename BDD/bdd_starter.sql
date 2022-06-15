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
    messageDate DATE,
    /*messageRead BOOL,*/
	FOREIGN KEY(senderID) REFERENCES users(userID),
	FOREIGN KEY(receiverID) REFERENCES users(userID)
);

INSERT INTO users (name, email, password, admin, city, privatekey, publickey) VALUES ('user1', 'user@email.com', 'password', 0, 'Paris',1, 11);
INSERT INTO users (name, email, password, admin, city, privatekey, publickey) VALUES ('admin', 'admin@email.com', 'password', 1, 'Paris',2, 12);

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


/*Table ZIP*/


