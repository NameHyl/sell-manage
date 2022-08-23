<template>
  <panel title="订单列表">
    <!-- 搜索表单 -->
    <el-form size="small" inline :model="searchForm">
      <el-form-item label="订单号">
        <el-input v-model="searchForm.orderNo"></el-input>
      </el-form-item>

      <el-form-item label="收货人">
        <el-input v-model="searchForm.consignee"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone"></el-input>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select v-model="searchForm.orderState">
          <el-option value="未受理"></el-option>
          <el-option value="已受理"></el-option>
          <el-option value="派送中"></el-option>
          <el-option value="已完成"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="下单时间">
        <el-date-picker
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="searchForm.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="search" type="primary">查询</el-button>
        <el-button type="success" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" border :style="{ width: w + 'px' }">
      <!-- 订单号 -->
      <el-table-column fixed prop="orderNo" label="订单号" width="150">
      </el-table-column>

      <!-- 下单时间 -->
      <el-table-column prop="orderTime" label="下单时间" width="120">
      </el-table-column>

      <!-- 手机号 -->
      <el-table-column prop="phone" label="手机号" width="120">
      </el-table-column>

      <!-- 收货人 -->
      <el-table-column prop="consignee" label="收货人" width="120">
      </el-table-column>

      <!-- 配送地址 -->
      <el-table-column prop="deliverAddress" label="配送地址" width="120">
      </el-table-column>

      <!-- 送达时间 -->
      <el-table-column prop="deliveryTime" label="送达时间" width="120">
      </el-table-column>

      <!-- 用户备注 -->
      <el-table-column prop="remarks" label="用户备注" width="120">
      </el-table-column>

      <!-- 订单金额 -->
      <el-table-column prop="orderAmount" label="订单金额" width="120">
      </el-table-column>

      <!-- 订单状态 -->
      <el-table-column prop="orderState" label="订单状态" width="120">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="showDetail(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="handleEdit(scope.row)" type="text" size="small">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :total="total"
      :page-sizes="[1, 3, 5, 10, 20, 50]"
      :page-size="pageSize"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";
// 引入ajax函数
import { getOrderList } from "@/api/order";
// 引入工具函数
import { normalizeDate } from "@/utils/tools";
// 引入local
import local from "@/utils/local";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      w: document.body.clientWidth - 280,
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      },
      tableData: [],
      currentPage: 1, // 当前页
      total: 0, // 总数据条数
      pageSize: 5, // 每页条数
    };
  },
  methods: {
    // 适配
    resize() {
      this.w = document.body.clientWidth - 280;
    },
    // 获取数据函数
    getData() {
      // 发送ajax 获取订单列表
      getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: JSON.stringify(this.searchForm.date),
      })
        .then((res) => {
          let { total, data } = res.data;

          // 处理格式
          data.forEach((item) => {
            item.orderTime = normalizeDate(item.orderTime);
            item.deliveryTime = normalizeDate(item.deliveryTime);
          });

          // 渲染
          this.total = total;
          this.tableData = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询
    search() {
      this.currentPage = 1;
      this.getData();
    },
    // 重置
    reset() {
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      };
      this.currentPage = 1;
      this.getData();
    },
    // 每页条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 查看详情
    showDetail(row) {
      console.log(row);
    },
    // 编辑
    handleEdit(row) {
      // console.log(row);
      // 把当前订单数据 存入本地
      // local.set("orderInfo", row);
      // this.$router.push("/order/order-edit"); // 跳转到订单编辑页面

      // this.$router.push({ name: "order-edit", params: row }); // 跳转到订单编辑页面

      // let o = {
      //   user: {
      //     name: "xxx",
      //     age: "yyy",
      //   },
      //   hobs: ["html", "强哥"],
      // };

      this.$router.push({ path: "/order/order-edit", query: { id: row.id } }); // 跳转到订单编辑页面
    },
  },
  created() {
    window.addEventListener("resize", this.resize);
    this.getData(); // 调用
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>