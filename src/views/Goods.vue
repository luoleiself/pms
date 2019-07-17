<template>
  <div>
    <div class="query_box">
      查询条件
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="keys" label="商品名称关键字" align="center"></el-table-column>
        <el-table-column prop="desc" label="商品描述" align="center"></el-table-column>
        <el-table-column prop="amount" label="商品库存数量" align="center"></el-table-column>
        <el-table-column prop="brand_id" label="所属品牌" align="center" width="90"></el-table-column>
        <el-table-column prop="category_id" label="所属分类" align="center"></el-table-column>
        <el-table-column prop="manufactor_id" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="创建时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="修改时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.update_time | dateFormat}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="operator" label="操作人" align="center"></el-table-column> -->
        <!-- <el-table-column prop="" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">禁用</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div style="text-align: center;margin: 15px 0 0 0;">
        <el-pagination :total="pageOptions.total" :current-page.sync="pageOptions.currentPage" :page-size="pageOptions.pageSize" :page-sizes="pageOptions.pageSizes" @size-change="pageSizeChange" @current-change="currentPageChange" background :layout="pageOptions.layout">
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "Goods",
  data() {
    return {
      query: {
        p: 1,
        p_size: 10
      },
      tableOptions: {
        tableData: [],
        tableHeight: window.innerHeight - 112 - 40,
        loading: false
      },
      pageOptions: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100, 200, 300],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  created() {
    this.updateTable();
  },
  methods: {
    tblSelectionChange(selection) {
      console.log(selection);
    },
    pageSizeChange(pageSize) {
      console.log(pageSize);
    },
    currentPageChange(currentPage) {
      console.log(currentPage);
    },
    updateTable() {
      this.tableOptions.loading = true;
      this.$xhr
        .get("/goods", { params: { ...this.query } })
        .then(res => {
          this.tableOptions.loading = false;
          this.tableOptions.tableData = res.data.rows;
          this.pageOptions.total = res.data.total;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

