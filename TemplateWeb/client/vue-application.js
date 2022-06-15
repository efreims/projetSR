
//Integration des composants
const Home = window.httpVueLoader('./components/Home.vue')
const Accueil = window.httpVueLoader('./components/Accueil.vue')
const Conversation = window.httpVueLoader('./components/Conversation.vue')
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
        console.log('efegeege')
        originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      }).catch((err) => {
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
    listmessage:[]
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
      const listMessage = await axios.get('/api/getmessage')
      this.listmessage.push(listMessage.data.liste)

    
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
        this.$router.push('/accueil');
      }
      
    },
    async verif(){
  
    const res = await axios.get('/api/verif')
    if (res.data.status==false){
      this.$router.push('/')
    }
    else{
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
      refreshToken = res.data.refresh
      this.resultlogin = 1
    }
    },
    async deconnexion(){
      const res = await axios.get('api/deco')
      console.log(res.data.status)
      this.$router.push('/');
      this.resultlogin = 0
    },
    async sign(Sign){
      console.log(Sign)
      const res = await axios.post('/api/sign', Sign)
      if (res.data.status==true){
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;
        refreshToken = res.data.refresh
        this.resultlogin = 1;
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
      const res = await axios.post('/api/sendMessage', {message:message,date:fulldate})
      console.log(res.data.user)
    }
  
  }
})
