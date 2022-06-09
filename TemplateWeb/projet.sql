drop database if exists db_projet;
CREATE DATABASE db_projet;
use db_projet;

drop table if exists livre;
drop table if exists users;
drop table if exists panier;
drop table if exists panier_item;

create table livre(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100),
    theme enum("","Polar","Histoire","Litterature","Cuisine","Politique","Sport"),
    auteur VARCHAR(50),
    img VARCHAR(50),
    reserved INT NOT NULL,
    qty integer
);
    
create table users(
	id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(50),
    password_hashed VARCHAR(100),
    administrateur tinyint
);

create table panier(
	id_panier INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    createdAt datetime,
    updatedAt datetime,
    foreign key (id_user) references users(id_user)
);

create table panier_item(
	id_panier_item INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_panier INT NOT NULL,
    id_livre INT NOT NULL,
    foreign key (id_panier) references panier(id_panier),
    foreign key (id_livre) references livre(id)
);

create table emprunt(
	id_emprunt INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_livre INT NOT NULL,
    date_emprunt datetime,
    foreign key (id_user) references users(id_user),
    foreign key (id_livre) references livre(id)
);

INSERT INTO livre (nom,theme,auteur,qty,img,reserved) VALUES 
("Les misérables","Litterature","Victor Hugo",5,"./ressources/miserables.png",1),
("A la recherche du temps perdu, tome 1","Litterature","Marcel Proust",5,"./ressources/tempsPerdu.png",0),
("Le livre du cuisinier","Cuisine","Bruno Cardinal",3,"./ressources/cuisine.png",0),
("Mamba mentality, ma façon de jouer","Sport","Kobe Bryant",5,"./ressources/kobe.png",0);

INSERT INTO users(email,password_hashed,administrateur) VALUES ("admin@admin", '$2b$10$8nu85hsDvXxTYNORnxV1ie7vrBLd512PN4D0CFFesrp4BRS9bC8u2', '1');

INSERT INTO panier(id_user,createdAt,updatedAt) VALUES (1,"2022-05-15 00:00:01","2022-05-15 06:28:48");

INSERT INTO panier_item (id_panier,id_livre) VALUES (1,1);

select * from livre;
select * from users;
select * from panier;
select * from panier_item;	
select * from emprunt;