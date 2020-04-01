<template>
  <div class="home">
    <Header />
    <template>
      <LeftNav />
      <router-view class="content" />
    </template>
  </div>
</template>

<script>
import { Debounce, Throttle } from "@/assets/js/utils";
import Header from "@/components/Header.vue";
import LeftNav from "@/components/LeftNav.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  components: {
    Header,
    LeftNav
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: calc(100vh - 50px);
  padding: 15px 0 15px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

