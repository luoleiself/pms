import Vue from "vue";
import Router from "vue-router";

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
      component: () => import("@/views/Home.vue")
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.user.status) {
//       next();
//     } else {
//       // next({
//       //   path: "/login",
//       //   query: {
//       //     redirect: to.fullPath
//       //   }
//       // });
//     }
//   } else {
//     next();
//   }
// });

export default router;
