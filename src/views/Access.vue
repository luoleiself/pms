<template>
  <div>
    <div class="query_box">
      <el-select v-model="queryParams.status" clearable placeholder="权限状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-input placeholder="请输入权限名称关键字" v-model="queryParams.keys" @keyup.enter.native="query" clearable></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="menu_box">
      <el-button type="primary" @click="add">添加权限</el-button>
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="权限名称" align="center"></el-table-column>
        <el-table-column prop="path" label="权限路由" align="center"></el-table-column>
        <el-table-column prop="alias" label="权限简称" align="center"></el-table-column>
        <el-table-column prop="icon" label="权限图标" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.icon"></span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="父级权限" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.parent">{{scope.row.parent.name}}</span>
          </template>
        </el-table-column>
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
    <el-dialog :title="dialogOpt.title" :visible.sync="dialogOpt.visible" :close-on-click-modal='false' :close-on-press-escape='false' :before-close="beforeClose" top="18vh" width="580px">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="权限名称" prop="name">
                <el-input v-model.trim="form.name" placeholder="权限名称" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限简称" prop="alias">
                <el-input v-model.trim="form.alias" placeholder="权限简称" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="权限图标" prop="icon">
                <el-input v-model.trim="form.icon" placeholder="权限图标" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
          <el-form-item label="权限路由" prop="path">
            <el-input v-model.trim="form.path" placeholder="权限路由" clearable :style="{width:'458px'}"></el-input>
          </el-form-item>
          <el-form-item label="父级权限" prop="pid">
            <el-select v-model="form.pid" clearable filterable remote placeholder="请输入关键字" :remote-method="accessRemoteQuery" :loading="accessOpt.loading" :style="{width: '458px'}">
              <el-option v-for="item in accessOpt.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
import md5 from "md5";

export default {
  name: "User",
  mixins: [dataMixin, methodsMixin],
  data() {
    return {
      queryParams: {
        status: "",
        keys: ""
      },
      dialogOpt: {
        title: "添加权限",
        visible: false,
        oper: 0 // 1-> 添加 2-> 编辑
      },
      accessOpt: {
        loading: false,
        list: []
      },
      form: {
        name: "",
        path: "",
        alias: "",
        icon: "el-icon-menu",
        pid: ""
      },
      rules: {
        name: [
          { required: true, message: "权限名称不能为空!", trigger: "blur" }
        ],
        path: [
          { required: true, message: "权限路由不能为空!", trigger: "blur" }
        ],
        alias: [
          { required: true, message: "权限简称不能为空!", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.updateTable();
  },
  methods: {
    query() {
      this.updateTable();
    },
    reset() {
      this.queryParams.status = this.queryParams.keys = "";
      this.updateTable();
    },
    add() {
      this.dialogOpt.title = "添加权限";
      this.dialogOpt.visible = true;
      this.dialogOpt.oper = 1;
    },
    async edit(row) {
      try {
        let res = await this.$xhr.get(`/access/${row.id}`);
        this.form = {
          name: res.data.name,
          path: res.data.path,
          alias: res.data.alias,
          icon: res.data.icon,
          pid: res.data.pid || ""
        };
        if (res.data.parent) {
          this.accessOpt.list.push({
            label: res.data.parent.name,
            value: res.data.parent.id
          });
        }
        this.dialogOpt.visible = true;
        this.dialogOpt.oper = 2;
        this.dialogOpt.title = "编辑权限";
        this.dialogOpt.row = row;
      } catch (error) {
        this.$message.error(error.msg);
      }
    },
    disable(row) {
      this.$xhr
        .put(`/access/${row.id}`, { status: 0 })
        .then(res => {
          this.$message.success(res.msg);
          this.updateTable();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    enable(row) {
      this.$xhr
        .put(`/access/${row.id}`, { status: 1 })
        .then(res => {
          this.$message.success(res.msg);
          this.updateTable();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    accessRemoteQuery(query) {
      if (query !== "") {
        this.accessOpt.loading = true;
        this.$xhr
          .get("/access", { params: { status: 1, keys: query } })
          .then(res => {
            this.accessOpt.loading = false;
            this.accessOpt.list = res.data.map(item => {
              return {
                label: `${item.name} - ${item.alias} - ${item.path}`,
                value: item.id
              };
            });
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    },
    // 重置表单项
    resetFields(formName) {
      this.$refs[formName].clearValidate();
      this.form = {
        name: "",
        desc: "",
        status: "1"
      };
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
              .post(`/access`, {
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
              .put(`/access/${this.dialogOpt.row.id}`, {
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
    updateTable() {
      this.tableOptions.loading = true;
      this.$xhr
        .get("/access", {
          params: {
            p: this.pageOptions.currentPage,
            p_size: this.pageOptions.pageSize,
            status: this.queryParams.status,
            keys: this.queryParams.keys
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
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tree {
  height: 240px;
  overflow: auto;
}
</style>
