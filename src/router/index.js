import Vue from 'vue'//固定的
import VueRouter from 'vue-router'//固定的
import BookMain from '../views/BookMain.vue'
import BookAdd from '../views/BookAdd.vue'
import BookUpdate from '../views/BookUpdate.vue'
import Index from '../views/Index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '图书管理',
    component: Index,
    redirect:"/bookMain",//重定型
    children: [
      {
        path: '/bookMain',
        name: '查询图书',
        component: BookMain
      },
      {
        path: '/bookAdd',
        name: '添加图书',
        component: BookAdd
      },
      {
        path:'/bookUpdate',
        name:"修改图书",
        component:BookUpdate
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
