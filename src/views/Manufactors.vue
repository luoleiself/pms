<template>
  <div>
    <div class="query_box">
      <el-select v-model="queryParams.status" clearable placeholder="供应商状态">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-input placeholder="请输入关键字" v-model="queryParams.keys" @keyup.enter.native="query" clearable></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
    <div class="menu_box">
      <el-button type="primary" @click="add">添加供应商</el-button>
    </div>
    <template>
      <el-table :data="tableOptions.tableData" :height="tableOptions.tableHeight" stripe border style="width: 100%" v-loading="tableOptions.loading" @selection-change="tblSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="desc" label="供应商描述" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="contact" label="联系人" align="center"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="fax" label="传真" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
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
          <el-form-item label="供应商名称" prop="name">
            <el-input v-model.trim="form.name" placeholder="供应商名称" clearable :disabled="dialogOpt.formDisable"></el-input>
          </el-form-item>
          <el-form-item label="供应商描述" prop="desc">
            <el-input v-model.trim="form.desc" placeholder="供应商描述" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model.trim="form.address" placeholder="地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model.trim="form.contact" placeholder="联系人" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model.trim="form.telephone" placeholder="联系电话" clearable></el-input>
          </el-form-item>
          <el-form-item label="传真" prop="fax">
            <el-input v-model.trim="form.fax" placeholder="传真" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="form.email" placeholder="邮箱" clearable></el-input>
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
  name: "Manufactors",
  mixins: [dataMixin, methodsMixin],
  data() {
    return {
      queryParams: {
        status: "",
        keys: ""
      },
      dialogOpt: {
        title: "添加供应商",
        visible: false,
        formDisable: false,
        oper: 0 // 1 -> 添加 2-> 编辑
      },
      form: {
        name: "",
        desc: "",
        address: "",
        contact: "",
        telephone: "",
        fax: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "供应商名称不能为空!", trigger: "blur" }
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
      this.dialogOpt.visible = true;
      this.dialogOpt.title = "添加供应商";
      this.dialogOpt.oper = 1;
      this.dialogOpt.formDisable = false;
    },
    async edit(row) {
      try {
        let res = await this.$xhr.get(`/manufactors/${row.id}`);
        this.dialogOpt.visible = true;
        this.dialogOpt.formDisable = true;
        this.dialogOpt.oper = 2;
        this.dialogOpt.title = "编辑供应商";
        this.dialogOpt.row = row;
        this.form.name = res.data.name;
        this.form.desc = res.data.desc;
        this.form.address = res.data.address;
        this.form.contact = res.data.contact;
        this.form.telephone = res.data.telephone;
        this.form.fax = res.data.fax;
        this.form.email = res.data.email;
      } catch (error) {
        this.$message.error(error.msg);
      }
    },
    disable(row) {
      this.$xhr
        .put(`/manufactors/${row.id}`, { status: 0 })
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
        .put(`/manufactors/${row.id}`, { status: 1 })
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
      this.form.name = this.form.desc = this.form.address = this.form.contact = this.form.telephone = this.form.fax = this.form.email =
        "";
      this.$refs[formName].clearValidate();
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
              .post(`/manufactors`, {
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
              .put(`/manufactors/${this.dialogOpt.row.id}`, {
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
    // 更新表格方法
    updateTable() {
      this.tableOptions.loading = true;
      this.$xhr
        .get("/manufactors", {
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
</style>
