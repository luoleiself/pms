<template>
  <div>
    <div class="query_box">
      <el-select v-model="queryParams.status" clearable placeholder="商品状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-select v-model="queryParams.category_id" placeholder="分类名称">
        <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="queryParams.brand_id" placeholder="品牌名称">
        <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input placeholder="请输入商品名称关键字" v-model="queryParams.keys" @keyup.enter.native="query" clearable></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="menu_box">
      <el-button type="primary" @click="add">添加商品</el-button>
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="keys" label="商品名称关键字" align="center"></el-table-column>
        <el-table-column prop="desc" label="商品描述" align="center"></el-table-column>
        <el-table-column prop="amount" label="商品库存数量" align="center"></el-table-column>
        <el-table-column prop="" label="所属品牌" align="center" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.brand">{{scope.row.brand.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="所属分类" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.category">{{scope.row.category.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="供应商名称" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.brand && scope.row.brand.manufactor">{{scope.row.brand.manufactor.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else>禁用</span>
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
            <el-button type="text" size="mini" v-if="scope.row.status == 1" @click="disable(scope.row)">禁用</el-button>
            <el-button type="text" size="mini" v-else @click="enable(scope.row)">启用</el-button>
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
          <el-form-item label="商品名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="商品名称" :disabled="dialogOpt.formDisable"></el-input>
          </el-form-item>
          <el-form-item label="商品检索关键字" prop="keys">
            <el-input v-model.trim="form.keys" placeholder="商品检索关键字"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input v-model.trim="form.desc" placeholder="商品描述"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category_id">
            <el-select v-model="form.category_id" clearable filterable remote placeholder="请输入关键字" :remote-method="categoryRemoteQuery" :loading="categoryOpt.loading" :style="{width: '340px'}">
              <el-option v-for="item in categoryOpt.list" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属品牌" prop="brand_id">
            <el-select v-model="form.brand_id" clearable filterable remote placeholder="请输入关键字" :remote-method="brandRemoteQuery" :loading="brandOpt.loading" :style="{width: '340px'}">
              <el-option v-for="item in brandOpt.list" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
  name: "Goods",
  mixins: [dataMixin, methodsMixin],
  data() {
    return {
      queryParams: {
        status: "",
        keys: "",
        category_id: "",
        brand_id: ""
      },
      brandList: [],
      categoryList: [],
      manufactorList: [],
      dialogOpt: {
        title: "添加商品",
        visible: false,
        formDisable: false,
        oper: 0 // 1 -> 新增, 2 -> 编辑
      },
      form: {
        name: "",
        keys: "",
        desc: "",
        brand_id: "",
        category_id: ""
      },
      rules: {
        name: [
          { required: true, message: "商品名称不能为空!", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "分类不能为空!", trigger: "change" }
        ],
        brand_id: [
          { required: true, message: "品牌不能为空!", trigger: "change" }
        ]
      },
      categoryOpt: {
        loading: false,
        list: []
      },
      brandOpt: {
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
      this.queryParams.status = this.queryParams.keys = this.queryParams.category_id = this.queryParams.brand_id =
        "";
      this.updateTable();
    },
    add() {
      this.dialogOpt.visible = true;
      this.dialogOpt.oper = 1;
      this.dialogOpt.title = "添加商品";
      this.dialogOpt.formDisable = false;
    },
    edit(row) {
      this.$xhr
        .get(`/goods/${row.id}`)
        .then(res => {
          this.dialogOpt.visible = true;
          this.dialogOpt.formDisable = true;
          this.dialogOpt.oper = 2;
          this.dialogOpt.title = "编辑商品";
          this.dialogOpt.row = row;
          this.form.name = res.data.name;
          this.form.keys = res.data.keys;
          this.form.desc = res.data.desc;
          this.form.category_id = res.data.category_id;
          this.form.brand_id = res.data.brand_id;
          if (res.data.brand) {
            this.brandOpt.list.push({
              label: res.data.brand.name,
              value: res.data.brand.id
            });
          }
          if (res.data.category) {
            this.categoryOpt.list.push({
              label: res.data.category.name,
              value: res.data.category.id
            });
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    enable(row) {
      this.$xhr
        .put(`/goods/${row.id}`, { status: 1 })
        .then(res => {
          this.$message.success(res.msg);
          this.updateTable();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    disable(row) {
      this.$xhr
        .put(`/goods/${row.id}`, { status: 0 })
        .then(res => {
          this.$message.success(res.msg);
          this.updateTable();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    // 重置表单项
    resetFields(formName) {
      this.$refs[formName].clearValidate();
      this.form.name = this.form.keys = this.form.desc = this.form.brand_id = this.form.category_id =
        "";
      this.brandOpt.list = [];
      this.categoryOpt.list = [];
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
            // 添加
            this.$xhr
              .post(`/goods`, {
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
          } else {
            // 编辑
            this.$xhr
              .put(`/goods/${this.dialogOpt.row.id}`, {
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
          }
        }
      });
    },
    // 远程搜索分类
    categoryRemoteQuery(query) {
      if (query !== "") {
        this.categoryOpt.loading = true;
        this.$xhr
          .get("/categories", { params: { status: "1", keys: query } })
          .then(res => {
            this.categoryOpt.loading = false;
            this.categoryOpt.list = res.data.map(item => {
              return { label: item.name, value: item.id };
            });
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    },
    // 远程搜索品牌
    brandRemoteQuery(query) {
      if (query !== "") {
        this.brandOpt.loading = true;
        this.$xhr
          .get("/brands", { params: { status: "1", keys: query } })
          .then(res => {
            this.brandOpt.loading = false;
            this.brandOpt.list = res.data.map(item => {
              return {
                label: `${item.name} - ${item.manufactor.name}`,
                value: item.id
              };
            });
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    },
    updateTable() {
      this.tableOptions.loading = true;
      this.$xhr
        .get("/goods", {
          params: {
            p: this.pageOptions.currentPage,
            p_size: this.pageOptions.pageSize,
            status: this.queryParams.status,
            keys: this.queryParams.keys,
            category_id: this.queryParams.category_id,
            brand_id: this.queryParams.brand_id
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
        .get("/brands")
        .then(res => {
          this.brandList = res.data.map(item => {
            return { label: item.name, value: item.id };
          });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
      this.$xhr
        .get("/categories")
        .then(res => {
          this.categoryList = res.data.map(item => {
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
