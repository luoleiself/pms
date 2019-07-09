import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Xhr from "./assets/js/api";

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$xhr = Xhr;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
