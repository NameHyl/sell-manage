<template>
  <div class="left-menu">
    <el-menu
      :default-active="curActive"
      unique-opened
      background-color="#1f3445"
      text-color="#ffffff"
      router
    >
      <!-- 后台首页 -->
      <el-menu-item index="/home">
        <i class="iconfont icon-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 订单管理 -->
      <el-menu-item index="/order/order-list">
        <i class="iconfont icon-order1"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <!-- 商品管理 -->
      <el-submenu index="xx">
        <template slot="title">
          <i class="iconfont icon-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
        <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
        <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
      </el-submenu>

      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="iconfont icon-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <!-- 账号管理 -->
      <el-submenu index="yy">
        <template slot="title">
          <i class="iconfont icon-user"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/account-list">账号列表</el-menu-item>
        <el-menu-item index="/account/account-add">账号添加</el-menu-item>
        <el-menu-item index="/account/password-modify">修改密码</el-menu-item>
        <el-menu-item index="/account/personal">个人中心</el-menu-item>
      </el-submenu>

      <!-- 销售统计 -->
      <el-submenu index="6">
        <template slot="title">
          <i class="iconfont icon-sum"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/total/goods-total">商品统计</el-menu-item>
        <el-menu-item index="/total/order-total">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// 引入local
import local from "@/utils/local";

export default {
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.menus = local.get("menus");
    console.log(this.menus);
  },
  computed: {
    // 当前激活
    curActive() {
      if (this.$route.path === "/order/order-edit") {
        return "/order/order-list";
      }
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.left-menu {
  width: 200px;
  background-color: #1f3445;
  // overflow-y: scroll;
  // overflow-x: hidden;
  .el-menu {
    border-right: 0px;
    .iconfont {
      margin-right: 10px;
      color: #fff;
    }
    /deep/.el-menu {
      .el-menu-item {
        background-color: #1f3445 !important;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      }
    }
  }
}
</style>