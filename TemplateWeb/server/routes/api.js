const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Création du diskStorage de multer, il permet de définir notre configuration d'upload
// /!\ Créez les dossiers de destination au cas où avant l'upload
const multer = require('multer')
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bddvigenere","admin","vd}:8Eeq`(q=8`S(", //Veuillez mettre le mot de passe de la base de donnée
{
  dialect: "mysql",
  host: "database-mastercamp.ceb4nhtb3nme.eu-west-2.rds.amazonaws.com",
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
  const token = req.cookies.log
  //const token = authHeader && authHeader.split(' ')[1]
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
  res.cookie('saveMdpDecrypt',0,{
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
          const accessToken = generateAcessToken({email : email,password:this.password,userID :result[0][0].userId})
          console.log('IDDDD: ' + result[0][0].userId) 
          const refreshToken = generateRefreshToken({email : email,password:this.password,userID :result[0][0].userId})
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
  const token = req.cookies.refresh
  console.log('TOKEN REFRESH' + token)
  // const authHeader = req.cookies.refresh
  //const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      //console.log('testttttttttt')
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
          console.log('Crzation')
          const spawner = require('child_process').spawn
          const python_process = spawner('python', ['C:/Users/lefev/Proto_final/generateRSAKeys.py']) // C'est la sauce faut mettre le path global sinon NOOT NOOT
          python_process.stdout.on('data',(data) =>{
            const retrieved = data.toString()
            console.log('Keys created :', retrieved)
            const result_list = retrieved.split(' ')
            const private = result_list[1]
            const public = result_list[0]
            const n = result_list[2]

            sequelize.query(`insert into users(name, email ,password ,admin,city,privatekey,publickey,n) values ('${name}','${email}','${hash}','0','${city}','${private}','${public}','${n}')`).then(function(result) {
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
          })
          python_process.stderr.on('data',(data) =>{
            console.error('ERREUR : ', data.toString())
          })
          
        }
      })
    }
    console.log(hash) 
  })
  
  

})


router.post('/sendMessage',(req,res) => {
  var messageDecrypt= req.body.message
  const date = req.body.date
  const spawner = require('child_process').spawn
  console.log(date)
  token = req.cookies.log
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    if(err){
      console.log('PAS BON')
      return res.sendStatus(401)
    }
    console.log('Idsender : ' + user.userID)
    const userSender = user.userID
    let userReceive = 0
    if(userSender == 1)
      userReceive = 2
    else
      userReceive = 1
    sequelize.query(`select * from users where userId = '${userReceive}'`).then(function(results) {
      sequelize.query(`select * from users where userId = '${userSender}'`).then(function(resultForSender) {
      const data_to_pass_in = {
        data_sent: results[0][0].publickey+'.'+results[0][0].n+'.'+messageDecrypt,
        data_returned: undefined
      };
      const data_to_pass_in2 = {
        data_sent: resultForSender[0][0].publickey+'.'+resultForSender[0][0].n+'.'+messageDecrypt,
        data_returned: undefined
      };
      console.log(data_to_pass_in);
      console.log(data_to_pass_in2)
      const python_process = spawner('python', ['C:/Users/lefev/projetSR-devtemp/TemplateWeb/server/routes/Cypher.py', JSON.stringify(data_to_pass_in)])
      console.log("data is sent");
      python_process.stdout.on('data', (data) => {
        const python_process2 = spawner('python', ['C:/Users/lefev/projetSR-devtemp/TemplateWeb/server/routes/Cypher.py', JSON.stringify(data_to_pass_in2)])
        python_process2.stdout.on('data', (data2) => {
        message = data.toString()
        messageForSender = data2.toString()
        sequelize.query(`insert into message(ciphertext,ciphertextReturn, senderId, receiverId,messageDate) values ('${message}','${messageForSender}','${userSender}','${userReceive}','${date}')`).then(function(result) {
          sequelize.query(`select MAX(messageId) as id from message `).then(function(iDmessage) {
            if(req.body.verifMdpDecrypt==1){
              //On garde le message decrypté
              res.json({message:messageDecrypt,date:date,send:true})
            }
            else{
            //Sinon on envoie la version crypté
            res.json({ message:message,date:date,send:true})
            }
          })
        })
      })
      })
       python_process.stderr.on('data',(data) =>{
          console.error('ERREUR : ', data.toString())
      })
    })
    })
   
  })
})

router.get('/getmessage',(req,res) => {
  var finBoucle=0;
  var ListMessageDecrypt = []
  console.log('yeretetete')
  const token = req.cookies.log
  var id=0;
  //Extrait l'id de l'utilisateur
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    console.log(user.userID)
    id =  user.userID
  })
  const message= req.body.message
  const date = req.body.date
  sequelize.query(`SELECT * from message join users sender on sender.userId = message.senderId join users receiver on receiver.userId = message.receiverId
  where receiver.userId='${id}' UNION SELECT * from message join users sender on sender.userId = message.senderId join users receiver on receiver.userId = message.receiverId
  where sender.userId='${id}';`).then(function(result) {
      //console.log(resultSender)
      //console.log("data :"+dataToPush[0][0])

    if (req.cookies.saveMdpDecrypt && req.cookies.saveMdpDecrypt==1){
      console.log('dans la condition')
      sequelize.query(`select * from users where userId='${id}'`).then(function(results) {
        //console.log(results[0][0].privatekey)
        //console.log('Resultats : '+result[0][0])

        for (let i=0;i<result[0].length;i++){
          let messageToDecrypt=""
        if(result[0][i].senderId==id){
          messageToDecrypt = result[0][i].ciphertextReturn
        }
        else{
          messageToDecrypt = result[0][i].ciphertext
        }
        console.log("Message a decrypter" + messageToDecrypt)
        const data_to_pass_in = {
          data_sent: results[0][0].privatekey+'.'+result[0][0].n+'.'+messageToDecrypt,
          data_returned: undefined
        };
        const spawner = require('child_process').spawn
        const python_process = spawner('python', ['C:/Users/lefev/projetSR-devtemp/TemplateWeb/server/routes/Decypher.py', JSON.stringify(data_to_pass_in)])
        python_process.stdout.on('data', (data2) => {
            console.log(data2.toString())
            var send;
            if (result[0][i].senderId==id)
              send=true
            else 
              send=false
            ListMessageDecrypt.push({message:data2.toString(),date:result[0][i].messageDate,send:send})
            console.log('Liste en cours' + ListMessageDecrypt)
            if (i==result[0].length-1){
              console.log('Liste final' +ListMessageDecrypt)
              res.json({liste : ListMessageDecrypt})
            }
          })
          console.log('yesy')
     //console.log("prevate key = " +result[0][0][0])
      //Decrypter les messages extraits
        //console.log('i : '+i)
      }


    })
    }
    else{
      let listefin= [];
      for (let j=0;j<result[0].length;j++){
        let send;
        let messageToSend;
        if (result[0][j].senderId==id){
          send = true
          messageToSend = result[0][j].ciphertextReturn
        }
        else{
          send = false
          messageToSend = result[0][j].ciphertext
        }
        let objectToAdd = {message:messageToSend,date:result[0][j].messageDate,send:send}
        listefin.push(objectToAdd)
        //if (i=)
      }
      console.log('liste fin = ' + listefin)
     res.json({liste:listefin})
    }

  })
  /*
  sequelize.query(`select * from message`).then(function(result) {
    res.json({liste:result[0]})


  })
  */
})


router.post('/decrypt',(req,res) => {
    console.log('dans la route')
    res.cookie('saveMdpDecrypt',1,{//Mettre le password hashé (remplacer le 1)
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    console.log(req.body.listCrypt)
    //TODO Decrypter les messages
    //Apres avoir obtenu l'output
    let decrypt = "chaine decryptée"
    res.json({listeDescrypt:decrypt})
})


router.get('/verifMdpDecrypt',(req,res) => {
  res.json({cookiemdp:req.cookies.saveMdpDecrypt})
})

router.get('/verifCookieLog',(req,res) => {
  const token = req.cookies.log
  //const token2
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    if(err){
      console.log('PAS BON')
      //return res.sendStatus(401)
      res.json({verif:false})
    }
    else{
      //req.session.userid = user.userid
      console.log('BON')
      res.json({verif:true})
    }
  })
  
})
module.exports = router
