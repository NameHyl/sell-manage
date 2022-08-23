<template>
  <panel title="订单编辑">
    <div slot="btn" class="btn">
      <el-button @click="back" type="success" size="small">返回</el-button>
      <el-button type="primary" size="small">保存</el-button>
    </div>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";
// 引入local
import local from "@/utils/local";

export default {
  // 注册
  components: {
    Panel,
  },
  // 生命周期
  created() {
    // let orderInfo = local.get("orderInfo");
    // console.log(orderInfo);

    // console.log(this.$route.params); // a组件传递过来的数据
    console.log(this.$route.query);
  },
  methods: {
    // 返回
    back() {
      this.$router.back(); // 返回
    },
  },
};
</script>

<style lang="less" scoped>
</style>