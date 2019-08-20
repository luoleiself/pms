<template>
  <el-row class="left_nav">
    <el-col :span="24">
      <!-- <el-menu default-active="0" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item v-for="(item,index) in menu" :key="index" :index="`${index}`">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: item.alias}">
            {{item.name}}
          </router-link>
        </el-menu-item>
      </el-menu> -->
      <r-menu :menuList="menu" default-active="index" unique-opened />
    </el-col>
  </el-row>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "LeftNav",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      menu: state => state.user.menu
    })
  }
};
</script>
<style lang="scss" scoped>
.left_nav {
  float: left;
  // min-height: calc(100vh - 50px);
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: auto;
  background-color: rgb(84, 92, 100);
  width: 200px;
  z-index: 2;
  // padding-bottom: 20000px;
  // margin-bottom: -20000px;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
