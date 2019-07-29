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
      chart1: "",
      salesOpt: {
        title: {
          text: "近一个月销售量前五名商品占比",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
        },
        series: [
          {
            name: "销售商品",
            type: "pie",
            center: ["50%", "50%"],
            data: []
          }
        ]
      }
    };
  },
  mounted() {
    this.initSalesData();
  },
  methods: {
    initSalesData() {
      this.chart1 = echarts.init(this.$refs["chart1"]);
      this.chart1.setOption(this.salesOpt);
      this.$xhr
        .get("/charts", { params: { start_time: 1563813100 } })
        .then(res => {
          console.log(res);
          let rows = res.data;
          let legend = rows.map(item => item.goods.name);
          let series = rows.map(item => ({
            value: item.total,
            name: item.goods.name
          }));
          this.chart1.setOption({
            legend: {
              data: legend
            },
            series: [{ data: series }]
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.echarts_box {
  display: flex;
  flex-flow: flex-start nowrap;
}
</style>
