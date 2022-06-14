const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Création du diskStorage de multer, il permet de définir notre configuration d'upload
// /!\ Créez les dossiers de destination au cas où avant l'upload
const multer = require('multer')
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bddvigenere","root","Hoopiangel61", //Veuillez mettre le mot de passe de la base de donnée
{
  dialect: "mysql",
  host: "localhost",
  port: 3306 // Changer le port si vous utilisez un autre port que 3306

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
//Permet de générer les token pour le JWT
require('dotenv').config(); //Récupère les token dans le fichier caché .env
function generateAcessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7200s'})
}

function generateRefreshToken(user){
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1y'})
}
//Pour vérifier que la personne est connectée
function autoToken(req,res, next){
  const authHeader = req.headers['authorization']
  console.log('auth2' + authHeader)
  const token = authHeader && authHeader.split(' ')[1]
  console.log('token' + token)
  console.log(token)
  if(!token){
    return res.sendStatus(401)
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    if(err){
      console.log('PAS BON')
      return res.sendStatus(401)
    }
    //req.session.userid = user.userid
    console.log('BON')
    req.user = user
    next()
  })
}

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

//Route qui est lancé à chaque chargement de page (mounted dans vue-application) pour vérifier 

router.use((req, res, next) => {

  next();
})

router.get('/verif', autoToken, (req,res) => {
  //console.log(req.cookies)
  //console.log('res : ' + res)
  console.log("verif...")
  //console.log(req.status)
  if(req.user)
    res.send({status:true, user : req.user,refresh : req.cookies.refresh,acces: req.cookies.log})
  else 
    res.send({status : false})})

router.get('/deco',(req,res) => {
  res.cookie('log','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.cookie('refresh','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.send({message : 'deco réussi'})
})



router.get('/deco',(req,res) => {
  res.cookie('log','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.cookie('refresh','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.send({message : 'deco réussi'})
})

router.post('/login', (req,res) => {
  const email = req.body.email
  const password = req.body.password
  sequelize.query(`SELECT * FROM users WHERE email = '${email}'`)
  .then(result => {
    if (result[0].length === 0) 
    {
      res.json({
        status: false,
        message: 'User not found'
      })
    } 
    else 
    {
      bcrypt.compare(password,result[0][0].password, function(err,result2) {
        if (result2){
          const accessToken = generateAcessToken({email : email,password:this.password})
        const refreshToken = generateRefreshToken({email : email,password:this.password})
    res.cookie('log',accessToken,{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.cookie('refresh',refreshToken,{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.json({message:"connected",status:true,access : accessToken,refresh : refreshToken})
  
        }
        else{
          res.json({
            status: false,
            message: 'Wrong password'
          })
        }
      })
    }
  })

})

router.post('/refreshToken', (req, res) => {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      //req.cookies.log
      res.sendStatus(404)
    }

    // TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAcessToken(user);
    res.cookie('log',refreshedToken,{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.send({
      accessToken: refreshedToken,
    });
  });
});

router.get('/refreshToken', (req, res) => {
  const refreshedToken = req.cookies.refresh
  res.json({refresh : refreshedToken})
});

router.post('/retourLogin', (req,res) => {
  res.cookie('retour','true',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.send({message:"retour"})
})

router.get('/retourLogin', (req,res) => {
  if (req.cookies.retour && req.cookies.retour=='true'){
    res.cookie('retour','',{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.cookie('log','',{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.cookie('refresh','',{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.send({status:true})
  }
  else{
    res.send({status:false})
  }
})

router.post('/sign', (req,res) => {
  const email = req.body.email
  const password = req.body.password
  const city = req.body.city
  const name = req.body.name
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
        status: false
      })
    }
    else {
      sequelize.query(`select * from users where email = '${email}'`).then(function(result) {
        if (result[0].length > 0) {
          return res.status(200).json({
            error: "L'adresse mail est déjà utilisée",
            status: false
          })
        } 
        else {
          const spawner = require('child_process').spawn
          const python_process = spawner('python', ['./generateKeys.py'])
          python_process.stdout.on('data',(data) =>{
            console.log('ANKULAY')
            console.log('Keys created :', JSON.parse(data.toString()))
          })
          python_process.stderr.on('data',(data) =>{
            console.error('ERREUR : ', data.toString())
          })
          sequelize.query(`insert into users(name, email ,password ,admin,city) values ('${name}','${email}','${hash}','0','${city}')`).then(function(result) {
          const accessToken = generateAcessToken({email : email,password:this.password})
          const refreshToken = generateRefreshToken({email : email,password:this.password})
          

          res.cookie('log',accessToken,{
            httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
            secure: true, //Uniquement sur https
          })
          res.cookie('refresh',refreshToken,{
               httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
               secure: true, //Uniquement sur https
          })
         res.json({message:"connected",status:true,access : accessToken,refresh : refreshToken})
  
          })
        }
      })
    }
    console.log(hash) 
  })
  
  

})

module.exports = router
