<template>
  <div>
    <div class="query_box">
      <el-select v-model="queryParams.status" clearable placeholder="用户状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-input placeholder="请输入用户名称关键字" v-model="queryParams.keys" @keyup.enter.native="query" clearable></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="menu_box">
      <el-button type="primary" @click="add">添加用户</el-button>
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="username" label="登陆用户名" align="center"></el-table-column>
        <el-table-column prop="" label="性别" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="角色" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.roles.map(item=>item.name).join(',')}}</span>
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
        <el-table-column prop="" label="重置登陆密码" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="resetPwd(scope.row)">重置密码</el-button>
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
    <el-dialog :title="dialogOpt.title" :visible.sync="dialogOpt.visible" :close-on-click-modal='false' :close-on-press-escape='false' :before-close="beforeClose" top="18vh" width="800px">
      <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="用户姓名" prop="name">
                <el-input v-model.trim="form.name" placeholder="用户姓名" clearable :disabled="dialogOpt.formDisable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="0">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="登陆用户名" prop="username">
                <el-input v-model.trim="form.username" placeholder="登陆用户名" clearable :disabled="dialogOpt.formDisable"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登陆密码" prop="password">
                <el-input v-model.trim="form.password" placeholder="登陆密码" clearable :disabled="dialogOpt.formDisable"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="部门" prop="department">
                <el-input v-model.trim="form.department" placeholder="部门" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="telephone">
                <el-input v-model.trim="form.telephone" placeholder="联系电话" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input v-model.trim="form.address" placeholder="地址" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色名称" prop="role_id">
                <el-select v-model="form.role_id" clearable multiple filterable placeholder="请输入关键字" :style="{width: '248px'}">
                  <el-option v-for="item in rolesOpt.list" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
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
    let checkUsername = (rule, val, callback) => {
      let regExp = /^[\w.]*$/i;
      if (val.search(regExp) == -1) {
        return callback(new Error("只能包含英文字母，数字，点，下划线字符!"));
      } else {
        callback();
      }
    };
    return {
      queryParams: {
        status: "",
        keys: ""
      },
      dialogOpt: {
        title: "添加用户",
        visible: false,
        formDisable: false,
        oper: 0 // 1-> 添加 2-> 编辑
      },
      form: {
        name: "",
        username: "",
        password: "",
        sex: "1",
        department: "",
        telephone: "",
        address: "",
        role_id: ""
      },
      rules: {
        name: [
          { required: true, message: "用户姓名不能为空!", trigger: "blur" }
        ],
        username: [
          { required: true, message: "登陆用户名不能为空!", trigger: "blur" },
          { validator: checkUsername, trigger: "blur" }
        ],
        password: [
          { required: true, message: "登陆密码不能为空!", trigger: "blur" }
        ]
      },
      rolesOpt: { list: [] }
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
      this.queryParams.status = this.queryParams.keys = "";
      this.updateTable();
    },
    add() {
      this.dialogOpt.title = "添加用户";
      this.dialogOpt.visible = true;
      this.dialogOpt.oper = 1;
      this.dialogOpt.formDisable = false;
    },
    async edit(row) {
      try {
        let res = await this.$xhr.get(`/users/${row.id}`);
        this.form = {
          name: res.data.name,
          username: res.data.username,
          password: res.data.password,
          sex: `${res.data.sex}`,
          department: res.data.department,
          telephone: res.data.telephone,
          address: res.data.address,
          role_id: res.data.roles.map(item => item.id)
        };
        this.dialogOpt.visible = true;
        this.dialogOpt.formDisable = true;
        this.dialogOpt.oper = 2;
        this.dialogOpt.title = "编辑用户";
        this.dialogOpt.row = row;
      } catch (error) {
        this.$message.error(error.msg);
      }
    },
    disable(row) {
      this.$xhr
        .put(`/users/${row.id}`, { status: 0 })
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
        .put(`/users/${row.id}`, { status: 1 })
        .then(res => {
          this.$message.success(res.msg);
          this.updateTable();
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    resetPwd(row) {
      this.$xhr
        .put(`/users/resetpwd/${row.id}`)
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
      this.form = {
        name: "",
        username: "",
        password: "",
        sex: "1",
        department: "",
        telephone: "",
        address: "",
        role_id: ""
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
            let { password } = this.form;
            password = md5(password);
            // 添加
            this.$xhr
              .post(`/users`, {
                ...this.form,
                password
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
              .put(`/users/${this.dialogOpt.row.id}`, {
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
        .get("/users", {
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
    },
    initData() {
      this.$xhr
        .get("/roles", { params: { status: 1 } })
        .then(res => {
          this.rolesOpt.list = res.data.map(item => ({
            label: `${item.name} - ${item.desc}`,
            value: item.id
          }));
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style lang="sass" scoped>
</style>
