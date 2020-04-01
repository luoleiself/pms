<template>
  <div>
    <template v-for="(item,index) in menuList">
      <el-submenu v-if="item.hasOwnProperty([menuKeyOpt.children]) && item[menuKeyOpt.children].length > 0" :key="index" :index="item[menuKeyOpt.path]">
        <template slot="title">
          <i v-if="item.hasOwnProperty(menuKeyOpt.icon)" :class="item[menuKeyOpt.icon] ? item[menuKeyOpt.icon] : 'el-icon-location'"></i>
          <span>{{item[menuKeyOpt.name]}}</span>
        </template>
        <menu-item :menuList="item[menuKeyOpt.children]" />
      </el-submenu>
      <el-menu-item v-else :key="index" :index='item[menuKeyOpt.path]'>
        <i v-if="item.hasOwnProperty(menuKeyOpt.icon)" :class="item[menuKeyOpt.icon] ? item[menuKeyOpt.icon] : 'el-icon-location'"></i>
        <router-link class="item" tag="span" :to="{name:`${item[menuKeyOpt.path]}`}">
          {{item[menuKeyOpt.name]}}
        </router-link>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    propsOpt: Object,
    menuList: Array
  },
  data() {
    return {}
  },
  computed: {
    // 菜单生成 key 配置
    menuKeyOpt() {
      return Object.assign({}, { name: 'name', path: 'alias', children: 'children', icon: 'icon' }, this.propsOpt)
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: inline-block;
}
</style>
