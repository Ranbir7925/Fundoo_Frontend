import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/user/signin', component: SignIn },
    { path: '/user/signup', component: SignUp },
    { path: '*', component: SignIn }
  ]
});

export default router