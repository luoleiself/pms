<template>
  <div class="login_box">
    <div class="login_dialog">
      <p class="login_dialog_title">
        <img src="../assets/images/logo.png" alt="">
        <span>商品信息管理系统</span>
      </p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" clearable :style="{width: '280px'}"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import md5 from "md5";
import { Debounce, Throttle } from "@/assets/js/utils";
import { mapActions } from "vuex";

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
  mounted() {
    let self = this;
    window.addEventListener("keydown", function(evt) {
      let keyCode = evt.keyCode;
      if (keyCode == 13) {
        self.login();
      }
    });
  },
  methods: {
    ...mapActions(["USER_LOGIN"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        }
        return false;
      });
    },
    login: Debounce(function() {
      let { username, password } = this.ruleForm;
      password = md5(password);
      this.$xhr
        .post("/login", {
          username,
          password
        })
        .then(res => {
          window.sessionStorage.setItem("user", JSON.stringify(res.data));
          window.sessionStorage.setItem("token", res.token);
          this.USER_LOGIN(res.data);
          this.$router.push({ path: "/home" });
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }, 300)
  }
};
</script>
<style lang="scss" scoped>
.login_box {
  width: 100%;
  height: 100%;
  background: url("../assets/images/bg.png") center center no-repeat;
  background-size: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.login_dialog {
  padding: 24px;
  width: 400px;
  max-height: 466px;
  background: #fff;
  text-align: center;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.login_dialog_title {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 20px;
  img {
    display: inline-block;
    vertical-align: middle;
    max-width: 50px;
    max-height: 50px;
    margin-right: 20px;
  }
  span {
    font-size: 18px;
    color: #009944;
  }
}
</style>
