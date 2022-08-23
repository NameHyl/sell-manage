<template>
  <div class="card">
    <i
      :style="{ color: data.iconColor }"
      class="icon iconfont"
      :class="data.icon"
    ></i>
    <div class="info">
      <p class="title">{{ data.title }}</p>
      <p class="num">{{ data.num }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  width: 100%;
  height: 80px;
  box-shadow: 1px 1px 4px #ccc;
  background-color: #fff;

  &:not(:last-child) {
    margin-right: 20px;
  }
  .icon,
  .info {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    font-size: 40px;
    color: orange;
  }
  .info {
    flex-direction: column;
    .title {
      color: #666;
      margin-bottom: 5px;
    }
    .num {
      color: #333;
    }
  }

  @media screen and (max-width: 1000px) {
    // 这里的样式 在屏幕宽度小于1000px 就生效
    .icon {
      flex: 1;
    }
    .info {
      flex: 2;
    }
  }
}
</style>