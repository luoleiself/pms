<template>
  <el-menu ref="_r-menu" @open="menuOpen" @close="menuClose" @select="menuSelect" :default-active="menuOptions.defaultActive" :default-openeds="menuOptions.defaultOpeneds" :unique-opened="menuOptions.uniqueOpened" :class="menuOptions.className" :background-color="menuOptions.backgroundColor" :text-color="menuOptions.textColor" :active-text-color="menuOptions.activeTextColor" :menu-trigger="menuOptions.menuTrigger" :collapse-transition="menuOptions.collapseTransition">
    <menu-item :menuList="menuList" :propsOpt="propsOpt" />
  </el-menu>
</template>
<script>
import menu from './menu-item.vue'

export default {
  name: 'r-menu',
  components: { 'menu-item': menu },
  data() {
    return {}
  },
  props: {
    menuList: Array, // 菜单树
    propsOpt: Object, // 菜单生成 key 配置
    // 菜单配置
    defaultActive: { type: String, default: '' }, // 当前激活菜单
    defaultOpeneds: { type: Array, default: () => [] }, // 当前打开的菜单
    uniqueOpened: { type: Boolean, default: false }, // 是否保持一个子菜单打开
    className: { type: Array, default: () => ['el-menu-vertical-demo'] }, // 样式
    activeTextColor: { type: String, default: '#ffd04b' }, // 当前激活菜单的颜色
    backgroundColor: { type: String, default: '#545c64' }, // 菜单背景色
    textColor: { type: String, default: '#fff' }, // 菜单文字颜色
    menuTrigger: { type: String, default: 'hover' }, // 子菜单打开的方式
    collapseTransition: { type: Boolean, default: true } // 是否开启折叠动画
  },
  computed: {
    menuOptions() {
      // 当前激活菜单
      return {
        defaultActive: this.defaultActive,
        defaultOpeneds: this.defaultOpeneds,
        uniqueOpened: this.uniqueOpened,
        className: this.className,
        activeTextColor: this.activeTextColor,
        backgroundColor: this.backgroundColor,
        textColor: this.textColor,
        menuTrigger: this.menuTrigger,
        collapseTransition: this.collapseTransition
      }
    }
  },
  methods: {
    open(index) {
      this.$refs['_r-menu'].open(index)
    },
    close(index) {
      this.$refs['_r-menu'].close(index)
    },
    menuOpen(index, indexPath) {
      this.$emit('open', index, indexPath)
    },
    menuClose(index, indexPath) {
      this.$emit('close', index, indexPath)
    },
    menuSelect(index, indexPath) {
      this.$emit('select', index, indexPath)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
