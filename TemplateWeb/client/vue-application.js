
//Integration des composants
const Home = window.httpVueLoader('./components/Home.vue')
const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Conversation = window.httpVueLoader('./components/Conversation.vue')
const Listemembres = window.httpVueLoader('./components/Listemembres.vue')
const Notifami = window.httpVueLoader('./components/Notifami.vue')
const Sectionami = window.httpVueLoader('./components/Sectionami.vue')

var refreshToken;

axios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.config.url != "/refreshToken" && error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const res = await axios.get('/api/refreshToken')
      refreshToken = res.data.refresh
      console.log('refresh' + refreshToken)
    if (refreshToken && refreshToken != "") {
      axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
      console.log('refreshToken');
      await axios.post('/api/refreshToken').then((response) => {
        // TODO: mettre à jour l'accessToken dans le localStorage
        console.log('token refreshed')
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        console.log('1')
        location.reload()
        /*
        axios.get('/api/verifCookieLog').then((response2) => {
        if (response2.data.verif==true)
        {
          console.log('dans dans')
          axios.get('/api/getmessage').then((response3) => {
            this.listmessage = []
            console.log(this.listmessage)
            this.listmessage.push(response3.data.liste)
          })
        }
        })
        */
      }).catch((err) => {
        console.log('erreur')
        /*
        const veriflog = axios.get('/api/verifCookieLog')
      if (veriflog.data.verif==true)
      {
        const listMessage = axios.get('/api/getmessage')
        this.listmessage.push(listMessage.data.liste)
      }
      */
        console.log(err.response.status);
        refreshToken = null;
        axios.post('/api/retourLogin')
        window.location.href=('/')
      });
      return axios(originalRequest);
    }
    else{
      axios.post('/api/retourLogin')
        window.location.href=('/')
    }
  }
  return Promise.reject(error);
});


const routes = [
  {path: '/', name:'home', component: Home  },
  {path: '/accueil', name:'accueil', component: Accueil  },
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
    verifMdpDecrypt:0,
    listemembres:[],
    listnotifami:[],
    listami:[],
  },
  components: 
  {
  },
  async mounted () 
  {
      const res = await axios.get('/api/retourLogin')
      if (res.data.status==false){
        this.verif()
      }
      const veriflog = await axios.get('/api/verifCookieLog')
      if (veriflog.data.verif==true)
      {
        const listMessage = await axios.get('/api/getmessage')
        console.log(listMessage.data.liste)
        this.listmessage.push(listMessage.data.liste)
      }
      const valeurMdpDecrypt = await axios.get('/api/verifMdpDecrypt')
      //console.log(valeurMdpDecrypt.data.cookiemdp)
      this.verifMdpDecrypt = valeurMdpDecrypt.data.cookiemdp
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
     //console.log(ami)
  },
  methods: 
  {
   
    async login(Login){
      const res = await axios.post('/api/login', Login)
      console.log(res.data.status)
      
      if (res.data.status==true){
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
        refreshToken = res.data.refresh
        this.resultlogin = 1;
        const listMessage = await axios.get('/api/getmessage')
        this.listmessage.push(listMessage.data.liste)
        const listUsers = await axios.get('/api/getusers');
        this.listemembres = []
        this.listemembres.push(listUsers.data.liste);
        console.log('test : ' + listUsers.data.liste)
        this.listemembres = this.listemembres[0]
        const notif = await axios.get('/api/notifami')
        this.listnotifami.push(notif.data.listnotif)
        this.listnotifami = this.listnotifami[0]
        const ami = await axios.get('/api/ami')
        this.listami=[]
        this.listami.push(ami.data.list)
        this.listami =  this.listami[0]
        this.$router.push('/accueil');
      }
      
    },
    async verif(){
  
    const res = await axios.get('/api/verif')
    if (res.data.status==false){
      this.$router.push('/')
    }
    else{
      console.log('test variavle')
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
      refreshToken = res.data.refresh
      this.resultlogin = 1
    }
    },
    async deconnexion(){
      const res = await axios.get('api/deco')
      this.verifMdpDecrypt = 0
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
        const listUsers = await axios.get('/api/getusers');
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
      const res = await axios.post('/api/sendMessage', {message:message,date:fulldate,verifMdpDecrypt:this.verifMdpDecrypt})
      console.log(res.data.user)
      console.log(res.data)
      console.log(this.listmessage)
      this.listmessage[0].push(res.data)
    },
    async submitpassword(password){
      console.log('ca marche : '+password)
      if (password=="123"){
        console.log("mdp OK")
        console.log(this.listmessage)
        const res = await axios.post('/api/decrypt', {listCrypt : this.listmessage})
        //this.listmessage = res.data.listeDescrypt
        this.verifMdpDecrypt=1
        console.log(res.data.listeDescrypt)
        const listMessage = await axios.get('/api/getmessage')
        this.listmessage = []
        this.listmessage.push(listMessage.data.liste)
      }
        

    },
    async loadData(){
        const veriflog = await axios.get('/api/verifCookieLog')
        if (veriflog.data.verif==true)
        {
          const listMessage = await axios.get('/api/getmessage')
          this.listmessage.push(listMessage.data.liste)
        }
    },
    async returnAccueil (){
      router.push('/accueil')
    },
    async ajoutAmi(user){
      const res = await axios.post('/api/ajoutami',{id : user.id})
    },
    async acceptAmi(relationId){
      console.log(relationId)
      const res = await axios.post('/api/acceptAmi',{relationId : relationId})
    }
    
  }
})
