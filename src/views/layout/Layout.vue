<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <left-menu></left-menu>

    <!-- 右侧主体 -->
    <right-main></right-main>
  </div>
</template>

<script>
// 引入组件
import LeftMenu from "./LeftMenu.vue";
import RightMain from "./RightMain.vue";

export default {
  // 注册
  components: {
    LeftMenu,
    RightMain,
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
}
</style>