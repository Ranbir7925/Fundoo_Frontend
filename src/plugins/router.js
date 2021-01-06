import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/users/SignIn'
import SignUp from '../components/users/SignUp'
import ForgotPassword from '../components/users/ForgotPassword'
import ResetPassword from '../components/users/ResetPassword'
import Dashboard from '../components/notes/Dashboard'
import Notes from '../components/notes/Notes'
import Trash from '../components/notes/Trash'
import Archive from '../components/notes/Archive'

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
      beforeEnter(to, from, next) {
        if (localStorage.getItem("access_token") == undefined) {
          next({
            path: '/signin'
          })
        } else {
          next()
        }
      },
      children: [
        {
          path: 'notes', component: Notes,
          beforeEnter(to, from, next) {
            if (localStorage.getItem("access_token") == undefined) {
              next({
                path: '/signin'
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'trash', component: Trash,
          beforeEnter(to, from, next) {
            if (localStorage.getItem("access_token") == undefined) {
              next({
                path: '/signin'
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'archive', component: Archive,
          beforeEnter(to, from, next) {
            if (localStorage.getItem("access_token") == undefined) {
              next({
                path: '/signin'
              })
            } else {
              next()
            }
          }
        }
      ]
    },
  ]
});

export default router