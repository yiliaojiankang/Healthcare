//1．导入 Vue 和 VueRouter 的包
import Vue from 'vue'
import Router from 'vue-router'
//2．调用Vue.use()函数，把 VueRouter安装为Vue的插件
Vue.use(Router)




//3．创建路由的实例对象
const routes = [
    {
        path: "*", redirect: '/yibao'
    },
    {
        path: '/yibao', component: () => import('../yibao/App.vue')
    },
    {
        path: '/yibaophone', component: () => import('../yibao/MyPhone.vue')
    },
    {
        path: '/yiliaohuaxiang', component: () => import('../yiliaohuaxiang/app.vue')
    },
    {
        path: '/yanglao', component: () => import('../yanglao/app.vue')
    },
]
const router = new Router({
    routes,
    // mode:'history'
    mode: 'hash'
})
//4．向外共享路由的实例对象
export default router
