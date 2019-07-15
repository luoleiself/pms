<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import md5 from "md5";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.password = md5(this.ruleForm.password);
          this.$xhr
            .post("/login", {
              ...this.ruleForm
            })
            .then(res => {
              if (res.code == 10200) {
                console.log(res);
                this.$router.push({ path: "/home" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        return false;
      });
    }
  }
};
</script>
<style lang="sass" scoped>

</style>
