import rMenu from './src/index.vue'

rMenu.install = Vue => {
  Vue.component(rMenu.name, rMenu)
}

export default rMenu
