<template>
  <panel title="修改密码">
    <el-form
      :rules="rules"
      :model="passwordModifyForm"
      class="password-modify"
      label-width="100px"
      size="small"
      ref="passwordModifyForm"
    >
      <!-- 原密码 -->
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="passwordModifyForm.oldPassword"></el-input>
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordModifyForm.newPassword"></el-input>
      </el-form-item>

      <!-- 确认新密码 -->
      <el-form-item label="确认新密码" prop="passwordAgain">
        <el-input v-model="passwordModifyForm.passwordAgain"></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <template>
          <el-button type="primary">确认</el-button>
          <el-button>重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

// 引入工具函数
import { isPassword } from "@/utils/tools";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    // 验证旧密码
    const checkOldPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入原密码"));
      } else {
        // 发送ajax给后端 把 value 发送给后端 让后端看一看value是不是当前账号的密码 等待后端返回 才能判断
        callback();
      }
    };

    // 验证新密码
    const checkNewPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value === this.passwordModifyForm.oldPassword) {
        callback(new Error("不能和原密码相同"));
      } else if (!isPassword(value)) {
        callback(new Error("6 ~ 12位,数字/字母/下划线/-"));
      } else {
        if (this.passwordModifyForm.passwordAgain !== "") {
          // 触发这个字段的验证
          this.$refs.passwordModifyForm.validateField("passwordAgain");
        }
        callback();
      }
    };

    // 验证确认新密码
    const checkPassAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordModifyForm.newPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 账号添加表单
      passwordModifyForm: {
        oldPassword: "",
        newPassword: "",
        passwordAgain: "",
      },
      // 验证规则对象
      rules: {
        // 原密码
        oldPassword: {
          required: true,
          validator: checkOldPass,
          trigger: "blur",
        },
        // 新密码
        newPassword: {
          required: true,
          validator: checkNewPass,
          trigger: "blur",
        },
        // 确认新密码
        passwordAgain: {
          required: true,
          validator: checkPassAgain,
          trigger: "blur",
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>
.password-modify {
  /deep/ .el-input__inner {
    width: 194px;
  }
}
</style>