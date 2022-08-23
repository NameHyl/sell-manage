<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadcrumbArr"
            :key="item.title"
            :to="item.path"
          >
            {{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="right-info">
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link">
            欢迎你, {{ userName
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-avatar :size="50" :src="imgurl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入local
import local from "@/utils/local";
// 引入ajax函数
import { getInfo } from "@/api/user";

export default {
  data() {
    return {
      imgurl: "",
      userName: "",
      API: "http://127.0.0.1:5000",
      // 面包屑数组
      breadcrumbArr: [
        // { path: "/", title: "首页" },
        // { path: "/goods", title: "商品管理" },
        // { path: "/goods/goods-cate", title: "商品分类" },
      ],
    };
  },
  methods: {
    // 点击事件
    handleClick(command) {
      if (command === "personal") {
        this.$router.push("/account/personal"); // 跳转到个人中心
      } else if (command === "logout") {
        // 清空本地数据
        local.clear();

        // 弹出提示
        this.$message({
          type: "success",
          message: "哥,下次再来",
        });

        // 跳转到登录
        this.$router.push("/login");

        // 刷新页面
        window.location.reload();
      }
    },
    // 获取数据
    async getData() {
      try {
        let res = await getInfo(); // 发送ajax 获取个人信息
        let { account, imgUrl } = res.data;

        // 存入本地
        local.set("user", res.data);

        // 渲染
        this.userName = account;
        this.imgurl = this.API + imgUrl;
      } catch (err) {
        console.log(err);
      }
    },
    // 计算面包屑
    calcBreadcrumb() {
      let temp = [{ title: "首页", path: "/" }];

      this.$route.matched.forEach((item) => {
        if (item.meta.title && item.meta.path) {
          temp.push(item.meta);
        }
      });

      // 赋值给面包屑动态渲染
      this.breadcrumbArr = temp;
    },
  },
  created() {
    // 调用计算面包屑函数
    this.calcBreadcrumb();

    this.getData(); // 进入页面 就调用 获取个人信息数据
    // 接收 等待个人中心通知
    this.$bus.$on("update", () => {
      this.getData(); // 重新获取新数据
    });
  },
  // 侦听器
  watch: {
    "$route.path": function () {
      // 如果变化了 就走这里 调用我
      this.calcBreadcrumb();
    },
  },
};
</script>

<style lang="less" scoped>
.right-header {
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  box-shadow: 1px 1px 4px #ccc;
  background-color: #fff;
  .el-col-12 {
    height: 60px;
    .el-breadcrumb {
      height: 60px;
      line-height: 60px;
    }
  }
  .right-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-avatar {
      margin-left: 10px;
    }
  }
}
</style>
