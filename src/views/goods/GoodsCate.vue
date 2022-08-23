<template>
  <panel title="商品分类">
    <el-button slot="btn" type="primary" size="small">添加分类</el-button>

    <!-- 表格 -->
    <el-table :data="tableData">
      <!-- 序号 -->
      <el-table-column label="序号" type="index"></el-table-column>
      <!-- 分类名称 -->
      <el-table-column label="分类名称">
        <template slot-scope="scope">
          <span v-if="!scope.row.canEdit">{{ scope.row.cateName }}</span>
          <el-input v-else size="mini" v-model="scope.row.cateName"></el-input>
        </template>
      </el-table-column>
      <!-- 是否启用 -->
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.canEdit"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#cccccc"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            :type="scope.row.canEdit ? 'success' : 'default'"
            size="small"
          >
            {{ scope.row.canEdit ? "完成" : "编辑" }}
          </el-button>

          <el-button
            v-premission="'super,admin,manage'"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      background
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";
// 引入ajax函数
import { getCateList, editCate } from "@/api/goods";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      // 表格数据
      tableData: [],
      total: 100,
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods: {
    // 获取数据
    async getData() {
      try {
        let res = await getCateList({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        });

        let { total, data } = res.data;

        // 处理格式
        data.forEach((item) => {
          item.state = item.state === 1 ? true : false;
          item.canEdit = false; // 每一条数据 都添加是否可编辑字段 初始值是false  不能编辑
        });

        // 渲染
        this.total = total;
        this.tableData = data;
      } catch (err) {
        console.log(err);
      }
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 编辑
    async handleEdit(row) {
      row.canEdit = !row.canEdit;

      // 如果点击的是完成
      if (!row.canEdit) {
        // 发送ajax 修改分类
        try {
          await editCate({
            id: row.id,
            cateName: row.cateName,
            state: row.state,
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>