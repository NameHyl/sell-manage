# sell-manage开发文档

# DAY01

## 1. 项目环境搭建

### 1.1 创建项目

- 创建项目目录

  ```javascript
  vue create sell-manage
  
  # 然后一顿选择
  ```

- 启动项目

  ```javascript
  yarn serve
  ```

- 清理项目目录

### 1.2 重置样式

- 准备一份完整的 `reset.css`

- 在`main.js`引入

  ```javascript
  // reset.css 重置样式
  import "@/assets/css/reset.css"
  
  # 审查元素看看有没有效果
  ```

### 1.3 引入iconfont.css

- 找到合适的icon, 修改类名,下载

- 在 `main.js` 引入

  ```javascript
  // iconfont.css
  import '@/assets/fonts/iconfont.css'
  ```

- 在 `App.vue`测试

  ```javascript
  # 只要看到有效果 证明引入成功
  <i class="iconfont icon-user"></i>
  ```

## 2. 两个大组件

### 2.1 创建两个大组件

- 登录组件 - `Login.vue`
- 布局组件 - `Layout.vue`

### 2.2 配置路由

```javascript
/* 路由配置 */
const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout
  }
]
```

### 2.3 测试

```javascript
# App.vue 给路由出口

<!-- 路由出口 -->
<router-view></router-view>

# 然后手动输入地址 /login 和 / , 测试两个大组件是否生效
```

## 3 完整配置路由

### 3.1 创建所有组件

- Home.vue  // 后台首页
- 订单管理
  - OrderList  // 订单列表
  - OrderEdit // 订单编辑
- 商品管理
  - GoodsList.vue // 商品列表
  - GoodsAdd.vue  // 商品添加
  - GoodsCate  // 商品分类
- 店铺管理  Shop.vue  // 店铺管理
- 账号管理
  - AccountList.vue  // 账号列表
  - AccountAdd.vue // 添加账号
  - PasswordModify.vue // 修改密码
  - Personal.vue  // 个人中心
- 商品统计
  - GoodsTotal.vue  // 商品统计
  - OrderTotal.vue  // 订单统计

### 3.2  配置路由

```javascript
/* 路由配置 */
const routes = [
  // 登录
  {
    path: '/login',
    component: Login
  },
  // 后台首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    children: [
      {
        path: '/order/order-list',
        component: () => import('@/views/order/OrderList.vue')
      },
      {
        path: '/order/order-edit',
        component: () => import('@/views/order/OrderEdit.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goods-list',
    children: [
      {
        path: '/goods/goods-list',
        component: () => import('@/views/goods/GoodsList.vue')
      },
      {
        path: '/goods/goods-add',
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
      {
        path: '/goods/goods-cate',
        component: () => import('@/views/goods/GoodsCate.vue')
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/shop/Shop.vue')
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/account-list',
    children: [
      {
        path: '/account/account-add',
        component: () => import('@/views/account/AccountAdd.vue')
      },
      {
        path: '/account/account-list',
        component: () => import('@/views/account/AccountList.vue')
      },
      {
        path: '/account/password-modify',
        component: () => import('@/views/account/PasswordModify.vue')
      },
      {
        path: '/account/personal',
        component: () => import('@/views/account/Personal.vue')
      },
    ]
  },
  // 商品统计
  {
    path: '/total',
    component: Layout,
    redirect: '/total/goods-total',
    children: [
      {
        path: '/total/goods-total',
        component: () => import('@/views/total/GoodsTotal.vue')
      },
      {
        path: '/total/order-total',
        component: () => import('@/views/total/OrderTotal.vue')
      }
    ]
  }
]
```

### 3.3 测试

```javascript
# 记得在 Layout配置路由出口  然后手动一个组件一个组件的测试 保证没有任何问题 哪个组价有问题就重新配置
```

## 4. 登录表单实现

### 4.1 布局

- `template`

```javascript
 <el-form
    :model="loginForm"
    :rules="rules"
    size="small"
    status-icon
    ref="ruleForm"
    class="login-form"
  >
    <!-- 账号 -->
    <el-form-item prop="account">
      <el-input
        prefix-icon="iconfont icon-user"
        v-model="loginForm.account"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        prefix-icon="iconfont icon-lock"
        type="password"
        v-model="loginForm.password"
        autocomplete="off"
      >
        <i slot="suffix" class="iconfont icon-eyeclose"></i>
      </el-input>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
```

### 4.2 内置表单验证

- 失去焦点验证

```javascript
// 验证规则对象
rules: {
  // 账号字段  -  一定要和表单对象loginForm中的字段对应
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      min: 3,
      max: 12,
      message: "长度在 3 到 12 个字符",
      trigger: "blur",
    },
  ],
  // 密码字段 -  一定要和表单对象loginForm中的字段对应
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "长度在 6 到 12 个字符",
      trigger: "blur",
    },
  ],
},
```

- 点击登录按钮触发所有验证

```javascript
methods: {
  // 登录
  handleLogin() {
    // 选中表单 调用validate 对整个表单进行校验的方法
    this.$refs.loginForm.validate((valid) => {
      if (valid) {
        console.log("发送ajax...");
      } else {
        return;
      }
    });
  },
}
```

## 5. 后台首页

### 5.1 拆分组件

- LeftMenu.vue
- RightMain.vue
  - RightHeader.vue
  - 路由出口

### 5.2 左侧导航完整实现

- `tempalte`

  ```javascript
    <div class="left-menu">
      <el-menu
        :default-active="curActive"
        unique-opened
        background-color="#304156"
        text-color="#ffffff"
        router
      >
        <!-- 后台首页 -->
        <el-menu-item index="/home">
          <i class="iconfont icon-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
  
        <!-- 订单管理 -->
        <el-menu-item index="/order/order-list">
          <i class="iconfont icon-order1"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
  
        <!-- 商品管理 -->
        <el-submenu index="xx">
          <template slot="title">
            <i class="iconfont icon-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
          <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
          <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
        </el-submenu>
  
        <!-- 店铺管理 -->
        <el-menu-item index="/shop">
          <i class="iconfont icon-shop"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>
  
        <!-- 账号管理 -->
        <el-submenu index="yy">
          <template slot="title">
            <i class="iconfont icon-user"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item index="/account/account-list">账号列表</el-menu-item>
          <el-menu-item index="/account/account-add">账号添加</el-menu-item>
          <el-menu-item index="/account/password-modify">修改密码</el-menu-item>
          <el-menu-item index="/account/personal">个人中心</el-menu-item>
        </el-submenu>
  
        <!-- 销售统计 -->
        <el-submenu index="6">
          <template slot="title">
            <i class="iconfont icon-sum"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item index="/total/goods-total">商品统计</el-menu-item>
          <el-menu-item index="/total/order-total">订单统计</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  ```

- `script`

  ```javascript
  export default {
    computed: {
      // 当前激活
      curActive() {
        return this.$route.path;
      },
    },
  };
  ```

## 6. 今日任务

### 6.1 登录

- 布局
- 验证
- 交互

### 6.2 首页

- 拆分组件
- 左侧导航
  - 布局
  - 交互

### 6.3 组件实现 [ 越多越好 ]



# DAY02

## 1.今日目标

组件强化训练[ 对写.vue组件熟悉 ]

- 右侧头部组件
- 首页组件
- 账号管理
  - 账号列表
  - 账号添加
  - 修改密码
  - 个人中心

## 2. 右侧头部组件

```javascript
<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>账号添加</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="right-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            欢迎你, 小貂蝉<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-avatar :size="50" :src="imgurl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgurl: require("@/assets/imgs/logo.png"),
    };
  },
};
</script>

<style lang="less" scoped>
.right-header {
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  box-shadow: 1px 1px 4px #ccc;
  background-color: #fff;
  .el-col-12 {
    height: 60px;
    .el-breadcrumb {
      height: 60px;
      line-height: 60px;
    }
  }
  .right-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-avatar {
      margin-left: 10px;
    }
  }
}
</style>

```

## 3. 首页

### 3.1 卡片组件封装

```javascript
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
```

### 3.2 echarts组件

```javascript
<template>
  <div class="home">
    <div class="card-container">
      <card v-for="item in cardData" :key="item.id" :data="item"></card>
    </div>

    <div id="echartBox" class="echart-box"></div>
  </div>
</template>

<script>
// 引入组件
import Card from "./Card.vue";

// 引入echarts的方法 init
import { init } from "echarts";

export default {
  // 注册组件
  components: {
    Card,
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
    };
  },
  // 方法
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = init(document.getElementById("echartBox"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  // 生命周期
  mounted() {
    this.drawLine();
  },
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

  .echart-box {
    margin-top: 20px;
    width: 100%;
    height: 400px;
    background-color: #fff;
  }
}
</style>
```

### 3.3 适配[扩展]

- 卡片组件适配 媒体查询

```javascript
@media screen and (max-width: 1000px) {
    // 这里的样式 在屏幕宽度小于1000px 就生效
    .icon {
      flex: 1;
    }
    .info {
      flex: 2;
    }
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
```

- echarts适配 

```javascript
  // 方法
  methods: {
    // 画线
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = init(document.getElementById("echartBox"));

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    // 窗口大小改变
    handleResize() {
      // console.log("窗口变了");
      this.myChart.resize(); // 只要窗口大小改变 echarts跟着容器变化
    },
  },
  // 生命周期
  mounted() {
    this.drawLine();
    // 监听窗口大小改变
    window.addEventListener("resize", this.handleResize);
  },
  // 销毁前
  beforeDestroy() {
    // 解绑事件 [性能优化]
    window.removeEventListener("resize", this.handleResize);
  },
```

## 4. 账号管理

### 4.1 封装通用的面板组件

```javascript
<template>
  <el-card>
    <!-- 标题 -->
    <div slot="header">
      <span>{{ title }}</span>
       // 具名插槽  预留之后有按钮的
      <slot name="btn"></slot>
    </div>

    <!-- 内容 -->
    <div class="panel-content">
      <!-- 预留插槽  匿名插槽 插入内容的-->
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
```

### 4.2 账号列表组件

```javascript
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
  <el-table-column prop="date" label="创建时间"> </el-table-column>

  <!-- 操作 -->
  <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button size="mini" @click="handleEdit(scope.row)">
        编辑
      </el-button>

      <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
        删除
      </el-button>
    </template>
  </el-table-column>
</el-table>
```

### 4.3 分页组件

```javascript
<!-- 分页 -->
<el-pagination
  :current-page="currentPage"
  :total="total"
  :page-sizes="[1, 5, 10, 20, 50]"
  :page-size="pageSize"
  background
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  layout="total, sizes, prev, pager, next, jumper"
>
</el-pagination>
```

### 4.4 模态框

```javascript
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

    <el-button size="small" type="primary" @click="dialogVisible = false">
      确 定
    </el-button>
  </span>
</el-dialog>
```

### 4.5 批量删除 & 取消选择

```javascript
<!-- 批量删除 & 取消选择 -->
<div class="btns">
  <el-button @click="batchDelete" type="danger" size="small">
    批量删除
  </el-button>
  <el-button @click="cancelSelect" type="primary" size="small">
    取消选择
  </el-button>
</div>
```

### 4.6 script

```javascript
<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

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
        {
          id: 1,
          account: "小貂蝉",
          userGroup: "超级管理员",
          date: "xx-xx-xx1",
        },
        { id: 2, account: "xx2", userGroup: "xx2", date: "xx-xx-xx2" },
        { id: 3, account: "xx3", userGroup: "xx3", date: "xx-xx-xx3" },
        { id: 4, account: "xx4", userGroup: "xx4", date: "xx-xx-xx4" },
        { id: 5, account: "xx5", userGroup: "xx5", date: "xx-xx-xx5" },
      ],
      currentPage: 3, // 当前页
      total: 100, // 总数据条数
      pageSize: 10, // 每页条数
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
    // 编辑
    handleEdit({ account, userGroup, id }) {
      this.dialogVisible = true; // 显示编辑模态框

      // 回填
      this.editFormData.account = account;
      this.editFormData.userGroup = userGroup;
      this.editFormData.id = id;
    },
    // 删除
    handleDelete(row) {
      console.log(row);
    },
    // 每页条数变化
    handleSizeChange(val) {
      console.log(val);
    },
    // 页码变化
    handleCurrentChange(val) {
      console.log(val);
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
      console.log(this.ids);
    },
  },
};
</script>
```

## 5. 今日目标

### 5.1 完成 ==所有== 组件布局



# DAY03

## 1. 今日目标

### 1.1 表单自定义验证

### 1.2 Ajax接口企业级封装

### 1.3 token接口鉴权

### 1.4 账号模块ajax接口联调



## 2. 表单自定义验证

### 2.1 账号添加组件

- 组件实现

```javascript
<template>
  <panel title="账号添加">
    <el-form
      :model="accountAddForm"
      class="account-add"
      label-width="100px"
      size="small"
    >
      <!-- 账号 -->
      <el-form-item label="账号">
        <el-input v-model="accountAddForm.account"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码">
        <el-input v-model="accountAddForm.password"></el-input>
      </el-form-item>

      <!-- 用户组 -->
      <el-form-item label="用户组">
        <el-select v-model="accountAddForm.userGroup">
          <el-option value="普通管理员"></el-option>
          <el-option value="超级管理员"></el-option>
        </el-select>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <template>
          <el-button type="primary">添加</el-button>
          <el-button>重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      // 账号添加表单
      accountAddForm: {
        account: "",
        password: "",
        userGroup: "",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.account-add {
  /deep/ .el-input__inner {
    width: 194px;
  }
}
</style>
```

- 自定义验证用法

```javascript
export default {
  data() {
    const 自定义验证函数名 = (rule, value, callback) => {
      // rule是一个对象 里面有很多字段 可以使用 也可以不用
      // value: 就是用户输入的值
      // callback是一个回调函数
         // 如果验证合法:  直接调用 callback()
         // 如果验证不合法, 调用  callback( new Error('错误提示信息') )
    }
    return {
      // 验证规则对象
      rules: {
        要验证的字段: { validator: 自定义验证函数名, trigger: '触发方式'  }
      }
    }
  }
}
```

- 自定义验证代码

```javascript
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    // 验证账号
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      } else if (!isAccount(value)) {
        callback(new Error("3 ~ 12 位,数字/字母/中文"));
      } else {
        callback();
      }
    };

    // 验证密码
    const checkPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else if (!isPassword(value)) {
        callback(new Error("6 ~ 12 位,字母/数字/下划线/-"));
      } else {
        callback();
      }
    };

    return {
      // 账号添加表单
      accountAddForm: {
        account: "",
        password: "",
        userGroup: "",
      },
      // 验证规则
      rules: {
        // account: [{ required: true, message: "账号不能为空", trigger: "blur" }],  内置验证

        account: { required: true, validator: checkAccount, trigger: "blur" },
        password: { required: true, validator: checkPass, trigger: "blur" },
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change",
        },
      },
    };
  },
  // 方法
  methods: {
    // 添加账号
    addAccount() {
      // 调用所有表单验证
      this.$refs.accountAddForm.validate((valid) => {
        if (valid) {
          console.log("验证通过  可以发送ajax");
        } else {
          return;
        }
      });
    },
    // 重置
    reset() {
      this.$refs.accountAddForm.resetFields();
    },
  },
};
```





### 2.2 修改密码组件

- 组件实现

```javascript
<template>
  <panel title="修改密码">
    <el-form
      :model="passwordModifyForm"
      class="password-modify"
      label-width="100px"
      size="small"
    >
      <!-- 原密码 -->
      <el-form-item label="原密码">
        <el-input v-model="passwordModifyForm.oldPassword"></el-input>
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="新密码">
        <el-input v-model="passwordModifyForm.newPassword"></el-input>
      </el-form-item>

      <!-- 确认新密码 -->
      <el-form-item label="确认新密码">
        <el-input v-model="passwordModifyForm.passwordAgain"></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <template>
          <el-button type="primary">确认</el-button>
          <el-button>重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      // 账号添加表单
      passwordModifyForm: {
        oldPassword: "",
        newPassword: "",
        passwordAgain: "",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.password-modify {
  /deep/ .el-input__inner {
    width: 194px;
  }
}
</style>
```

- 自定义验证代码

```javascript
// 引入组件
import Panel from "@/components/panel/Panel.vue";

// 引入工具函数
import { isPassword } from "@/utils/tools";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    // 验证旧密码
    const checkOldPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入原密码"));
      } else {
        // 发送ajax给后端 把 value 发送给后端 让后端看一看value是不是当前账号的密码 等待后端返回 才能判断
        callback();
      }
    };

    // 验证新密码
    const checkNewPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (value === this.passwordModifyForm.oldPassword) {
        callback(new Error("不能和原密码相同"));
      } else if (!isPassword(value)) {
        callback(new Error("6 ~ 12位,数字/字母/下划线/-"));
      } else {
        if (this.passwordModifyForm.passwordAgain !== "") {
          // 触发这个字段的验证
          this.$refs.passwordModifyForm.validateField("passwordAgain");
        }
        callback();
      }
    };

    // 验证确认新密码
    const checkPassAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordModifyForm.newPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      // 账号添加表单
      passwordModifyForm: {
        oldPassword: "",
        newPassword: "",
        passwordAgain: "",
      },
      // 验证规则对象
      rules: {
        // 原密码
        oldPassword: {
          required: true,
          validator: checkOldPass,
          trigger: "blur",
        },
        // 新密码
        newPassword: {
          required: true,
          validator: checkNewPass,
          trigger: "blur",
        },
        // 确认新密码
        passwordAgain: {
          required: true,
          validator: checkPassAgain,
          trigger: "blur",
        },
      },
    };
  },
};
```

## 3. ajax大型企业级封装

### 3.1 工具函数层

封装一个非常通用的ajax函数, 整个项目都使用这个函数发送ajax请求

```javascript
# utils/request.js

/**
 * ajax封装
 */
import axios from 'axios'
import { Message } from 'element-ui';  // this.$message ==== Message

axios.defaults.baseURL = 'http://127.0.0.1:5000'; // 默认ajax请求服务器路径
axios.defaults.timeout = 10000; // 请求超时时间

// 请求拦截器
axios.interceptors.request.use((config) => {
    // config是请求配置对象
    console.log('>>config', config)

    return config;
}, (err) => {
    return Promise.reject(err)
})


// 响应拦截器
axios.interceptors.response.use((response) => {
    // resposne后端响应的数据
    let res = response.data;

    // 统一处理状态码
    if (res.code === 0) {
        Message({
            type: 'success',
            message: res.msg
        })
    }

    if (res.code === 1 || res.code === 5001) {
        Message.error(res.msg)
    }

    return response;
}, (err) => {
    return Promise.reject(err)
})

// 暴露出去
export default axios;

```

### 3.2 接口调用层

创建一个文件夹`api`, 里面创建 `.js` 文件,  把接口按照 `功能模块` 划分, 在里面封装好`ajax函数.`

```javascript
# api
  // 引入ajax工具函数
  import request from '@/utils/request'

  // user.js   - 所有用户相关的ajax 都放这个文件里面
  export const checkLogin = (data) => {
    return request({
        method: 'post',
        url: '/users/checkLogin',
        data
    })
  }
  
  export const addAccount = () => {
  }
  export const getAccountList = () => {
  }

  // goods.js  - 所有商品相关的ajax 都放置这个文件里面
  // order.js  - 所有订单相关的ajax 都放置在这个文件里面
  // shop.js   - 所有店铺相关的ajax
```

### 3.3 组件层 .vue文件里面

引入封装好的ajax函数, 直接调用即可

```javascript
import { checkLogin } from '@/api/user'

// 登录
// 直接调用发送登录请求的函数即可

// 写法一
checkLogin(this.loginForm)
  .then((res) => {
    let { code, msg, role, token } = res.data;

    if (code === 0) {
      this.$router.push("/home"); // 跳转到后台首页
    }
  })
  .catch((err) => {
    console.log(err);
  })

// 写法二  记得外面加上 async 哦~~~
try {
  // 直接调用发送登录请求的函数即可
  let res = await checkLogin(this.loginForm);
  let { code, msg, role, token } = res.data;
  if (code === 0) {
    this.$router.push("/home");
  }
} catch (err) {
  this.$message.error(err.message); // 错误提示
}
```

## 4. token

登录成功, 后端会给前端返回一个令牌( 健康码 通行证), 之后, 所有接口, 只要你去调用, 必须带上token, 否则,就会报错, 错误:  401, 未授权

### 4.1 登录成功, 把token存入本地

```javascript
 if (code === 0) { // 如果登录成功
  local.set("t_k", token); // 把令牌存入本地
  this.$router.push("/home");
}
```

### 4.2 ajax请求必须携带token令牌,否则没有权限调用接口

```javascript
import local from '@/utils/local'

// 请求拦截器
axios.interceptors.request.use((config) => {
    // config是请求配置对象
    let token = local.get('t_k')

    // 请求头统一携带token
    if (token) {
        config.headers.Authorization = token
    }

    return config;
}, (err) => {
    return Promise.reject(err)
})

```

## 5. 账号管理模块

### 5.1 添加账号

```javascript
// 添加账号
  handleAddAccount() {
    // 调用所有表单验证
    this.$refs.accountAddForm.validate(async (valid) => {
      if (valid) {
        // 发送添加账号的ajax
        try {
          let res = await addAccount(this.accountAddForm);

          if (res.data.code === 0) {
            this.$router.push("/account/account-list");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        return;
      }
    });
  },
```

## 6. 今日任务

- 接口三层封装 
  - 工具函数层
  - 接口调用层
  - 组件层
- token令牌 [ `接口鉴权` ]
- ajax接口
  - 登录
  - 添加账号
- 账号管理模块

# DAY04

## 1. 今日目标

- ajax前后端联调强化训练
- 头像上传
- 判断用户登录状态
- 退出登录

## 2. 账号管理

### 2.1 账号列表组件

- AccountList.vue

```javascript
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
```

### 2.2 ajax接口方法

- api/user.js

```javascript
/**
 * 用户相关ajax函数
 */
import request from '@/utils/request'

// 登录
export const checkLogin = (data) => {
    return request({
        method: 'post',
        url: '/users/checkLogin',
        data
    })
}

// 添加账号
export const addAccount = (data) => {
    return request({
        method: 'post',
        url: '/users/add',
        data
    })
}

// 获取账号列表
export const getAccountList = (params) => {
    return request({
        method: 'get',
        url: '/users/list',
        params
    })
}

// 删除账号
export const deleteAccount = (id) => {
    return request({
        method: 'get',
        url: '/users/del',
        params: {
            id,
        }
    })
}

// 批量删除
export const batchDel = (ids) => {
    return request({
        method: 'get',
        url: '/users/batchdel',
        params: {
            ids
        }
    })
}

// 修改账号
export const editAccount = (data) => {
    return request({
        method: 'post',
        url: '/users/edit',
        data
    })
}

// 检查旧密码是否正确

// 修改密码

// 获取个人信息

// 头像上传

// 修改用户头像
```

### 2.3 时间格式化方法

- utils/tools.js

```javascript
export const padZero = (n) => {
    return n < 10 ? '0' + n : n;
}

// 转换时间格式
export const normalizeDate = (time, s = '-') => {
    let date = new Date(time)

    let y = date.getFullYear()
    let m = date.getMonth() + 1;
    let d = date.getDate()

    return [y, m, d].map(v => padZero(v)).join(s)
}
```

## 3. 修改密码

### 3.1 旧密码是否正确的验证

### 3.2 修改密码发送ajax

### 3.3 修改密码成功 需要重新登录



## 4. 判断登录状态

### 4.1 如何确定用户是否登录了?

判断本地有没有token, 有token 就是登录过了  否则 就是没有登录过

### 4.2 在哪里确定呢?

全局前置路由`守卫`

```javascript
# router/index.js 路由

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // ...
  to: Route: 即将要进入的目标 路由对象    - 你要去哪啊?
  from: Route: 当前导航正要离开的路由    - 你从哪里来啊?
  next: Function: 一定要调用该方法来 resolve 这个钩子函数   - 走你啊 !!!
})
```

### 4.3 ```判断登录状态```

```javascript
/* 全局前置路由守卫 */
router.beforeEach((to, from, next) => {
  // 登录状态  
  let isLogin = local.get('t_k') ? true : false; // 本地有token 就是登录过的 否则就是没有登录
   // 如果登录过的
  if (isLogin) {
    next() // 走你 直接放行 可以正常访问
  } else {
    // 如果去的是登录
    if (to.path === '/login') {
      next() // 走你 直接放行 每个人都可以去登录
    } else {
      next({ path: '/login' }) // 如果去别的页面 就跳转到登录 因为只有输入正确的账号和密码 才能有token令牌
    }
  }
})
```

## 5. 个人中心

### 5.1 组件布局

```javascript
<template>
  <panel title="个人中心">
    <p>管理员ID: <span></span></p>
    <el-divider></el-divider>
    <p>账号: <span></span></p>
    <el-divider></el-divider>
    <p>用户组: <span></span></p>
    <el-divider></el-divider>
    <p>创建时间: <span></span></p>
    <el-divider></el-divider>
    <p>头像: <span></span></p>
    <el-divider></el-divider>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      imageUrl: "",
    };
  },
  // 方法
  methods: {
    // 上传成功
    handleAvatarSuccess() {},
    // 上传之前
    beforeAvatarUpload() {},
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: red;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
```

### 5.2 头像上传

- 个人中组件

```javascript
<template>
  <panel title="个人中心">
    <p>
      管理员ID: <span>{{ user.id }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      账号: <span>{{ user.account }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      用户组: <span>{{ user.userGroup }}</span>
    </p>
    <el-divider></el-divider>
    <p>
      创建时间: <span>{{ user.ctime }}</span>
    </p>
    <el-divider></el-divider>
    <p>头像: <span></span></p>
    <el-divider></el-divider>

    <!-- 上传组件 -->
    <el-upload
      class="avatar-uploader"
      action="http://127.0.0.1:5000/users/avatar_upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.imgUrl" :src="API + user.imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-button @click="handleEdit" size="small" type="primary"
      >修改头像</el-button
    >
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

// 引入local
import local from "@/utils/local";

// 引入ajax
import { editAvatar } from "@/api/user";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      API: "http://127.0.0.1:5000",
      user: {},
    };
  },
  // 方法
  methods: {
    // 上传成功 文件上传成功时的钩子
    handleAvatarSuccess(res) {
      let { code, imgUrl, msg } = res;

      // 上传成功提示
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg,
        });
        // 回填
        this.user.imgUrl = imgUrl;
      }
    },
    // 上传之前 上传文件之前的钩子
    beforeAvatarUpload(file) {
      console.log("file", file);
      const isJPG = file.type === "image/jpeg";
      const isLt500KB = file.size / 1024 < 500;

      if (!isJPG) {
        this.$message.error("头像只能是jpg格式");
      }

      if (!isLt500KB) {
        this.$message.error("图片大小不能大于500kb");
      }

      return isJPG && isLt500KB; // 如果return false 就会中止上传
    },

    // 修改头像
    async handleEdit() {
      let res = await editAvatar(this.user.imgUrl.substr(21));
      if (res.data.code === 0) {
        // 告诉头部 重新拉一下新数据 重新渲染头像
        this.$bus.$emit("update");
      }
    },
  },

  created() {
    // 取数据
    this.user = local.get("user");
    console.log(this.user);
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    color: red;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
```

- 头部组件

```javascript
<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>账号管理</el-breadcrumb-item>
          <el-breadcrumb-item>账号添加</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12" class="right-info">
        <el-dropdown @command="handleClick">
          <span class="el-dropdown-link">
            欢迎你, {{ userName
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-avatar :size="50" :src="imgurl"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入local
import local from "@/utils/local";
// 引入ajax函数
import { getInfo } from "@/api/user";

export default {
  data() {
    return {
      imgurl: "",
      userName: "",
      API: "http://127.0.0.1:5000",
    };
  },
  methods: {
    // 点击事件
    handleClick(command) {
      if (command === "personal") {
        this.$router.push("/account/personal"); // 跳转到个人中心
      } else if (command === "logout") {
        // 清空本地数据
        local.clear();

        // 弹出提示
        this.$message({
          type: "success",
          message: "哥,下次再来",
        });

        // 跳转到登录
        this.$router.push("/login");
      }
    },
    // 获取数据
    async getData() {
      try {
        let res = await getInfo(); // 发送ajax 获取个人信息
        let { account, imgUrl } = res.data;

        // 存入本地
        local.set("user", res.data);

        // 渲染
        this.userName = account;
        this.imgurl = this.API + imgUrl;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getData(); // 进入页面 就调用 获取个人信息数据

    // 接收 等待个人中心通知
    this.$bus.$on("update", () => {
      this.getData(); // 重新获取新数据
    });
  },
};
</script>

<style lang="less" scoped>
.right-header {
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  box-shadow: 1px 1px 4px #ccc;
  background-color: #fff;
  .el-col-12 {
    height: 60px;
    .el-breadcrumb {
      height: 60px;
      line-height: 60px;
    }
  }
  .right-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .el-avatar {
      margin-left: 10px;
    }
  }
}
</style>

```

## 6 今日任务

- 账号管理模块所有功能
  - 账号列表
    - 列表渲染分页
    - 编辑
    - 删除
    - 批量删除 & 取消选择
  - 账号添加
    - 表单验证
    - ajax
  - 修改密码
    - 旧密码ajax验证
    - 表单验证
    - 修改成功 清除本地存储 跳转到登录 重新登录.
  - 个人中心
    - 数据渲染
    - 头像上传
      - 上传回填
      - 修改头像
  - 头部组件
    - 渲染
- 商品管理模块 
  - 商品添加
    - 表单验证
    - 图片上传
    - 添加ajax
  - 商品列表
    - 渲染分页
    - 删除
    - 编辑

# DAY05

## 1. 今日目标

- 面包屑导航

- 商品模块
  - 商品列表
  - 商品添加
  - 商品分类
- 订单模块
  - 订单列表
  - 订单编辑
  - 订单详情

## 2 面包屑导航

- 在methods封装一个计算面包屑的函数  生命周期 created 和  侦听器 watch 都要调用

  ```javascript
  methods: {
    // 计算面包屑
      calcBreadcrumb() {
        console.log("计算面包屑");
      },
  }
  created() {
    this.calcBreadcrumb()  // 进入页面就要计算  刷新也要计算
  }
  watch: {
    "$route.path"() {
      this.calcBreadcrumb() // 切换导航 要计算
    }
  }
  ```

- 如何算 ? 算出什么东西呢 ?

  - 把面包屑变成动态渲染

    ```html
      <el-breadcrumb-item
          v-for="item in breadcrumbArr" // 我们只需要计算出  breadcrumbArr
          :key="item.title"
          :to="item.path"
        >
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    
    
      export default {
        data() {
            return {
                breadcrumbArr: [] // 面包屑数组 需要计算出来
            }
        	}
     		}
    ```

    

  ```javascript
  methods: {
    // 计算面包屑
      calcBreadcrumb() {
        // 声明一个数组 里面放一个对象 每一个都需要首页
        let temp = [{ title: "首页", path: "/" }];
  			
        // 循环当前路由匹配到的数组
        this.$route.matched.forEach((item) => {
          // 看看meta是否有:  title 且 有 path
          if (item.meta.title && item.meta.path) {
            // 把meta对象放入数组
            temp.push(item.meta);
          }
        });
  
        // 赋值给面包屑动态渲染
        this.breadcrumbArr = temp;
      },
  }
  ```
  
- 路由配置 `meta`

  ```javascript
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  
  /* 解决重复跳转到一个路由 警告你的信息 */
  //获取原型对象上的push函数
  const originalPush = VueRouter.prototype.push
  //修改原型对象中的push方法
  VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
  
  
  import local from '@/utils/local'
  
  // 引入组件
  import Login from '@/views/login/Login.vue'  // 登录组件
  import Layout from '@/views/layout/Layout.vue' // 布局大组件
  
  /* 路由配置 */
  const routes = [
    // 登录
    {
      path: '/login',
      component: Login
    },
    // 后台首页
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      meta: { title: '后台首页', path: '/home' },
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/Home.vue')
        }
      ]
    },
    // 订单管理
    {
      path: '/order',
      component: Layout,
      redirect: '/order/order-list',
      meta: { title: '订单管理', path: '/order' },
      children: [
        {
          path: '/order/order-list',
          component: () => import('@/views/order/OrderList.vue')
        },
        {
          path: '/order/order-edit',
          component: () => import('@/views/order/OrderEdit.vue')
        }
      ]
    },
    // 商品管理
    {
      path: '/goods',
      component: Layout,
      redirect: '/goods/goods-list',
      meta: { title: '商品管理', path: '/goods' },
      children: [
        {
          meta: { title: '商品列表', path: '/goods/goods-list' },
          path: '/goods/goods-list',
          component: () => import('@/views/goods/GoodsList.vue')
        },
        {
          meta: { title: '商品添加', path: '/goods/goods-add' },
          path: '/goods/goods-add',
          component: () => import('@/views/goods/GoodsAdd.vue')
        },
        {
          meta: { title: '商品分类', path: '/goods/goods-cate' },
          path: '/goods/goods-cate',
          component: () => import('@/views/goods/GoodsCate.vue'),
        }
      ]
    },
    // 店铺管理
    {
      path: '/shop',
      component: Layout,
      meta: { title: '店铺管理', path: '/shop' },
      children: [
        {
          path: '',
          component: () => import('@/views/shop/Shop.vue')
        }
      ]
    },
    // 账号管理
    {
      path: '/account',
      component: Layout,
      redirect: '/account/account-list',
      meta: { title: '账号管理', path: '/account' },
      children: [
        {
          meta: { title: '账号添加', path: '/account/account-add' },
          path: '/account/account-add',
          component: () => import('@/views/account/AccountAdd.vue')
        },
        {
          meta: { title: '账号列表', path: '/account/account-list' },
          path: '/account/account-list',
          component: () => import('@/views/account/AccountList.vue')
        },
        {
          meta: { title: '修改密码', path: '/account/password-modify' },
          path: '/account/password-modify',
          component: () => import('@/views/account/PasswordModify.vue')
        },
        {
          meta: { title: '个人中心', path: '/account/personal' },
          path: '/account/personal',
          component: () => import('@/views/account/Personal.vue')
        },
      ]
    },
    // 销售统计
    {
      path: '/total',
      component: Layout,
      redirect: '/total/goods-total',
      meta: { title: '销售统计', path: '/total' },
      children: [
        {
          meta: { title: '商品统计', path: '/total/goods-total' },
          path: '/total/goods-total',
          component: () => import('@/views/total/GoodsTotal.vue')
        },
        {
          meta: { title: '订单统计', path: '/total/order-total' },
          path: '/total/order-total',
          component: () => import('@/views/total/OrderTotal.vue')
        }
      ]
    }
  ]
  
  const router = new VueRouter({
    routes
  })
  
  /* 全局前置路由守卫 */
  router.beforeEach((to, from, next) => {
    // 登录状态
    let isLogin = local.get('t_k') ? true : false;
  
    if (isLogin) {
      next() // 走你
    } else {
      // 如果去的是登录
      if (to.path === '/login') {
        next() // 走你
      } else {
        next({ path: '/login' }) // 如果去别的页面 就跳转到登录
      }
    }
  })
  
  export default router
  
  ```

  

## 3. 商品模块

### 3.1 商品分类

#### 3.1.1 组件实现

```javascript
<template>
  <panel title="商品分类">
    <el-button slot="btn" type="primary" size="small">添加分类</el-button>

    <!-- 表格 -->
    <el-table :data="tableData">
      <!-- 序号 -->
      <el-table-column label="序号" type="index"></el-table-column>
      <!-- 分类名称 -->
      <el-table-column label="分类名称" prop="cateName"> </el-table-column>
      <!-- 是否启用 -->
      <el-table-column label="是否启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#cccccc"
          >
          </el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template>
          <el-button type="default" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      background
      layout="total, prev, pager, next, jumper"
    ></el-pagination>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";

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
        { id: 1, cateName: "分类1", state: true },
        { id: 2, cateName: "分类2", state: false },
      ],
      total: 100,
      currentPage: 1,
      pageSize: 5,
    };
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
```

#### 3.1.2 渲染列表

```javascript
methods: {
  // 写一个方法 获取数据
  async getData() {
    try {
      // 发送ajax 获取列表数据
      let res =  await getCateList({ 
        currentPage: this.currentPage, 
        pageSize: this.pageSize 
      })
      let { total, data } = res.data;
      
      // 处理格式
      
      // 赋值渲染
      this.total = total;
      this.tableData = data;
      
    } catch (err) {
      console.log(err)
    }
  },
  handleCurrentChange(val) {
    this.currentPage = val;
    this.getData() // 页面改变 调用 1 次
  },
  # 如果是简单版本的分页 就不要这个
  handleSizeChange (val) {
    this.pageSize = val;
    this.getData() // 每页条数改变 调用 1 次
  }
},
  
created() {
  this.getData() // 进入页面调用 1 次
}
```

#### 3.1.3 分类行内编辑实现

```javascript
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

          <el-button type="danger" size="small">删除</el-button>
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
```

#### 3.1.4 接口代码 api/user

```javascript
/**
 * 商品相关ajax函数
 */

import request from '@/utils/request'

// 获取商品分类列表
export const getCateList = (params) => {
    return request({
        method: 'get',
        url: '/goods/catelist',
        params
    })
}

// 修改分类
export const editCate = (data) => {
    return request({
        method: 'post',
        url: '/goods/editcate',
        data
    })
}
```

## 4. 订单列表&带查询

```javascript
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
          <el-button @click="handleClick(scope.row)" type="text" size="small"
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
    // 编辑
    handleEdit(row) {
      console.log(row);
      this.$router.push("/order/order-edit"); // 跳转到订单编辑页面
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
```

## 5. 保持导航激活

```javascript
// 当前激活
curActive() {
  if (this.$route.path === "/order/order-edit") {
    return "/order/order-list";
  }
  return this.$route.path;
},
```

## 6. 今日任务

### 6.1 商品模块全部完成

- 商品分类

  - 分类列表渲染和分页 [ `记得带上查询功能哦!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!` ]
  - 添加分类
  - 删除分类
  - 编辑分类

- 添加商品

  - 分类下拉框动态渲染
  - 图片上传
  - 添加功能

- 商品列表

  - 列表渲染和分页

  - 删除

  - 编辑

    - 弹出模态框回填

    - 保存编辑结果

      

### 6.2 订单管理

- 列表渲染和分页
- 查询和重置
- 查看 ( 当前页面弹出模态框 显示数据 )
- 编辑 (跳转到新页面 数据传递过去  在新页面完成)
  - 回填
  - 编辑

# DAY06

## 1. 今日目标

- 订单跨页面传递数据
  - query
  - params
  - 本地存储
- echarts的动态渲染
  - 渲染接口数据
  - 封装echarts组件
- 店铺管理
  - 组件交互
  - 图片批量上传
  - ajax接口交互



## 2 A / B 页面传递参数

### 2.1 A存入本地 B从本地获取

- A组件: `OrderList.vue`

```javascript
local.set('orderInfo', row)
```

- B组件: `OrderEdit.vue`

```javascript
local.get('orderInfo')

# 然后渲染
```



### 2.2 通过路由params传递参数

- A组件: `OrderList.vue`

```javascript
this.$router.push({ name: '要跳转到的路由的名字', params: { 参数 } })
```

- B组件: `OrderEdit.vue`

```javascript
this.$route.params // 获取数据

# 不能刷新
```

### 2.3 通过路由query传递参数

- A组件: `OrderList.vue`

```javascript
this.$router.push({ path: '要跳转的路由的路径', query: { 参数 } })
```

- B组件: `OrderEdit.vue`

```javascript
this.$route.query // 获取数据

# 缺点: 地址栏太长 不太干净的样子 不好看 刷新对象会默认调用 toString 变成 [object Object]
# 建议: 传递少量参数 使用 query
```

## 3. 店铺管理

- shop.vue

```javascript
<template>
  <panel title="店铺管理">
    <el-button slot="btn" type="primary" size="small" @click="saveEdit">
      保存
    </el-button>

    <el-form :model="shopForm" label-width="100px" size="small">
      <!-- 店铺名称 -->
      <el-form-item class="shopname" label="店铺名称">
        <el-input v-model="shopForm.name"></el-input>
      </el-form-item>
      <!-- 店铺公告 -->
      <el-form-item class="shopbulletin" label="店铺公告">
        <el-input
          v-model="shopForm.bulletin"
          rows="4"
          type="textarea"
        ></el-input>
      </el-form-item>
      <!-- 店铺头像 -->
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader"
          :action="API + '/shop/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="shopForm.avatar"
            :src="API + shopForm.avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 店铺图片 -->
      <el-form-item label="店铺图片">
        <el-upload
          :file-list="shopForm.pics"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSucess"
          :on-remove="handleRemove"
          :action="API + '/shop/upload'"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <!-- 配送费 -->
      <el-form-item label="配送费">
        <el-input-number
          v-model="shopForm.deliveryPrice"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <!-- 配送时间 -->
      <el-form-item label="配送时间">
        <el-input-number
          v-model="shopForm.deliveryTime"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <!-- 配送描述 -->
      <el-form-item label="配送描述">
        <el-select v-model="shopForm.description">
          <el-option value="蜂鸟转送"></el-option>
          <el-option value="美团外卖"></el-option>
          <el-option value="饿了么外卖"></el-option>
        </el-select>
      </el-form-item>
      <!-- 店铺评分 -->
      <el-form-item label="店铺评分">
        <el-rate v-model="shopForm.score" allow-half></el-rate>
      </el-form-item>
      <!-- 销量 -->
      <el-form-item label="销量">
        <el-input-number
          v-model="shopForm.sellCount"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <!-- 活动 -->
      <el-form-item label="活动">
        <el-checkbox-group v-model="shopForm.supports">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 营业时间 -->
      <el-form-item label="营业时间">
        <el-time-picker
          v-model="shopForm.date"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";
// 引入ajax函数
import { getShopInfo, editShop } from "@/api/shop";
// 引入lodash
import _ from "lodash";

export default {
  // 注册
  components: {
    Panel,
  },
  data() {
    return {
      API: "http://127.0.0.1:5000",
      dialogVisible: false,
      dialogImageUrl: "",
      shopForm: {
        description: "",
        supports: [],
        pics: [],
        date: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      },
      // fileList: [
      //   {
      //     name: "food.jpeg",
      //     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      //   },
      //   {
      //     name: "food2.jpeg",
      //     url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      //   },
      // ],
    };
  },
  methods: {
    // 店铺头像上传成功
    handleAvatarSuccess(res) {
      if (res.code === 0) {
        this.shopForm.avatar = res.imgUrl;
      }
    },
    // 图片预览
    handlePictureCardPreview() {},

    // 图片删除
    handleRemove(file) {
      // console.log(file);

      let index = this.shopForm.pics
        .map((v) => {
          return v.name;
        })
        .indexOf(file.name);

      // 删除图片
      this.shopForm.pics.splice(index, 1);
    },
    // 图片上传
    handleSucess(res) {
      this.shopForm.pics.push({ name: res.imgUrl, url: this.API + res.imgUrl });
    },
    // 获取数据
    async getData() {
      try {
        let { data } = await getShopInfo();

        // 取出结果
        console.log(data);

        // 处理格式
        data.pics = data.pics.map((picUrl) => {
          return {
            name: picUrl,
            url: this.API + picUrl,
          };
        });

        console.log(data.pics);

        // 渲染
        this.shopForm = data;
        this.shopForm.date = [
          new Date(2016, 9, 10, 8, 40),
          new Date(2016, 9, 10, 9, 40),
        ];
      } catch (err) {
        console.log(err);
      }
    },
    // 保存修改
    saveEdit() {
      // 深拷贝表单数据
      let data = _.cloneDeep(this.shopForm);

      // 处理头像地址 只需要头像名字
      data.avatar = data.avatar.substr(13);

      // 处理店铺图片地址 只需要图片的名字
      data.pics = data.pics.map((v) => {
        return v.name.substr(13);
      });

      // data.pics = JSON.stringify(data.pics);
      // data.supports = JSON.stringify(data.supports);
      // data.date = JSON.stringify(data.date);

      console.log(data);

      // 发送修改的: ajax
      editShop(data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getData(); // 获取数据
  },
};
</script>

<style lang="less" scoped>
.shopname,
.shopbulletin {
  width: 400px;
}

.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

/deep/.el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 98px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100px;
  height: 100px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item-actions {
  width: 100px;
  height: 100px;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 100px;
  height: 100px;
}
</style>
```

## 4. echarts组件封装

- LineChart.vue

```javascript
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
            stack: "总量",
            data: this.options.yData[0],
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
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
    console.log("子组件", this.options);

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
```

## 5 今日任务

- 订单模块
- 店铺模块
- 首页echarts
- 销售统计echarts [ 只给了一个接口 ]
  - 商品统计
  
  - 订单统计
  
    

# DAY07

## 1. 权限

权限:  不同的`用户角色`登录这个系统, 能看到的 `菜单不一样`, 具备的功能`也不同`.

备注:   一般进入公司,这个功能已经由 `前端leader` 已经写好了.  你只要==理解==即可.

最基本的权限:

- 超级管理员 - 强哥
  - 所有菜单
- 普通管理员 - 鹏仔
  - 后台首页
  - 订单管理
  - 商品管理
    - 商品列表
    - 商品分类 [ 不能编辑 不能删除 不能添加 ]
  - 账号管理
    - 修改密码
    - 个人中心



## 2. 把用户角色存入本地

```javascript
# LoginFor.vue

# 发送登录请求 登录成功 后端返回 role 当前用户的角色
# role:  super 超级管理员   normal 普通管理员

// 存入本地存储
local.set('role', role)
```

## 3. 修改路由为动态路由 & 实现前端权限控制

### 3.1 默认只挂载2个路由

```javascript
/* 路由配置 */
const routes = [
  // 登录
  {
    path: '/login',
    component: Login
  },
  // 后台首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: { title: '后台首页', path: '/home' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
]
```

### 3.2 其他的路由抽取成一个对象

```javascript
# 如果配置了roles 就要检查权限  roles是一个数组 数组中包含的 就有权访问这个路由
# 如果数组中不包含的 就没有权限访问这个路由

# 注意:  如果不做任何配置的 默认都可以访问 ( 都有权限 )

// 动态路由
const dynamicRoutes = [
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    meta: { title: '订单管理', path: '/order' },
    children: [
      {
        meta: { title: '订单列表', path: '/order/order-list' },
        path: '/order/order-list',
        component: () => import('@/views/order/OrderList.vue')
      },
      {
        meta: { title: '订单编辑', path: '/order/order-edit' },
        name: 'order-edit', // 命名式路由
        path: '/order/order-edit',
        component: () => import('@/views/order/OrderEdit.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/goods-list',
    meta: { title: '商品管理', path: '/goods' },
    children: [
      {
        meta: { title: '商品列表', path: '/goods/goods-list' },
        path: '/goods/goods-list',
        component: () => import('@/views/goods/GoodsList.vue')
      },
      {
        meta: { title: '商品添加', path: '/goods/goods-add', roles: ['super'] },
        path: '/goods/goods-add',
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
      {
        meta: { title: '商品分类', path: '/goods/goods-cate' },
        path: '/goods/goods-cate',
        component: () => import('@/views/goods/GoodsCate.vue'),
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    meta: { title: '店铺管理', path: '/shop', roles: ['super'] },
    children: [
      {
        path: '',
        component: () => import('@/views/shop/Shop.vue')
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account/account-list',
    meta: { title: '账号管理', path: '/account' },
    children: [
      {
        meta: { title: '账号添加', path: '/account/account-add', roles: ['super'] },
        path: '/account/account-add',
        component: () => import('@/views/account/AccountAdd.vue')
      },
      {
        meta: { title: '账号列表', path: '/account/account-list', roles: ['super'] },
        path: '/account/account-list',
        component: () => import('@/views/account/AccountList.vue')
      },
      {
        meta: { title: '修改密码', path: '/account/password-modify' },
        path: '/account/password-modify',
        component: () => import('@/views/account/PasswordModify.vue')
      },
      {
        meta: { title: '个人中心', path: '/account/personal' },
        path: '/account/personal',
        component: () => import('@/views/account/Personal.vue')
      },
    ]
  },
  // 销售统计
  {
    path: '/total',
    component: Layout,
    redirect: '/total/goods-total',
    meta: { title: '销售统计', path: '/total', roles: ['super'] },
    children: [
      {
        meta: { title: '商品统计', path: '/total/goods-total' },
        path: '/total/goods-total',
        component: () => import('@/views/total/GoodsTotal.vue')
      },
      {
        meta: { title: '订单统计', path: '/total/order-total' },
        path: '/total/order-total',
        component: () => import('@/views/total/OrderTotal.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/error404'
  },
  {
    path: '/error404',
    component: () => import('@/views/error/Error404.vue')
  }
]
```

### 3.3 计算动态路由

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '@/utils/local'
// 引入组件
import Login from '@/views/login/Login.vue'  // 登录组件
import Layout from '@/views/layout/Layout.vue' // 布局大组件

Vue.use(VueRouter)

/* 解决重复跳转到一个路由 警告你的信息 */
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* 路由配置 */
const routes = [
  // 登录
  {
    path: '/login',
    component: Login,
    visible: false,
  },
  // 后台首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    visible: true,
    meta: { title: '后台首页', path: '/home', icon: 'icon-home' },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

/* 全局前置路由守卫 */
router.beforeEach((to, from, next) => {
  // 登录状态
  let isLogin = local.get('t_k') ? true : false;

  if (isLogin) {
    next() // 走你
  } else {
    // 如果去的是登录
    if (to.path === '/login') {
      next() // 走你
    } else {
      next({ path: '/login' }) // 如果去别的页面 就跳转到登录
    }
  }
})

/**
 * 动态路由
 */
const dynamicRoutes = [
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-list',
    visible: true,
    meta: { title: '订单管理', path: '/order', icon: 'icon-order1' },
    children: [
      {
        meta: { title: '订单列表', path: '/order/order-list' },
        path: '/order/order-list',
        component: () => import('@/views/order/OrderList.vue')
      },
      {
        meta: { title: '订单编辑', path: '/order/order-edit' },
        name: 'order-edit', // 命名式路由
        path: '/order/order-edit',
        component: () => import('@/views/order/OrderEdit.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    visible: true,
    redirect: '/goods/goods-list',
    meta: { title: '商品管理', path: '/goods', icon: 'icon-goods' },
    children: [
      {
        meta: { title: '商品列表', path: '/goods/goods-list' },
        path: '/goods/goods-list',
        component: () => import('@/views/goods/GoodsList.vue')
      },
      {
        meta: { title: '商品添加', path: '/goods/goods-add', roles: ['super'] },
        path: '/goods/goods-add',
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
      {
        meta: { title: '商品分类', path: '/goods/goods-cate' },
        path: '/goods/goods-cate',
        component: () => import('@/views/goods/GoodsCate.vue'),
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    visible: true,
    meta: { title: '店铺管理', path: '/shop', icon: 'icon-shop', roles: ['super'] },
    children: [
      {
        path: '',
        component: () => import('@/views/shop/Shop.vue')
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    component: Layout,
    visible: true,
    redirect: '/account/account-list',
    meta: { title: '账号管理', path: '/account', icon: 'icon-user' },
    children: [
      {
        meta: { title: '账号添加', path: '/account/account-add', roles: ['super'] },
        path: '/account/account-add',
        component: () => import('@/views/account/AccountAdd.vue')
      },
      {
        meta: { title: '账号列表', path: '/account/account-list', roles: ['super'] },
        path: '/account/account-list',
        component: () => import('@/views/account/AccountList.vue')
      },
      {
        meta: { title: '修改密码', path: '/account/password-modify' },
        path: '/account/password-modify',
        component: () => import('@/views/account/PasswordModify.vue')
      },
      {
        meta: { title: '个人中心', path: '/account/personal' },
        path: '/account/personal',
        component: () => import('@/views/account/Personal.vue')
      },
    ]
  },
  // 销售统计
  {
    path: '/total',
    component: Layout,
    visible: true,
    redirect: '/total/goods-total',
    meta: { title: '销售统计', path: '/total', icon: 'icon-sum', roles: ['super'] },
    children: [
      {
        meta: { title: '商品统计', path: '/total/goods-total' },
        path: '/total/goods-total',
        component: () => import('@/views/total/GoodsTotal.vue')
      },
      {
        meta: { title: '订单统计', path: '/total/order-total' },
        path: '/total/order-total',
        component: () => import('@/views/total/OrderTotal.vue')
      }
    ]
  },
]

const options404 = [
  {
    visible: false,
    path: '*',
    redirect: '/error404'
  },
  {
    visible: false,
    path: '/error404',
    component: () => import('@/views/error/Error404.vue')
  }
]

/**
 * 判断是否有权限
 * @param {单个路由对象} router 
 * @param {当前用户角色} role 
 * @returns 返回true就是有权限 false就是没有权限
 */
const hasPremission = (router, role) => {
  // 如果在meta中配置了 roles
  if (router.meta && router.meta.roles) {
    return router.meta.roles.includes(role) // 看roles是不是包含当前用户角色 如果包含 就是true 否则就是false
  } else {
    // 没有在meta中配置 roles 证明这个对象不需要做权限 都可以访问
    return true;
  }
}

/**
 * 计算出当前角色有权限访问哪些路由
 * @param {全部的动态路由} dynamicRoutes 
 * @param {当前用户角色} role 
 * @returns {有权限访问的路由}
 */
const calcAccessRoutes = (dynamicRoutes, role) => {
  let accessRoutes = dynamicRoutes.filter(v => {
    if (hasPremission(v, role)) {

      if (v.children && v.children.length) {
        // 递归
        v.children = calcAccessRoutes(v.children, role)
      }

      return true;
    } else {
      return false;
    }
  })

  return accessRoutes
}

/**
 * 计算有权限访问的菜单
 * @param {有权限访问的路由 已经算好了} routes
 * @returns {要在导航显示的菜单}
 */
const calcMenus = (routes) => {
  let menus = routes.filter(v => v.visible)
  return menus;
}

/**
 * 计算动态路由
 */
export const calcDynamicRoutes = () => {
  let role = local.get('role')

  if (!role) return;

  // 把有权限访问的路由算出来
  let accessRoutes = calcAccessRoutes(dynamicRoutes, role)
  let result = [...routes, ...accessRoutes, ...options404];

  // 计算有权限访问的菜单
  let menus = calcMenus(result)
  local.set('menus', menus)

  // 把算出来的加入路由实例对象中
  router.addRoutes(result)

}

calcDynamicRoutes(); // 刷新也调用一次计算动态路由方法

export default router

```

### 3.4 计算权限菜单

```javascript
<template>
  <div class="left-menu">
    <el-menu
      :default-active="curActive"
      unique-opened
      background-color="#1f3445"
      text-color="#ffffff"
      router
    >
      <template v-for="menu in menus">
        <!-- 后台首页 -->
        <el-menu-item
          v-if="
            (menu.children && menu.children.length === 1) ||
            menu.path === '/order'
          "
          :index="menu.path"
          :key="menu.path"
        >
          <i class="iconfont" :class="menu.meta.icon"></i>
          <span slot="title">{{ menu.meta.title }}</span>
        </el-menu-item>

        <!-- 销售统计 -->
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i class="iconfont" :class="menu.meta.icon"></i>
            <span>{{ menu.meta.title }}</span>
          </template>

          <el-menu-item
            v-for="child in menu.children"
            :key="child.path"
            :index="child.meta.path"
            >{{ child.meta.title }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// 引入local
import local from "@/utils/local";

export default {
  data() {
    return {
      menus: [],
    };
  },
  created() {
    this.menus = local.get("menus");
    console.log(this.menus);
  },
  computed: {
    // 当前激活
    curActive() {
      let path = this.$route.path;

      if (path === "/home") {
        return "/";
      }

      if (path === "/order/order-edit" || path === "/order/order-list") {
        return "/order";
      }
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
.left-menu {
  width: 200px;
  background-color: #1f3445;
  // overflow-y: scroll;
  // overflow-x: hidden;
  .el-menu {
    border-right: 0px;
    .iconfont {
      margin-right: 10px;
      color: #fff;
    }
    /deep/.el-menu {
      .el-menu-item {
        background-color: #1f3445 !important;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      }
    }
  }
}
</style>
```











