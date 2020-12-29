import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/users/SignIn'
import SignUp from '../components/users/SignUp'
import ForgotPassword from '../components/users/ForgotPassword'
import ResetPassword from '../components/users/ResetPassword'
import Dashboard from '../components/notes/Dashboard'
import Notes from '../components/notes/Notes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/signin' },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/forgotpassword', component: ForgotPassword },
    { path: '/resetpassword/:token', component: ResetPassword },
    {
      path: '/dashboard', component: Dashboard,
      children: [
        { path: 'notes', component: Notes }
      ]
    },
  ]
});

export default router