import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Aside from '@/components/Aside'
import Loading from '@/components/Loading'
import Dialog from '@/components/Dialog'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Role from '@/account/Role'
import User from '@/account/user'
import Sortable from '@/table/sortable'
import Filtertable from '@/table/filtertable'
import Expand from '@/table/expand'
import Notification from '@/notification/Notification'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      components: {
        default: Home
      }
    },
    {
      path: '/',
      name: 'Login',
      components: {
        default: Login
      }
    },
    {
      path: '/account/role',
      name: '/account/role',
      components: {
        default: Role
      }
    },
    {
      path: '/account/user',
      name: '/account/user',
      components: {
        default: User
      }
    },
    {
      path: '/table/sortable',
      name: '/table/sortable',
      components: {
        default: Sortable
      }
    },
    {
      path: '/table/filtertable',
      name: '/table/filtertable',
      components: {
        default: Filtertable
      }
    },
    {
      path: '/table/expand',
      name: '/table/expand',
      components: {
        default: Expand
      }
    },
    {
      path: '/notification/notification',
      name: '/notification/notification',
      components: {
        default: Notification
      }
    }
  ]
})

router.options.routes.forEach(item => {
  item.components.Loading = Loading;
  if (item.name === 'Login') {
    return false;
  }
  item.components.Header = Header;
  item.components.Aside = Aside;
  item.components.Dialog = Dialog;
});

export default router;
