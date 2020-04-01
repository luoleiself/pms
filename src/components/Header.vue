<template>
  <div class="header_wrap">
    <el-row :gutter="24">
      <el-col :span="20">
        <ul>
          <li>
            <img :src="img" alt="" :style="{height: '24px', 'vertical-align': 'middle'}">
          </li>
          <li class="title">
            商品信息管理系统
          </li>
        </ul>
      </el-col>
      <el-col :span="4">
        <div class='user_center_box'>
          <el-dropdown @command="handleCommand" trigger="hover">
            <span class="el-dropdown-link" :style="{'color':'#fff'}">
              <span>{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="config">设置</el-dropdown-item>
              <el-dropdown-item command="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      img: require("@/assets/images/logo.png")
    };
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      user_id: state => state.user.id,
      user_name: state => state.user.username
    })
  },
  methods: {
    ...mapActions(["USER_LOGOUT"]),
    handleCommand(command) {
      if (command == "quit") {
        this.$xhr
          .delete("/login", { id: this.user_id, username: this.user_name })
          .then(res => {
            this.$message.success(res.msg);
            window.sessionStorage.removeItem("token");
            this.USER_LOGOUT({});
            setTimeout(() => {
              this.$router.push({ name: "login" });
            }, 300);
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header_wrap {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(84, 92, 100);
  overflow: hidden;
  ul {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    font-size: 20px;
    color: #fff;
    li {
      padding: 0 20px;
      cursor: pointer;
      &.active {
        color: red;
      }
    }
  }
  .user_center_box {
    height: 50px;
    padding: 0 15px 0 0;
    text-align: right;
  }
  img {
    max-height: 100%;
  }
  .title {
    padding: 0;
  }
}
</style>