<template>
  <div class="home">
    <div class="card-container">
      <card v-for="item in cardData" :key="item.id" :data="item"></card>
    </div>

    <!-- 使用echarts组件 -->
    <line-chart
      title="数据统计"
      :lengend="['订单', '销售额']"
      :options="options"
    ></line-chart>
  </div>
</template>

<script>
// 引入组件
import Card from "./Card.vue";
import LineChart from "@/components/charts/LineChart.vue";
// 引入ajax
import { getHomeData } from "@/api/order";

export default {
  // 注册组件
  components: {
    Card,
    LineChart,
  },
  // 数据
  data() {
    return {
      cardData: [
        {
          id: 1,
          iconColor: "orange",
          icon: "icon-order1",
          title: "总订单",
          num: 10666,
        },
        {
          id: 2,
          iconColor: "deeppink",
          icon: "icon-money",
          title: "总销售额",
          num: 25687,
        },
        {
          id: 3,
          iconColor: "yellow",
          icon: "icon-order2",
          title: "今日订单数",
          num: 78954,
        },
        {
          id: 4,
          iconColor: "gold",
          icon: "icon-money1",
          title: "今日销售额",
          num: 784257,
        },
      ],
      // xData: ["10-1", "10-2", "10-3", "10-4", "10-5"],
      // xData: [],
      // yData: [
      //   [15, 25, 31, 46, 17],
      //   [50, 40, 30, 20, 10],
      // ],
      // yData: [],
      options: {
        xData: [],
        yData: [],
      },
      flag: false,
    };
  },
  // 方法
  methods: {},
  async created() {
    // 发送 ****************** ajax   异步的 !!!!!!!!!!!!!!!!!!!!!!!!!!
    let { data } = await getHomeData();

    // 获取数据
    this.options = {
      xData: data.xData,
      yData: [data.orderData, data.amountData],
    };

    // this.flag = true; // 等于true  子组件就会渲染 才会执行子组件生命周期的方法
  },

  // 生命周期
  mounted() {},
};
</script>

<style lang="less" scoped>
.home {
  .card-container {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 800px) {
    // 这里的样式 在屏幕宽度小于800px 就生效
    .card-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .card-container .card {
      width: 45%;
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
}
</style>