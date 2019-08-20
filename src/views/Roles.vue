<template>
  <div>
    <div class="query_box">
      <el-select v-model="queryParams.status" clearable placeholder="角色状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-input placeholder="请输入角色名称关键字" v-model="queryParams.keys" @keyup.enter.native="query" clearable></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="menu_box">
      <el-button type="primary" @click="add">添加角色</el-button>
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="desc" label="角色描述" align="center"></el-table-column>
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
        <el-table-column prop="" label="配置权限" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="setting(scope.row)">设置权限</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :title="dialogOpt.title" :visible.sync="dialogOpt.visible" :close-on-click-modal='false' :close-on-press-escape='false' :before-close="beforeClose" top="18vh" width="400px">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="角色名称" clearable :disabled="dialogOpt.formDisable"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input v-model.trim="form.desc" placeholder="角色描述" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio v-model="form.status" label="1">启用</el-radio>
            <el-radio v-model="form.status" label="0">禁用</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitFormCancel('form')">取 消</el-button>
        <el-button type="primary" @click="submitFormConfirm('form')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加和编辑弹框 -->
    <el-dialog :title="dialogOpt2.title" :visible.sync="dialogOpt2.visible" :close-on-click-modal='false' :close-on-press-escape='false' :before-close="beforeClose2" top="18vh" width="400px">
      <div>
        <p style="margin-bottom:10px">角色名称：{{dialogOpt2.row.name}}</p>
        <el-tree :data="tree" :default-checked-keys="defaultCheckedKeys" :props="props" node-key="id" ref="tree" show-checkbox default-expand-all highlight-current>
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitFormCancel2('form')">取 消</el-button>
        <el-button type="primary" @click="submitFormConfirm2('form')">确 定</el-button>
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
        title: "添加角色",
        visible: false,
        formDisable: false,
        oper: 0 // 1-> 添加 2-> 编辑
      },
      dialogOpt2: {
        title: "配置权限",
        visible: false,
        row: ""
      },
      form: {
        name: "",
        desc: "",
        status: "1"
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空!", trigger: "blur" }
        ]
      },
      tree: [],
      defaultCheckedKeys: [],
      props: { label: "name" }
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
      this.dialogOpt.title = "添加角色";
      this.dialogOpt.visible = true;
      this.dialogOpt.oper = 1;
      this.dialogOpt.formDisable = false;
    },
    async edit(row) {
      try {
        let res = await this.$xhr.get(`/roles/${row.id}`);
        this.form = {
          name: res.data.name,
          desc: res.data.desc,
          status: res.data.status ? "1" : "0"
        };
        this.dialogOpt.visible = true;
        this.dialogOpt.formDisable = true;
        this.dialogOpt.oper = 2;
        this.dialogOpt.title = "编辑角色";
        this.dialogOpt.row = row;
      } catch (error) {
        this.$message.error(error.msg);
      }
    },
    disable(row) {
      this.$xhr
        .put(`/roles/${row.id}`, { status: 0 })
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
        .put(`/roles/${row.id}`, { status: 1 })
        .then(res => {
          this.$message.success(res.msg);
          this.updateTable();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    async setting(row) {
      this.dialogOpt2.row = row;
      this.dialogOpt2.visible = true;
      let { data: role } = await this.$xhr.get(`/roles/${row.id}`);
      let { data: access } = await this.$xhr.get(`/access/tree/0`);
      let checkedIds = role.accesses.map((item, index, arr) => {
        if (arr.findIndex(val => val.pid == item.id) == -1) {
          return item.id;
        }
      });
      this.tree = access;
      this.defaultCheckedKeys = checkedIds;
    },
    beforeClose2(done) {
      done();
    },
    submitFormCancel2(formName) {
      this.dialogOpt2.visible = false;
    },
    submitFormConfirm2(formName) {
      // let checkedIds = this.$refs.tree.getCheckedKeys(true);
      let checkedIds = [
        ...new Set([
          ...this.$refs.tree.getCheckedKeys(),
          ...this.$refs.tree.getHalfCheckedKeys()
        ])
      ];
      this.$xhr
        .put(`/roles/${this.dialogOpt2.row.id}`, {
          access_id: checkedIds
        })
        .then(res => {
          this.dialogOpt2.visible = false;
          this.$message.success(res.msg);
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
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
              .post(`/roles`, {
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
              .put(`/roles/${this.dialogOpt.row.id}`, {
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
        .get("/roles", {
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
