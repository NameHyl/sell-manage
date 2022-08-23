<template>
  <panel title="账号列表">
    <!-- 表格 -->
    <el-table
      @selection-change="handleSelectionChange"
      ref="accountTable"
      :data="tableData"
    >
      <!-- 选择框 -->
      <el-table-column type="selection" width="55"> </el-table-column>

      <!-- 账号 -->
      <el-table-column prop="account" label="账号"> </el-table-column>

      <!-- 用户组 -->
      <el-table-column prop="userGroup" label="用户组"> </el-table-column>

      <!-- 创建时间 -->
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.ctime | filterDate }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>

          <el-popconfirm
            @confirm="handleDelete(scope.row)"
            confirm-button-text="要的"
            cancel-button-text="不要"
            confirm-button-type="text"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗, 哥？"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
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

    <!-- 批量删除 & 取消选择 -->
    <div class="btns">
      <el-button @click="batchDelete" type="danger" size="small">
        批量删除
      </el-button>
      <el-button @click="cancelSelect" type="primary" size="small">
        取消选择
      </el-button>
    </div>

    <!-- 编辑弹出模态框 -->
    <el-dialog
      title="编辑账号"
      :visible.sync="dialogVisible"
      width="320px"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form :model="editFormData" size="small" label-width="60px">
        <el-form-item label="账号">
          <el-input v-model="editFormData.account" class="account"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="editFormData.userGroup">
            <el-option value="普通管理员"></el-option>
            <el-option value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>

        <el-button size="small" type="primary" @click="saveEdit">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

// 引入ajax函数
import {
  getAccountList,
  editAccount,
  deleteAccount,
  batchDel,
} from "@/api/user";

// 引入工具函数
import { normalizeDate } from "@/utils/tools";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      // 表格数据
      tableData: [
        // {
        //   id: 1,
        //   account: "小貂蝉",
        //   userGroup: "超级管理员",
        //   date: "xx-xx-xx1",
        // },
      ],
      currentPage: 1, // 当前页
      total: 0, // 总数据条数
      pageSize: 5, // 每页条数
      dialogVisible: false, // 模态框显示或隐藏
      // 编辑表单数据
      editFormData: {
        account: "",
        userGroup: "",
      },
    };
  },
  // 方法
  methods: {
    // 获取数据
    async getData() {
      try {
        // 发送ajax 获取账号列表
        let res = await getAccountList({
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        });

        // 取出数据总条数 和 当前页面的数据
        let { total, data } = res.data;

        // 处理
        // data.forEach((v) => {
        //   v.ctime = normalizeDate(v.ctime);
        // });

        // 判断
        if (!data.length && this.currentPage !== 1) {
          this.currentPage -= 1;
          this.getData();
        }

        // 渲染
        this.total = total;
        this.tableData = data;
      } catch (err) {
        console.log(err);
      }
    },

    // 保存修改
    async saveEdit() {
      try {
        let res = await editAccount(this.editFormData); // 发送修改ajax

        if (res.data.code === 0) {
          this.dialogVisible = false; // 关闭模态框
          this.getData(); // 重新获取数据
        }
      } catch (err) {
        console.log(err);
      }
    },

    // 编辑
    handleEdit({ account, userGroup, id }) {
      this.dialogVisible = true; // 显示编辑模态框

      // 回填
      this.editFormData.id = id;
      this.editFormData.account = account;
      this.editFormData.userGroup = userGroup;
    },
    // 删除
    async handleDelete(row) {
      try {
        let res = await deleteAccount(row.id);
        if (res.data.code === 0) {
          this.getData(); // 重新拉取数据 渲染
        }
      } catch (err) {
        console.log(err);
      }
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
    // 编辑模态框关闭之前
    handleClose(done) {
      this.$confirm("确定取消编辑?")
        .then(() => {
          done(); // 关闭
        })
        .catch(() => {});
    },
    // 取消选择
    cancelSelect() {
      this.$refs.accountTable.clearSelection();
    },
    // 选项发生改变
    handleSelectionChange(rows) {
      this.ids = rows.map((v) => v.id);
    },
    // 批量删除
    batchDelete() {
      // 判断 如果没有选
      if (!this.ids || !this.ids.length) {
        this.$message.error("哥,选了才能删,好吗?");
        return;
      }

      this.$confirm("批量删除不可恢复哦哥,确定吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            let res = await batchDel(JSON.stringify(this.ids));
            if (res.data.code === 0) {
              this.getData(); // 删除
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量删除",
          });
        });
    },
  },

  filters: {
    // 过滤时间
    filterDate(time) {
      return normalizeDate(time);
    },
  },

  created() {
    this.getData(); // 进入页面 调用ajax
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 30px;
}

.account {
  width: 194px;
}

.btns {
  margin-top: 30px;
}

.el-button--danger {
  margin-left: 10px;
}
</style>