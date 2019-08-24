<template>
  <div>
    <div class="query_box">
      <el-date-picker v-model="queryParams.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      <el-select v-model="queryParams.goods_id" placeholder="商品名称">
        <el-option v-for="item in goodsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="menu_box">
      <el-button type="primary" @click="add">添加出库记录</el-button>
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="amount" label="出库数量" align="center"></el-table-column>
        <el-table-column prop="" label="商品名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.good.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="分类" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.good.category.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="品牌" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.good.brand.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="供应商" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.good.brand.manufactor.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="创建时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="修改时间" align="center" width="160">
          <template slot-scope="scope">
            <span>{{scope.row.update_time | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人" align="center" width="100"></el-table-column>
        <el-table-column prop="" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;margin: 15px 0 0 0;">
        <el-pagination :total="pageOptions.total" :current-page.sync="pageOptions.currentPage" :page-size="pageOptions.pageSize" :page-sizes="pageOptions.pageSizes" @size-change="pageSizeChange" @current-change="currentPageChange" background :layout="pageOptions.layout">
        </el-pagination>
      </div>
    </template>
    <!-- 添加和编辑弹框 -->
    <el-dialog :title="dialogOpt.title" :visible.sync="dialogOpt.visible" :close-on-click-modal='false' :close-on-press-escape='false' :before-close="beforeClose" top="18vh" width="500px">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="商品名称" prop="goods_id">
            <el-select v-model="form.goods_id" clearable filterable remote placeholder="请输入关键字" :remote-method="goodsRemoteQuery" :loading="goodsOpt.loading" :disabled="dialogOpt.formDisable" :style="{width: '340px'}">
              <el-option v-for="item in goodsOpt.list" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" prop="amount">
            <el-input v-model="form.amount" placeholder="出库数量" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitFormCancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitFormConfirm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dataMixin, methodsMixin } from "@/assets/js/mixin";

export default {
  name: "Sale",
  mixins: [dataMixin, methodsMixin],
  data() {
    let checkAmount = (rule, val, callback) => {
      let regExp = /^([0-9]*?)$/i;
      if (val.search(regExp) == -1) {
        return callback(new Error("数量只能为整数!"));
      } else {
        callback();
      }
    };
    return {
      queryParams: {
        date: [],
        goods_id: ""
      },
      goodsList: [],
      dialogOpt: {
        title: "添加出库记录",
        visible: false,
        oper: 0, // 1->添加，2->编辑
        formDisable: false
      },
      form: {
        goods_id: "",
        amount: ""
      },
      rules: {
        goods_id: [
          { required: true, message: "商品名称不能为空!", trigger: "blur" }
        ],
        amount: [{ validator: checkAmount, trigger: "blur" }]
      },
      goodsOpt: {
        loading: false,
        list: []
      }
    };
  },
  created() {
    this.updateTable();
    this.initData();
  },
  methods: {
    query() {
      this.updateTable();
    },
    reset() {
      this.queryParams.date = [];
      this.queryParams.goods_id = "";
      this.updateTable();
    },
    add() {
      this.dialogOpt.title = "添加出库记录";
      this.dialogOpt.visible = true;
      this.dialogOpt.oper = 1;
      this.dialogOpt.formDisable = false;
    },
    async edit(row) {
      try {
        let res = await this.$xhr.get(`/sales/${row.id}`);
        this.dialogOpt.title = "编辑出库记录";
        this.dialogOpt.visible = true;
        this.dialogOpt.oper = 2;
        this.dialogOpt.row = row;
        this.dialogOpt.formDisable = true;
        this.form.goods_id = res.data.goods_id;
        this.form.amount = res.data.amount;
        this.goodsOpt.list.push({
          label: `${res.data.good.name} - ${res.data.good.brand.name} - ${res.data.good.brand.manufactor.name}`,
          value: res.data.goods_id
        });
      } catch (error) {
        this.$message.error(error.msg);
      }
    },
    // 重置表单项
    resetFields(formName) {
      this.$refs[formName].clearValidate();
      this.form.goods_id = this.form.amount = "";
      this.goodsOpt.list = [];
    },
    beforeClose(done) {
      this.resetFields("form"); // 重置表单
      done();
    },
    submitFormCancel(formName) {
      this.resetFields(formName); // 重置表单
      this.dialogOpt.visible = false;
    },
    submitFormConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogOpt.oper == 1) {
            this.$xhr
              .post("/sales", {
                ...this.form
              })
              .then(res => {
                this.dialogOpt.visible = false;
                this.resetFields("form");
                this.$message.success(res.msg);
                this.updateTable();
              })
              .catch(err => {
                this.$message.error(err.msg);
              });
            // 添加
          } else {
            // 编辑
            this.$xhr
              .put(`/sales/${this.dialogOpt.row.id}`, { ...this.form })
              .then(res => {
                this.dialogOpt.visible = false;
                this.resetFields("form");
                this.$message.success(res.msg);
                this.updateTable();
              })
              .catch(err => {
                this.$message.error(err.msg);
              });
          }
        }
      });
    },
    // 远程搜索分类
    goodsRemoteQuery(query) {
      if (query !== "") {
        this.goodsOpt.loading = true;
        this.$xhr
          .get("/goods", { params: { status: 1, keys: query } })
          .then(res => {
            this.goodsOpt.loading = false;
            this.goodsOpt.list = res.data.map(item => {
              return {
                label: `${item.name} - ${item.brand.name} - ${item.brand.manufactor.name}`,
                value: item.id
              };
            });
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    },
    // 更新表格方法
    updateTable() {
      let date = Object.assign(this.queryParams.date);

      this.tableOptions.loading = true;
      this.$xhr
        .get("/sales", {
          params: {
            p: this.pageOptions.currentPage,
            p_size: this.pageOptions.pageSize,
            goods_id: this.queryParams.goods_id,
            start_time: date[0] ? (date[0].getTime() / 1000) | 0 : "",
            end_time: date[1] ? (date[1].getTime() / 1000) | 0 : ""
          }
        })
        .then(res => {
          this.tableOptions.loading = false;
          this.tableOptions.tableData = res.data.rows;
          this.pageOptions.total = res.data.total;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    initData() {
      this.$xhr
        .get("/goods", { params: { status: 1 } })
        .then(res => {
          this.goodsList = res.data.map(item => {
            return { label: item.name, value: item.id };
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
</style>
