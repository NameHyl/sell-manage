<template>
  <el-card>
    <!-- 标题 -->
    <div slot="header">
      <span>{{ title }}</span>
      <slot name="btn"></slot>
    </div>

    <!-- 内容 -->
    <div class="panel-content">
      <!-- 预留插槽  -->
      <slot></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  // 接收外部参数
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.el-card__header {
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>