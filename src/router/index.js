import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login'
import Home from '@/views/Home'
import userManage from '@/views/userManage'
import Role from '@/views/Role'
import GoodManage from '@/views/Home/GoodManage'
import Welcome from '@/views/Home/Welcome'
import Users from '@/views/User/Users.vue'



Vue.use(Router)
const router = new Router({
    routes: [
        // {
        //       path: '*',
        //       redirect: '/home'
        //   },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/welcome',
            children: [{
                    path: '/welcome',
                    name: 'Welcome',
                    component: Welcome,
                },
                {
                    path: '/users',
                    name: 'Users',
                    component: Users,
                },
            ]
        },
        {
            path: '/userManage',
            name: 'userManage',
            component: userManage,
        },
        {
            path: '/role',
            name: 'Role',
            component: Role,
        }


    ]
})
export default router;
router.beforeEach((to, from, next) => {
    //to 要去的路由配置
    //from 当前的路由配置
    //next 一定要调用，让to的路由配置继续生效，比如如果去登陆直接next(),否则判断token是否存在，如果存在就next()

    if (to.path === '/login') return next(); //使用return，不需要写else

    //判断其他页面是否有token
    const token = window.sessionStorage.getItem('token');

    //存在继续往后走
    if (token) return next();


    // this.$router.push({name:'login'}) #没有this,无法使用
    console.log('未登录')
    router.push({
        name: 'Login'
    })


});