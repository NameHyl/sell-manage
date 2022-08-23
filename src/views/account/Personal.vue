<template>
  <panel title="个人中心">
    <p>
      管理员ID: <span>{{ user.id }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      账号: <span>{{ user.account }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      用户组: <span>{{ user.userGroup }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      创建时间: <span>{{ user.ctime }}</span>
    </p>
    <el-divider></el-divider>
    <p>头像: <span></span></p>
    <el-divider></el-divider>

    <!-- 上传组件 -->
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:5000/users/avatar_upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.imgUrl" :src="API + user.imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-button @click="handleEdit" size="small" type="primary"
      >修改头像</el-button
    >
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

// 引入local
import local from "@/utils/local";

// 引入ajax
import { editAvatar } from "@/api/user";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      API: "http://127.0.0.1:5000",
      user: {},
    };
  },
  // 方法
  methods: {
    // 上传成功 文件上传成功时的钩子
    handleAvatarSuccess(res) {
      let { code, imgUrl, msg } = res;

      // 上传成功提示
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg,
        });
        // 回填
        this.user.imgUrl = imgUrl;
      }
    },
    // 上传之前 上传文件之前的钩子
    beforeAvatarUpload(file) {
      console.log("file", file);
      const isJPG = file.type === "image/jpeg";
      const isLt500KB = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error("头像只能是jpg格式");
      }

      if (!isLt500KB) {
        this.$message.error("图片大小不能大于500kb");
      }

      return isJPG && isLt500KB;
    },

    // 修改头像
    async handleEdit() {
      let res = await editAvatar(this.user.imgUrl.substr(21));
      if (res.data.code === 0) {
        // 告诉头部 重新拉一下新数据 重新渲染头像
        this.$bus.$emit("update");
      }
    },
  },

  created() {
    // 取数据
    this.user = local.get("user");
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: red;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>