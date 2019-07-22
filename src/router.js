import Vue from "vue";
import Router from "vue-router";
import store from "./store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue")
    },
    {
      path: "/home",
      name: "home",
      meta: {
        requireAuth: true
      },
      component: () => import("@/views/Home.vue"),
      redirect: "/home/goods",
      children: [
        {
          path: "/home/index",
          name: "index",
          component: () => import("@/views/Index.vue")
        },
        {
          path: "/home/users",
          name: "users",
          component: () => import("@/views/Users.vue")
        },
        {
          path: "/home/goods",
          name: "goods",
          component: () => import("@/views/Goods.vue")
        },
        {
          path: "/home/brands",
          name: "brands",
          component: () => import("@/views/Brands.vue")
        },
        {
          path: "/home/categories",
          name: "categories",
          component: () => import("@/views/Categories.vue")
        },
        {
          path: "/home/manufactors",
          name: "manufactors",
          component: () => import("@/views/Manufactors.vue")
        },
        {
          path: "/home/sale",
          name: "sale",
          component: () => import("@/views/Sale.vue")
        },
        {
          path: "/home/purchase",
          name: "purchase",
          component: () => import("@/views/Purchase.vue")
        }
      ]
    }
  ]
});

// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem("user")) {
  let user = JSON.parse(window.sessionStorage.getItem("user"));
  store.dispatch("USER_LOGIN", user);
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (window.sessionStorage.getItem("token")) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
