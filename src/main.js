import Vue from "vue";
import "./assets/css/index.scss";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Xhr from "./assets/js/api";

import rMenu from './components/r-menu' // 菜单插件
import { dateFormat } from "./assets/js/filters";

Vue.use(ElementUI);
Vue.use(rMenu);

Vue.config.productionTip = false;
Vue.prototype.$xhr = Xhr;

// 全局过滤器
Vue.filter("dateFormat", dateFormat);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
