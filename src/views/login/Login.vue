<template>
  <div class="login-container">
    <div class="form-container">
      <!-- 标题 -->
      <h3 class="title">系统登录</h3>
      <!-- 登录表单 -->
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
// 引入组件
import LoginForm from "./LoginForm.vue";

export default {
  // 注册
  components: {
    LoginForm,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/imgs/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .form-container {
    width: 360px;
    height: 260px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    .title {
      margin-top: 20px;
      margin-bottom: 20px;
      letter-spacing: 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>