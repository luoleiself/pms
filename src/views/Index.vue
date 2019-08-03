<template>
  <div style="overflow: auto;">
    <div class="echarts_box">
      <div ref="chart1" style="width: 600px;height:400px;"></div>
      <div ref="chart2" style="width: 600px;height:400px;"></div>
      <div ref="chart3" style="width: 600px;height:400px;"></div>
    </div>
    <div class="echarts_box">
      <div ref="chart4" class="line"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "Index",
  data() {
    return {
      chart1: "",
      chart2: "",
      chart3: "",
      chart4: ""
    };
  },
  mounted() {
    this.initSalesData();
    this.initPurchaseData();
    this.initStatGoodsByCategory();
    this.initLine();
  },
  methods: {
    initSalesData() {
      this.chart1 = echarts.init(this.$refs["chart1"]);
      this.chart1.setOption({
        title: { x: "center" },
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
      });
      this.$xhr
        .get("/charts/sales/record", { params: { p_size: 5 } })
        .then(res => {
          let rows = res.data.rows;
          let p_size = res.data.p_size;

          let legend = rows.map(item => item.goods.name);
          let series = rows.map(item => ({
            value: item.total,
            name: item.goods.name
          }));
          this.chart1.setOption({
            title: {
              text: `近一个月销售量前${p_size}名商品占比`
            },
            legend: {
              data: legend
            },
            series: [{ data: series }]
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    initPurchaseData() {
      this.chart2 = echarts.init(this.$refs["chart2"]);
      this.chart2.setOption({
        title: { x: "center" },
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
            name: "采购商品",
            type: "pie",
            center: ["50%", "50%"],
            data: []
          }
        ]
      });
      this.$xhr
        .get("/charts/purchase/record", { params: { p_size: 5 } })
        .then(res => {
          let rows = res.data.rows;
          let p_size = res.data.p_size;

          let legend = rows.map(item => item.goods.name);
          let series = rows.map(item => ({
            value: item.total,
            name: item.goods.name
          }));
          this.chart2.setOption({
            title: {
              text: `近一个月采购量前${p_size}名商品占比`
            },
            legend: {
              data: legend
            },
            series: [{ data: series }]
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    initStatGoodsByCategory() {
      this.chart3 = echarts.init(this.$refs["chart3"]);
      this.chart3.setOption({
        title: {
          text: "按类别统计商品个数",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          left: "left",
          selected: [],
          data: []
        },
        series: [
          {
            name: "商品名称",
            type: "pie",
            center: ["50%", "50%"],
            data: []
          }
        ]
      });
      this.$xhr
        .get("/charts/category/goods")
        .then(res => {
          let rows = res.data;
          let legend = rows.map(item => item.category_name);
          let series = rows.map(item => ({
            value: item.amount,
            name: item.category_name
          }));
          let selected = rows.map(item => item.category_name).slice(6);
          this.chart3.setOption({
            legend: {
              selected: selected,
              data: legend
            },
            series: [{ data: series }]
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    initLine() {
      this.chart4 = echarts.init(this.$refs["chart4"]);
      this.chart4.setOption({
        title: {
          text: "按月份统计销售和采购总量",
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          top: "30",
          data: []
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "1%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      });
      this.$xhr
        .get("/charts/salesPurchase")
        .then(res => {
          let data = res.data;
          let legend = [data.sales.name, data.purchase.name];
          let xAxis = data.timeArr.map(item =>
            new Date(item * 1000).toLocaleDateString()
          );
          let series = [data.sales, data.purchase];
          this.chart4.setOption({
            legend: { data: legend },
            xAxis: { data: xAxis },
            series
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
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  .line {
    width: 100%;
    height: 450px;
  }
}
</style>
