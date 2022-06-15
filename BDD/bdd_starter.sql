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



insert into message (ciphertext, senderId, receiverId) values ("blabla",1,2);
select* from message;
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

select * from users
/*Table ZIP*/


