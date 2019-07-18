<template>
  <el-row class="left_nav tac">
    <el-col :span="24">
      <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'goods'}">
            商品管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'categories'}">
            分类管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'brands'}">
            品牌管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'manufactors'}">
            供应商管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'sale'}">
            销售管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'purchase'}">
            采购管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-menu"></i>
          <router-link tag="span" :to="{name: 'users'}">
            用户管理
          </router-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "LeftNav",
  data() {
    return {};
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
