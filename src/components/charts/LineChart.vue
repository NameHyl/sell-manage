<template>
  <div id="echartBox" class="echart-box"></div>
</template>

<script>
// 引入echarts的方法 init
import { init } from "echarts";

export default {
  // 外部参数
  props: {
    // 标题
    title: {
      type: String,
    },
    // 图例
    lengend: {
      type: Array,
    },
    // // x轴数据
    // xData: {
    //   type: Array,
    // },
    // // y轴数据
    // yData: {
    //   type: Array,
    // },
    options: {
      type: Object,
    },
  },

  methods: {
    // 画线
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = init(document.getElementById("echartBox"));

      // 指定图表的配置项和数据
      let option = {
        title: {
          left: 10,
          top: 10,
          text: this.title, // 标题
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          top: 10,
          data: this.lengend, // 图例
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        // 工具盒子
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {},
            magicType: {
              type: ["line", "bar"],
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.options.xData, // x轴数据
        },
        yAxis: {
          type: "value",
        },
        // y轴数据
        series: [
          {
            name: "订单",
            type: "line",
            data: this.options.yData[0],
          },
          {
            name: "销售额",
            type: "line",
            data: this.options.yData[1],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    // 窗口大小改变
    handleResize() {
      this.myChart.resize(); // 只要窗口大小改变 echarts跟着容器变化
    },
  },

  mounted() {
    this.drawLine();

    // 监听窗口大小改变
    window.addEventListener("resize", this.handleResize);
  },

  watch: {
    options: {
      deep: true, // 开启深度监听
      handler(newValue, oldValue) {
        // 观察到数据变化 重新渲染
        this.myChart.clear(); // 清除画布
        this.drawLine(); // 重新绘制
      },
    },
  },

  // 销毁前
  beforeDestroy() {
    // 解绑事件 [性能优化]
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="less" scoped>
.echart-box {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  background-color: #fff;
}
</style>