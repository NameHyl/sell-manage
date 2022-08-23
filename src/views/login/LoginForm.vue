<template>
  <!-- 表单 -->
  <el-form
    :model="loginForm"
    :rules="rules"
    size="small"
    ref="loginForm"
    class="login-form"
  >
    <!-- 账号 -->
    <el-form-item prop="account">
      <el-input
        prefix-icon="iconfont icon-user"
        v-model="loginForm.account"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        prefix-icon="iconfont icon-lock"
        :type="type"
        v-model="loginForm.password"
        autocomplete="off"
      >
        <i
          @click="changeType"
          :class="type === 'text' ? 'icon-eyeopen' : 'icon-eyeclose'"
          slot="suffix"
          class="iconfont"
        ></i>
      </el-input>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入ajax函数
import { checkLogin } from "@/api/user";
// 引入local
import local from "@/utils/local";
// 引入计算动态路由方法
import { calcDynamicRoutes } from "@/router";

export default {
  data() {
    return {
      // 登录表单数据
      loginForm: {
        account: "",
        password: "",
      },
      // 验证规则对象
      rules: {
        // 账号字段
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        // 密码字段
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      type: "password", // 密码
    };
  },
  methods: {
    // 切换input的type类型
    changeType() {
      this.type === "password"
        ? (this.type = "text")
        : (this.type = "password");
    },
    // 登录
    handleLogin() {
      // 选中表单 调用validate 对整个表单进行校验的方法
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          try {
            // 直接调用发送登录请求的函数即可
            let res = await checkLogin(this.loginForm);
            let { code, role, token } = res.data;

            if (code === 0) {
              local.set("t_k", token); // 把令牌存入本地
              // 存入本地
              local.set("role", role);

              calcDynamicRoutes(); // 计算动态路由 ( 跳转到首页之前  角色存入本地之后)

              this.$router.push("/home"); // 跳转到首页
            }
          } catch (err) {
            this.$message.error(err.message);
          }
        } else {
          return;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-form {
  padding-right: 20px;
  padding-left: 20px;
  /deep/ .el-form-item__label {
    color: red;
  }
  /deep/ .el-input__inner {
    background-color: transparent;
    color: #fff;
    letter-spacing: 1px;
    &:focus {
      border-color: #568f71;
    }
  }

  .el-button--primary {
    width: 100%;
    background-image: linear-gradient(to bottom right, #534241, #8d9128);
    border-color: #fff;
  }
}
</style>
