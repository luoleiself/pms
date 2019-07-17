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
      },
      timer: null
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
    // login() {
    //   if (this.timer) {
    //     clearTimeout(this.timer);
    //   }
    //   this.timer = setTimeout(() => {
    //     let { username, password } = this.ruleForm;
    //     password = md5(password);
    //     this.$xhr
    //       .post("/login", {
    //         username,
    //         password
    //       })
    //       .then(res => {
    //         window.sessionStorage.setItem(
    //           "user",
    //           JSON.stringify({
    //             id: res.data.id,
    //             username: res.data.username,
    //             name: res.data.name
    //           })
    //         );
    //         window.sessionStorage.setItem("token", res.token);
    //         this.USER_LOGIN({
    //           id: res.data.id,
    //           username: res.data.username,
    //           name: res.data.name
    //         });
    //         this.$router.push({ path: "/home" });
    //       })
    //       .catch(err => {
    //         this.$message.error(err.msg);
    //       });
    //   }, 300);
    // }
    login: Debounce(function() {
      let { username, password } = this.ruleForm;
      password = md5(password);
      this.$xhr
        .post("/login", {
          username,
          password
        })
        .then(res => {
          window.sessionStorage.setItem(
            "user",
            JSON.stringify({
              id: res.data.id,
              username: res.data.username,
              name: res.data.name
            })
          );
          window.sessionStorage.setItem("token", res.token);
          this.USER_LOGIN({
            id: res.data.id,
            username: res.data.username,
            name: res.data.name
          });
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
</style>
