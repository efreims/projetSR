//Integration des composants
const Home = window.httpVueLoader('./components/Home.vue')



const routes = [
  {path: '/', name:'home', component: Home  },
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
    
  },
  components: 
  {
  },
  async mounted () 
  {
    
  },
  methods: 
  {
    
  }
})
