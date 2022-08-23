<template>
  <div class="right-main">
    <!-- 右侧头部 -->
    <right-header></right-header>

    <!-- 下 -->
    <div class="right-content">
      <!-- 路由出口 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 引入组件
import RightHeader from "./RightHeader.vue";

export default {
  // 注册
  components: {
    RightHeader,
  },
};
</script>

<style lang="less" scoped>
.right-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f0f2f5;
  .right-content {
    flex: 1;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>