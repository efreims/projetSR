
//Integration des composants
const Home = window.httpVueLoader('./components/Home.vue')
const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Conversation = window.httpVueLoader('./components/Conversation.vue')
const Listemembres = window.httpVueLoader('./components/Listemembres.vue')
const Notifami = window.httpVueLoader('./components/Notifami.vue')
const Sectionami = window.httpVueLoader('./components/Sectionami.vue')
const Loginfa = window.httpVueLoader('./components/Loginfa.vue')


const routes = [
  {path: '/', name:'home', component: Home  },
  {path: '/accueil', name:'accueil', component: Accueil  },
  {path: '/loginfa', name:'Loginfa', component: Loginfa }
]

const router = new VueRouter({
  routes
})

var app = new Vue( 
{
  router,
  el: '#app',
  data: 
  {
    resultlogin:0,
    listmessage:[],
    listemembres:[],
    listnotifami:[],
    listami:[],
    onconv:-1,
    errormessagelogin:0,
    errormessagelogin2fa:0,
    listerecherche:[],
    temppassword:"",
    tempemail:"",
    tempid:0,
    connection: null,
    namereceiver : "",
    namesender:"",
    displaydecrypt:false
  },
  components: 
  {
  },
  async mounted () 
  {
      const temp = await this.verif()
      console.log('temp' + temp.toString())
      if (temp==true)
        {
      this.resultlogin = 1;
      const valeurMdpDecrypt = await axios.get('/api/verifMdpDecrypt')
      //console.log(valeurMdpDecrypt.data.cookiemdp)
      this.displaydecrypt = valeurMdpDecrypt.data.verif
      console.log('displaydecrypt : '+ this.displaydecrypt)
     // console.log(listMessage.data.liste)
      const listUsers = await axios.get('/api/getusers');
      this.listemembres = []
      this.listemembres.push(listUsers.data.liste);
      this.listemembres = this.listemembres[0]
      const notif = await axios.get('/api/notifami')
      this.listnotifami.push(notif.data.listnotif)
      this.listnotifami = this.listnotifami[0]
      const ami = await axios.get('/api/ami')
      this.listami=[]
      this.listami.push(ami.data.list)
      this.listami =  this.listami[0]
        const idConv = await axios.get('/api/getCookieConv')
        this.onconv = parseInt(idConv.data.id)
        this.listmessage = []
        const namesend = await axios.get('/api/getnamesender')
        this.namesender = namesend.data.namesender
        if (this.onconv!=-1){
          console.log("eee : "+this.displaydecrypt)
          const listMessage = await axios.post('/api/getmessage',{id : idConv.data.id,verifmdp:this.displaydecrypt})
          this.listmessage.push(listMessage.data.liste)
          const name = await axios.post('/api/getnamereceiver',{id : this.onconv})
          this.namereceiver = name.data.name
        }
        }
        else{
          this.$router.push('/')
        }
     //console.log(ami)
  },
  methods: 
  {
    async login(Login){
      console.log(Login)
      const veriflog = await axios.post('/api/login', {email:Login.email,password:Login.password,first:true})
      console.log('named : ' + veriflog.data.name)
      this.namesender = veriflog.data.name
      console.log(veriflog.data.status)
      if (veriflog.data.status==false)
        this.errormessagelogin = 1
      else{
        this.$router.push('/loginfa');
        this.temppassword = veriflog.data.password
        this.tempemail = Login.email
        /*
        console.log('temppassword : ' + this.temppassword)
        console.log('tempemail : ' + this.tempemail)
        */
      }
    },
    async loginfa(code){
      const password = this.temppassword
      const email = this.tempemail
      const name = this.namesender
      console.log('password :'+password)
      console.log('email :'+email)
      const veriflog = await axios.post('/api/login', {email:email,password:password})
      const userID = veriflog.data.userID
      if (veriflog.data.status==true){
      const res =  await axios.post('/api/login2fa', {code : code,password : password,email : email,userID : userID,name : this.namesender})
      
      if (res.data.status==true){
        const listUsers = await axios.post('/api/getusers',{id :res.data.id });
        this.listemembres = []
        this.listemembres.push(listUsers.data.liste);
        this.listemembres = this.listemembres[0]
        const notif = await axios.post('/api/notifami',{id :res.data.id })
        this.listnotifami.push(notif.data.listnotif)
        this.listnotifami = this.listnotifami[0]
        const ami = await axios.post('/api/ami',{id :res.data.id })
        this.listami=[]
        this.listami.push(ami.data.list)
        this.listami =  this.listami[0]
        this.resultlogin = 1
        this.$router.push('/accueil');
      }
      else{
        this.errormessagelogin2fa = 1
      }
    }
    else{
      this.errormessagelogin = 1
      this.$router.push('/')
    }
  

    },
    async verif(){
  console.log('yes')
    const res = await axios.get('/api/verifAccess')
    console.log('yes')
    if (res.data.status==false){
      console.log('BONNNNN')
      const resRefresh = await axios.post('/api/refreshToken')
      if (resRefresh.data.status==false){
          return false
      }

      else 
        return true
    }
    else{
      console.log('PAS BONNNNN')
      return true
    }
    },
    async deconnexion(){
      const res = await axios.get('api/deco')
      console.log(res.data.status)
      this.$router.push('/');
      this.resultlogin = 0
      this.listmessage = []
      axios.defaults.headers.common['Authorization'] = ''
      axios.defaults.headers['Authorization'] = ''
    },
    async sign(Sign){
      console.log(Sign)
      const res = await axios.post('/api/sign', Sign)
      if (res.data.status==true){
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
        refreshToken = res.data.refresh
        this.resultlogin = 1;
        const listUsers = await axios.post('/api/getusers',res.data.id);
        this.listemembres = []
        this.listemembres.push(listUsers.data.liste);
        this.listemembres = this.listemembres[0]
        this.$router.push('/accueil');
      }
    },
    async submitmessage(message){
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const heures = date.getHours()
      const minutes = date.getMinutes()
      const fulldate = day+ '/'+ month + '/' + year + ' ' + heures + ':' + minutes
      const res = await axios.post('/api/sendMessage', {message:message,date:fulldate,verifmdp:this.displaydecrypt})
      this.listmessage[0].push(res.data)
    },
    async submitpassword(password){
      const verifmdp = await axios.post('/api/passwordverif',{password : password})
      if (verifmdp.data.status==true){
        this.displaydecrypt = true
        console.log("mdp OK")
        console.log(this.listmessage)
        const test = await axios.get('/api/decryptRSAprivate')
        const idConv = await axios.get('/api/getCookieConv')
        this.onconv = parseInt(idConv.data.id)
        console.log("zzzz : "+this.displaydecrypt)
        const listMessage = await axios.post('/api/getmessage',{id : this.onconv,verifmdp:this.displaydecrypt})
        this.listmessage = []
        console.log("Sur la conv : ")
        this.listmessage.push(listMessage.data.liste)
        console.log('Liste des messages : ' + this.listmessage)
      }
        

    },
    /*
    async loadData(){
        const idConv = await axios.get('/api/getCookieConv')
        console.log('idConv = '+ idConv.data.id)
        this.onconv = parseInt(idConv.data.id)
        const veriflog = await axios.get('/api/verifCookieLog')
        if (veriflog.data.verif==true)
        {
          console.log('yes')
          const listMessage = await axios.post('/api/getmessage',{id : idConv.data.id})
          this.listmessage = []
          this.listmessage.push(listMessage.data.liste)
        }
    },
    */
    async returnAccueil (){
      router.push('/accueil')
    },
    async ajoutAmi(user){
      const res = await axios.post('/api/ajoutami',{id : user.id})
    },
    async acceptAmi(relationId){
      console.log(relationId)
      const res = await axios.post('/api/acceptAmi',{relationId : relationId})
      console.log(res.data.list)
      this.listami.push(res.data.list)
      let index = this.listnotifami.findIndex( relationId => relationId = relationId);
      console.log(index)
      console.log(this.listami)
      this.listnotifami.splice(index,1)
    },
    async afficherConv(amiId){
      const cookie = await axios.post('/api/changeCookieConv',{id : amiId})
      this.onconv = cookie.data.idConv
      const veriflog = await axios.get('/api/verifCookieLog')
      if (veriflog.data.verif==true)
      {
        const name = await axios.post('/api/getnamereceiver',{id : amiId.id})
        this.namereceiver = name.data.name
        console.log('dedans')
        console.log('dedans2 : ' + amiId.id)
        const listMessage = await axios.post('/api/getmessage',{id : amiId.id})
        this.listmessage = []
        this.listmessage.push(listMessage.data.liste)
        console.log(this.listmessage)
      }
    },
    async recherchemembre(nom){
      console.log(nom)
      let regex = new RegExp(nom+".*")
      if(nom!=""){
      this.listerecherche = this.listemembres.filter(user => 
        user.name.match(regex) ? true : false
       )
       console.log(this.listerecherche)
       
    }
    else {
      this.listerecherche.pop()
    }
  }
    
  },

})
