<template>
  <div class="echarts_box">
    <div ref="chart1" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "Index",
  data() {
    return {
      chart1: ""
    };
  },
  mounted() {
    this.chart1 = echarts.init(this.$refs["chart1"]);
    this.$xhr
      .get("/charts", { params: { start_time: 1563813100 } })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        this.$message.error(err.msg);
      });
  }
};
</script>
<style lang="scss" scoped>
.echarts_box {
  display: flex;
  flex-flow: flex-start nowrap;
}
</style>
