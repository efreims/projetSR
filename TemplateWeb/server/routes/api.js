const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Création du diskStorage de multer, il permet de définir notre configuration d'upload
// /!\ Créez les dossiers de destination au cas où avant l'upload
const multer = require('multer')



const {Sequelize} = require('sequelize');
const { status } = require('express/lib/response');
const res = require('express/lib/response');
const req = require('express/lib/request')

/*
const sequelize = new Sequelize("db_projet","root","Fbq6dwab", //Veuillez mettre le mot de passe de la base de donnée
{
  dialect: "mysql",
  host: "localhost",
  port: 3308 // Changer le port si vous utilisez un autre port que 3306

});

try 
{ 
  sequelize.authenticate();
  console.log('Connected to MySql database!');
}
catch (error)
{
  console.error('Unable to connect', error);
};

*/
router.use((req, res, next) => {

  next();
})

router.get('/',(req,res) => {
  
})

router.post('/', (req,res) => {
  
})


module.exports = router
