import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vuetify from './plugins/vuetify';
import Router from 'vue-router'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

Vue.use(VueMaterial)
Vue.use(Router)
Vue.config.productionTip = false


const router = new Router({
  mode: 'history',
  routes: [
    { path: '/user/signin', component: SignIn },
    { path: '/user/signup', component: SignUp },
    { path: '*', component: SignIn }
  ]
});



new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
