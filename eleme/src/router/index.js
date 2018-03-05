import Vue from 'vue'
import Router from 'vue-router'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'
import goods from '@/components/goods/goods'

Vue.use(Router)

export default new Router({
  routes: [
     {
     	path:'/',
     	redirect:'/goods'
     },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
