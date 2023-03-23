import Router from "vue-router";
import store from "./store";
import Vue from "vue";
import Home from "./views/Home.vue";
import FormVuex from "./views/FormVuex.vue";
import Content from "./views/content.vue";
import Login from "./views/Login.vue";
import LoginCallbackView from "./views/LoginCallbackView.vue";
import Editor from "./views/Editor.vue";

import applicationUserManager from "./Auth/applicationusermanager";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/Editor",
      name: "Editor",
      component: Editor
    },
    {
      path: "/Vuex",
      name: "Vuex",
      component: FormVuex
    },
    {
      path: "/Content/:id",
      name: "Content",
      component: Content,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/callback",
      name: "LoginCallbackView",
      component: LoginCallbackView
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Form.vue")
    },
    {
      path: "/home2",
      name: "home2",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home2.vue")
    },
    {
      path: "/Chat",
      name: "Chat",
      component: () =>
      import(/* webpackChunkName: "about" */ "./views/Chat2.vue")
    },
  ]
});

var storeTemp = store;
router.beforeEach((to, from, next) => {
  if(to.path === '/register' || to.path === '' || to.path === '/'){
    next()
  }else{ 
    let userToken = localStorage.getItem('token');
    // console.log("Token为:"+userToken); 
    if(userToken == null || userToken == ''){
      alert("无权限，请先登录!");
      return next('/');
    }else{
      next();
    }
  }
});

export default router;
