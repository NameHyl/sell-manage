<template>
  <div class="left-menu">
    <el-menu
      :default-active="curActive"
      unique-opened
      background-color="#1f3445"
      text-color="#ffffff"
      router
    >
      <template v-for="menu in menus">
        <!-- 后台首页 -->
        <el-menu-item
          v-if="
            (menu.children && menu.children.length === 1) ||
            menu.path === '/order'
          "
          :index="menu.path"
          :key="menu.path"
        >
          <i class="iconfont" :class="menu.meta.icon"></i>
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>

        <!-- 销售统计 -->
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="iconfont" :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
          </template>

          <el-menu-item
            v-for="child in menu.children"
            :key="child.path"
            :index="child.meta.path"
            >{{ child.meta.title }}</el-menu-item
          >
        </el-submenu>
      </template>
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
      let path = this.$route.path;

      if (path === "/home") {
        return "/";
      }

      if (path === "/order/order-edit" || path === "/order/order-list") {
        return "/order";
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