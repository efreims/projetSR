const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var url = require("url");
// Création du diskStorage de multer, il permet de définir notre configuration d'upload
// /!\ Créez les dossiers de destination au cas où avant l'upload
const multer = require('multer')
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("bddvigenere","admin","vd}:8Eeq`(q=8`S(", //Veuillez mettre le mot de passe de la base de donnée admin vd}:8Eeq`(q=8`S(
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

function generateRSAToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1y'})
}

function generateRefreshToken(user){
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1y'})
}

function generateTempToken(user){
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1y'})
}
//Pour vérifier que la personne est connectée



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
function resolveAfter2Seconds(id,amiId) {
  return new Promise(resolve => {
    sequelize.query(`SELECT * from message join users sender on sender.userId = message.senderId join users receiver on receiver.userId = message.receiverId
  where receiver.userId='${id}' and sender.userId='${amiId}' UNION SELECT * from message join users sender on sender.userId = message.senderId join users receiver on receiver.userId = message.receiverId
  where sender.userId='${id}' and receiver.userId='${amiId}';`).then(function(result) {
      //console.log(resultSender)
      //console.log("data :"+dataToPush[0][0])
     
          resolve(result)
        })
        
  });
}

function send(message,messageForSender,userSender,userReceive,date) {
  return new Promise(resolve => {
    sequelize.query(`insert into message(ciphertext,ciphertextReturn, senderId, receiverId,messageDate) values ('${message}','${messageForSender}','${userSender}','${userReceive}','${date}')`).then(function(result) {
      sequelize.query(`select MAX(messageId) as id from message `).then(function(iDmessage) {
       })
       resolve(result)
     })
        
  });
}
router.get('/verifAccess', (req,res) => {
  //console.log(req.cookies)
  //console.log('res : ' + res)
  //console.log(req.status)
  const token = req.cookies.log
  //const token = authHeader && authHeader.split(' ')[1]
  if (token){
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
   if(err){
    console.log('erreur')
    res.send({status : false})
    console.log('dans2')
   }
    else{
      console.log('BON')
    res.send({status:true, user : req.user,refresh : req.cookies.refresh,acces: req.cookies.log})
    }

  })
}
else{
  console.log('non')
  res.send({status : false})
    console.log('dans2')
}

  
  
  })

router.get('/deco',(req,res) => {
  res.cookie('log','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.clearCookie('log')
  res.cookie('refresh','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.clearCookie('refresh')
  res.cookie('saveMdpDecrypt',0,{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.clearCookie('saveMdpDecrypt')
  res.cookie('Conv',-1,{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.clearCookie('Conv')
  res.cookie('rsakey','',{
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.clearCookie('rsakey')
  res.send({message : 'deco réussi'})
})




router.post('/login', (req,res) => {
  const email = req.body.email
  const password = req.body.password
  let status = req.body.status
  sequelize.query(`SELECT * FROM users WHERE email = '${email}'`)
  .then(result => {
    if (result[0].length === 0) 
    {
      res.json({
        status: false,
        message: 'Adresse mail ou mot de passe incorrect'
      })
    } 
    else 
    {
      bcrypt.compare(password,result[0][0].password, function(err,result2) {
        if (result2){
          console.log('IDDDDDDDD : ' + result[0][0].userId)
         
          res.json({status:true,password:password,userID : result[0][0].userId,email:email,name:result[0][0].name})
  
        }
        else{
          
          res.json({
            status: false,
            message: 'Adresse mail ou mot de passe incorrect'
          })
        }
      })
    }
  })

})

router.post('/login2fa', (req,res) => {
  const code = req.body.code
  const password = req.body.password
  const email = req.body.email
  const userID = req.body.userID
  const name = req.body.name
  sequelize.query(`select privatekey2fa as pv, ivauth as iv from users where userId = '${userID}'`).then(function(result) {
    let privatekey = result[0][0].pv
    const iv = result[0][0].iv
    const data_to_decrypt = {
      data_sent: privatekey+'µ'+iv+'µ'+password,
      data_returned: undefined
    };
    const instance = require('child_process').spawn
    const python_proc = instance('python', ['./server/routes/AES_decrypt.py', JSON.stringify(data_to_decrypt)])
    python_proc.stdout.on('data', (data) => { 
    let privatekey2= data.toString()
    privatekey2 = privatekey2.replace(/\r/g,'')
    privatekey2 = privatekey2.replace(/\n/g,'')
    console.log('CLE DECRYPTE : ' + privatekey2)
    console.log('code : ' + code)
    const data_to_pass_in = {
      data_sent: privatekey2+'µ'+code
    };
    const spawner = require('child_process').spawn
    const python_process = spawner('python', ['./server/routes/auth.py', JSON.stringify(data_to_pass_in)])
    python_process.stdout.on('data', (data) => {
    let boolean = data.toString()
    var index = boolean.indexOf("T");  
      
      if (index!=-1){
        console.log('YESSSSSS')
        console.log('name api = '+ name)
        const accessToken = generateAcessToken({email : email,password:password,userID :userID,name:name})
          const refreshToken = generateRefreshToken({email : email,password:password,userID :userID})
          res.cookie('log',accessToken,{
            httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
            secure: true, //Uniquement sur https
          })
          res.cookie('refresh',refreshToken,{
            httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
            secure: true, //Uniquement sur https
          })
          res.cookie('Conv',-1,{
            httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
            secure: true, //Uniquement sur https
          })

        res.json({status:true,id : userID})
      }else{
        res.json({status:false})
      }
    
    })
    python_process.stderr.on('data',(data) =>{
      console.error('ERREUR : ', data.toString())
    })
    //
  })
  python_proc.stderr.on('data',(data) =>{
    console.error('ERREUR : ', data.toString())
  })
  })
//Verif 2FA
/*
  
    res.json({message:"connected",status:true,access : accessToken,refresh : refreshToken,id:result[0][0].userId})
*/
})

router.post('/refreshToken', (req, res) => {
  let token=null;
  if(req.cookies.refresh)
    token = req.cookies.refresh
  console.log('token : '+token)
  // const authHeader = req.cookies.refresh
  //const token = authHeader && authHeader.split(' ')[1]

  if (token == null) 
    res.json({status:false})
  else
  {
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      //console.log('testttttttttt')
      //req.cookies.log
      res.json({status:false})
    }

    // TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAcessToken(user);
    res.cookie('log',refreshedToken,{
      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
      secure: true, //Uniquement sur https
    })
    res.json({
      status: true,
    });
  });
}
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
  var id = 0;
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
          const python_process = spawner('python', ['./server/routes/generateRSAkeys.py'])
          python_process.stdout.on('data',(data) =>{
            const retrieved = data.toString()
            const result_list = retrieved.split(' ')
            let private = result_list[1]
            console.log('clée privée : ' + private)
            const public = result_list[0]
            console.log('clée publique : ' + public)
            const n = result_list[2]
            console.log('phi : ' + result_list[3])

            const data_to_pass_in = {
              data_sent: password+'µ'+private,
              data_returned: undefined
            };

            const instance = require('child_process').spawn
            const process_python = instance('python', ['./server/routes/AES_crypt.py', JSON.stringify(data_to_pass_in)])
            process_python.stdout.on('data',(data2) =>{
              const result = data2.toString()
              console.log('Fin Python')
              const list = result.split('>')
              rsaKey = list[1]
              iv = list[0]
              console.log('renvoyé par python :',result.toString())
              const instance = require('child_process').spawn
              const process_python2 = instance('python', ['./server/routes/genauth.py'])
              process_python2.stdout.on('data',(cleauth) =>{
                console.log('VRAI CLE : '+cleauth)
                const data_to_pass_in2 = {
                  data_sent: password+'µ'+cleauth,
                  data_returned: undefined
                };
                cleauth = cleauth.toString()
                const process_python3 = instance('python', ['./server/routes/AES_crypt.py', JSON.stringify(data_to_pass_in2)])
                process_python3.stdout.on('data',(cleauth_crypt) =>{
                  const result = cleauth_crypt.toString()
                  console.log('Fin Python')
                  const list = result.split('>')
                  const keycrypt = list[1]
                  const ivauth = list[0]
                  console.log('keyauth:'+keycrypt)
                  console.log('ivatuth:'+ivauth)
                  sequelize.query(`insert into users(name, email ,password ,admin,city,iv,privatekey,publickey,n,privatekey2fa,ivauth) values ('${name}','${email}','${hash}','0','${city}',"${iv}","${rsaKey}",'${public}','${n}','${keycrypt}','${ivauth}')`).then(function(result) {
                    console.log('Resultats : ' + result[0])
                    const accessToken = generateAcessToken({email : email,password:password,userID : result[0]})
                    const refreshToken = generateRefreshToken({email : email,password:password})
                    
        
                    res.cookie('log',accessToken,{
                      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
                      secure: true, //Uniquement sur https
                    })
                    res.cookie('refresh',refreshToken,{
                      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
                      secure: true, //Uniquement sur https
                    })
                    res.cookie('Conv',-1,{
                      httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
                      secure: true, //Uniquement sur https
                    })
                    res.json({message:"connected",status:true,access : accessToken,refresh : refreshToken, id :result[0].id,code:cleauth})
          
                  })

                  //
                })
              })
              process_python2.stderr.on('data',(data) =>{
                console.error('ERREUR : ', data.toString())
              })
            })
          })
          python_process.stderr.on('data',(data) =>{
            console.error('ERREUR : ', data.toString())
          })
          
        }
      })
    }
  })
  
  

})




router.post('/sendMessage',async(req,res) => {
  var id;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    id =  user.userID
  })
  var messageDecryptstart= req.body.message
  const date = req.body.date
  const spawner = require('child_process').spawn
  token = req.cookies.log
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    if(err){
      return res.sendStatus(401)
    }
    const userSender = id
    let userReceive = req.cookies.Conv
    // if(userSender == 1)
    //   userReceive = 2
    // else
    //   userReceive = 1

    sequelize.query(`select * from users where userId = '${userReceive}'`).then(function(results) {
      sequelize.query(`select * from users where userId = '${userSender}'`).then(function(resultForSender) {
        const data_to_pass = {
          data_sent: messageDecryptstart,
          data_returned: undefined
        };
        const python_process_trad = spawner('python', ['./server/routes/TraductionCrypt.py', JSON.stringify(data_to_pass)])
        python_process_trad.stdout.on('data', async(datatemp) => {
          datatemp = datatemp.toString()
          datatemp = datatemp.replace('[','')
          datatemp = datatemp.replace(/'/g,'')
          datatemp = datatemp.replace(']','')
          datatemp = datatemp.replace('\r','')
          datatemp = datatemp.replace('\n','')
        let messageDecrypt = datatemp
        console.log(messageDecrypt)
        const data_to_pass_in = {
        data_sent: results[0][0].publickey+'µ'+results[0][0].n+'µ'+messageDecrypt,
        data_returned: undefined
      };
      const data_to_pass_in2 = {
        data_sent: resultForSender[0][0].publickey+'µ'+resultForSender[0][0].n+'µ'+messageDecrypt,
        data_returned: undefined
      };
      console.log('pute : ' +messageDecrypt)
      const python_process = spawner('python', ['./server/routes/Cypher.py', JSON.stringify(data_to_pass_in)])
      python_process.stdout.on('data', async(data) => {
        const python_process2 = spawner('python', ['./server/routes/Cypher.py', JSON.stringify(data_to_pass_in2)])
        python_process2.stdout.on('data', async(data2) => {
        message = data.toString()
        messageForSender = data2.toString()
        console.log("GOOD")
        var temp = await send(message,messageForSender,userSender,userReceive,date)
        if(req.body.verifmdp==true){
          //On garde le message decrypté
          res.json({message:messageDecryptstart,date:date,send:true})
        }
        else{
        //Sinon on envoie la version crypté
        res.json({ message:messageForSender,date:date,send:true})
        }
      

        
      })
      })
       python_process.stderr.on('data',(data) =>{
          console.error('ERREUR : ', data.toString())
      })
        })
        python_process_trad.stderr.on('data',(data) =>{
          console.error('ERREUR : ', data.toString())
      })
    })
    })
   
  })
})


router.post('/getmessage',async(req,res) => {
  var amiId = req.body.id
  var ListMessageDecrypt = []
  const token = req.cookies.log
  const rsakeys = req.cookies.rsakey
  var id=0;
  
  var test;
  var password;
  var privatekey;
  var iv;
  //Extrait l'id de l'utilisateur
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    id =  user.userID
    password = user.password
  })
  const message= req.body.message
  const date = req.body.date
  var result = await resolveAfter2Seconds(id,amiId)
        if (req.body.verifmdp==true){
          sequelize.query(`select * from users where userId='${id}'`).then(function(results) {
            jwt.verify(rsakeys,process.env.ACCESS_TOKEN_SECRET, (err,keys) =>{//Décrypt le token
              //req.session.userid = user.userid
              privatekey = keys.privatekey
            })
            privatekey = privatekey.replace('\r','')
            privatekey = privatekey.replace('\n','')
            results[0][0].n = results[0][0].n.replace('\r','')
            results[0][0].n = results[0][0].n.replace('\n','')
            
          
            //console.log('non local variable = ' + test)
            if (result[0].length==0){
              res.json({liste:result[0]})
            }
            for (let i=0;i<result[0].length;i++){
              let messageToDecrypt=""
            if(result[0][i].senderId==id){
              messageToDecrypt = result[0][i].ciphertextReturn
            }
            else{
              messageToDecrypt = result[0][i].ciphertext
            }
        
          
            messageToDecrypt = messageToDecrypt.replace('\r','')
            messageToDecrypt = messageToDecrypt.replace('\n','')
            
              const data_to_pass_in = {
                data_sent: privatekey+'µ'+results[0][0].n+'µ'+messageToDecrypt,
                data_returned: undefined
              };
              console.log(data_to_pass_in)
        
              //console.log('data passed : ' + data_to_pass_in.data_sent)
              const spawner = require('child_process').spawn
              const python_process = spawner('python', ['./server/routes/Decypher.py', JSON.stringify(data_to_pass_in)])
              python_process.stdout.on('data', (data2) => {
                console.log('testteeeeee'+data2.toString())
                //data2 = data2.toString
                let vv = data2.toString()
                vv = vv.replace('[','')
                vv = vv.replace(/'/g,'')
                vv = vv.replace(']','')
                console.log('huuuu : ' + vv)
                const python_process5 = spawner('python', ['./server/routes/TraductionDecrypt.py', JSON.stringify(vv)])
                python_process5.stdout.on('data', (data3) => {
                  console.log(data3.toString())
                  var send;
                  if (result[0][i].senderId==id)
                    send=true
                  else 
                    send=false
                  ListMessageDecrypt.push({idMessage:result[0][i].messageId,message:data3.toString(),date:result[0][i].messageDate,send:send,name:result[0][i].name})
                if(ListMessageDecrypt.length==result[0].length){
                    ListMessageDecrypt.sort((a, b) => a.idMessage - b.idMessage);
                    res.json({liste:ListMessageDecrypt})
                }
              })
              python_process5.stderr.on('data',(data) =>{
                console.error('ERREUR : ', data.toString())
              })
            })
              python_process.stderr.on('data',(data) =>{
                console.error('ERREUR : ', data.toString())
              })
                  //console.log('Liste final' +ListMessageDecrypt)
                  //ListMessageDecrypt.sort((a, b) => b.idMessage - a.idMessage);
                  //console.log('Liste final' +ListMessageDecrypt)
                //completed();
                /*
                function completed(){
                  console.log('i:'+i+'taille tab : ' + result[0].length)
                  console.log('longeur tab' + ListMessageDecrypt.length)
                  if (ListMessageDecrypt.length!=result[0].length-1){
                    console.log('TEST1111111111')
                    return;
                  }
                  else {
                    console.log('finittttttttttttttttt')
                    console.log('tab : ' + ListMessageDecrypt)
                    res.json({liste:ListMessageDecrypt})
                  }
        
        
                }
                */
              
              
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
                let objectToAdd = {message:messageToSend,date:result[0][j].messageDate,send:send,name:result[0][j].name}
                listefin.push(objectToAdd)
                //if (i=)
              }
             res.json({liste:listefin})
            }
})

  /*
  sequelize.query(`select * from message`).then(function(result) {
    res.json({liste:result[0]})


  })
  */




router.get('/verifMdpDecrypt',(req,res) => {
  var token = req.cookies.rsakey;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    if(err){
      //return res.sendStatus(401)
      res.json({verif:false})
    }
    else{
      //req.session.userid = user.userid
      res.json({verif:true})
    }
  })
})

router.get('/verifCookieLog',(req,res) => {
  const token = req.cookies.log
  //const token2
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    if(err){
      //return res.sendStatus(401)
      res.json({verif:false})
    }
    else{
      //req.session.userid = user.userid
      res.json({verif:true})
    }
  })
  
})

router.post('/getusers', (req,res) => {
  var id=req.body.id
  token = req.cookies.log
  sequelize.query(`select users.userId, users.name, users.email, ami.relationId from users left join ami on ami.senderId='${id}' and ami.receiverId=users.userId or ami.receiverId='${id}' and ami.senderId= users.userID where users.userID!='${id}'`).then(function(result) {
    res.json({liste:result[0]})
  })
})

router.get('/getusers', (req,res) => {
  var id=0
  token = req.cookies.log
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    id =  user.userID
  })
  sequelize.query(`select users.userId, users.name, users.email, ami.relationId from users left join ami on ami.senderId='${id}' and ami.receiverId=users.userId or ami.receiverId='${id}' and ami.senderId= users.userID where users.userID!='${id}'`).then(function(result) {
    res.json({liste:result[0]})
  })
})

router.post('/ajoutami', (req,res) => {
  token = req.cookies.log
  var idSender = 0
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    idSender =  user.userID
  })
  var idReceiver = req.body.id
  sequelize.query(`insert into ami(senderId, receiverId, etat) values ('${idSender}','${idReceiver}','false')`).then(function(result) {


  })

})

router.post('/notifami', (req,res) => {
  var userID = req.body.id
  sequelize.query(`select users.name, ami.relationId from ami join users on ami.senderId=users.userId where receiverId='${userID}' and etat='false'`).then(function(result) {
    res.json({listnotif : result[0]})
  })
})


router.get('/notifami', (req,res) => {
  const token = req.cookies.log
  var userID;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    userID =  user.userID
  })
  sequelize.query(`select users.name, ami.relationId from ami join users on ami.senderId=users.userId where receiverId='${userID}' and etat='false'`).then(function(result) {
    res.json({listnotif : result[0]})
  })
})

router.post('/acceptAmi', (req,res) => {
  var id = req.body.relationId
  var userID;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    userID =  user.userID
  })
  sequelize.query(`UPDATE ami SET etat=true where relationId=${id}`).then(function(result) {

  })
  sequelize.query(`select users.name as name, ami.receiverId as amiId from ami join users on users.userId=ami.receiverId where senderId=${userID} and etat=true UNION select users.name as name, ami.senderId as amiId from ami join users on users.userId=ami.senderId where receiverId=${userID} and etat=true`).then(function(results) {
    res.json({list : results[0]})
  })
})

router.post('/ami', (req,res) => {
  var userID = req.body.id
  sequelize.query(`select users.name as name, ami.receiverId as amiId from ami join users on users.userId=ami.receiverId where senderId=${userID} and etat=true UNION select users.name as name, ami.senderId as amiId from ami join users on users.userId=ami.senderId where receiverId=${userID} and etat=true`).then(function(result) {
    res.json({list : result[0]})
  })
})

router.get('/ami', (req,res) => {
  const token = req.cookies.log
  var userID;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    userID =  user.userID
  })
  sequelize.query(`select users.name as name, ami.receiverId as amiId from ami join users on users.userId=ami.receiverId where senderId=${userID} and etat=true UNION select users.name as name, ami.senderId as amiId from ami join users on users.userId=ami.senderId where receiverId=${userID} and etat=true`).then(function(result) {
    res.json({list : result[0]})
  })
})

router.post('/changeCookieConv', (req,res) => {
  var idAmi = req.body.id
  res.cookie('Conv',idAmi.id,{//Mettre le password hashé (remplacer le 1)
    httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
    secure: true, //Uniquement sur https
  })
  res.json({message:"Cookie changé"})
})

router.get('/getCookieConv', (req,res) => {
  res.json({id : req.cookies.Conv})
})

router.get('/decryptRSAprivate' ,(req,res) => {
  var id;
  token = req.cookies.log;
  var password;
  var privatekey;
  var iv;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    id =  user.userID
    password = user.password
  })
  sequelize.query(`select * from users where userId='${id}'`).then(function(results) {
    privatekey = results[0][0].privatekey
    iv = results[0][0].iv
    const data_to_pass_in2 = {
      data_sent: privatekey+'µ'+iv+'µ'+password,
      data_returned: undefined
    };
    const instance = require('child_process').spawn
    const python_proc = instance('python', ['./server/routes/AES_decrypt.py', JSON.stringify(data_to_pass_in2)])
    python_proc.stdout.on('data', (data) => { 
      privatekey = data.toString()
      const privateDecypher = generateRSAToken({privatekey : privatekey})
      res.cookie('rsakey',privateDecypher,{
        httpOnly: true, // Interdit l'utilisation du cookie côté client => impossible de le récupérer donc protégé des failles xss
        secure: true, //Uniquement sur https
      })
      res.json({message:"finit"})
      
    })
    python_proc.stderr.on('data',(data) =>{
      console.error('ERREUR : ', data.toString())
    })
  })
})

router.post('/passwordverif', (req,res) => {
  token = req.cookies.log;
  var id;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    id =  user.userID
  })
  const password = req.body.password
  sequelize.query(`select password from users where userId='${id}'`).then(function(results) {
    bcrypt.compare(password,results[0][0].password, function(err,result2) {
      if (result2){
        res.json({status:true})
      }
      else{
        res.json({status:false})
      }
  })
})
})

router.get('/websocketmessage',(req,res) => {
  let ws = require('../../bin/www')
  ws.on("connection", (webSocketClient) => {
    // send feedback to the incoming connection
    //webSocketClient.send("The time is: ");
    
  });
})

router.post('/getnamereceiver' ,(req,res) => {
  const idreceiver = req.body.id
  sequelize.query(`select name from users where userId=${idreceiver}`).then(function(result) {
    res.json({name : result[0][0].name})
  })
})

router.get('/getnamesender', (req,res) => {
  var name;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user) =>{//Décrypt le token
    //req.session.userid = user.userid
    name =  user.name
  })
  res.json({namesender:name})
})
module.exports.Rout = router





