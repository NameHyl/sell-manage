<template>
  <panel title="账号添加">
    <el-form
      :model="accountAddForm"
      :rules="rules"
      ref="accountAddForm"
      class="account-add"
      label-width="100px"
      size="small"
    >
      <!-- 账号 -->
      <el-form-item label="账号" prop="account">
        <el-input v-model="accountAddForm.account"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountAddForm.password"></el-input>
      </el-form-item>

      <!-- 用户组 -->
      <el-form-item label="用户组" prop="userGroup">
        <el-select v-model="accountAddForm.userGroup">
          <el-option value="普通管理员"></el-option>
          <el-option value="超级管理员"></el-option>
        </el-select>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <template>
          <el-button @click="handleAddAccount" type="primary">添加</el-button>
          <el-button @click="reset">重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

// 引入检测账号的函数
import { isAccount, isPassword } from "@/utils/tools";

// 引入ajax函数
import { addAccount } from "@/api/user";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    // 验证账号
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else if (!isAccount(value)) {
        callback(new Error("3 ~ 12 位,数字/字母/中文"));
      } else {
        callback();
      }
    };

    // 验证密码
    const checkPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else if (!isPassword(value)) {
        callback(new Error("6 ~ 12 位,字母/数字/下划线/-"));
      } else {
        callback();
      }
    };

    return {
      // 账号添加表单
      accountAddForm: {
        account: "",
        password: "",
        userGroup: "",
      },
      // 验证规则
      rules: {
        // account: [{ required: true, message: "账号不能为空", trigger: "blur" }],  内置验证

        account: { required: true, validator: checkAccount, trigger: "blur" },
        password: { required: true, validator: checkPass, trigger: "blur" },
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change",
        },
      },
    };
  },
  // 方法
  methods: {
    // 添加账号
    handleAddAccount() {
      // 调用所有表单验证
      this.$refs.accountAddForm.validate(async (valid) => {
        if (valid) {
          // 发送添加账号的ajax
          try {
            let res = await addAccount(this.accountAddForm);

            if (res.data.code === 0) {
              this.$router.push("/account/account-list");
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          return;
        }
      });
    },
    // 重置
    reset() {
      this.$refs.accountAddForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.account-add {
  /deep/ .el-input__inner {
    width: 194px;
  }
}
</style>