<template>
  <panel title="商品添加">
    <!-- 表单 -->
    <el-form :model="addGoodsForm" label-width="100px" size="small">
      <!-- 商品名称 -->
      <el-form-item label="商品名称">
        <el-input class="name" v-model="addGoodsForm.name"></el-input>
      </el-form-item>

      <!-- 商品分类 -->
      <el-form-item label="商品分类">
        <el-select v-model="addGoodsForm.category">
          <el-option
            v-for="cate in categories"
            :key="cate.cateName"
            :value="cate.cateName"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 商品价格 -->
      <el-form-item label="商品价格">
        <el-input-number
          v-model="addGoodsForm.price"
          :min="0"
          :max="100000"
        ></el-input-number>
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="addGoodsForm.imgUrl"
            :src="API + addGoodsForm.imgUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 商品描述 -->
      <el-form-item label="商品描述">
        <el-input
          class="desc"
          type="textarea"
          :rows="4"
          placeholder="商品描述"
          v-model="addGoodsForm.goodsDesc"
        >
        </el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleAddGoods">添加商品</el-button>
      </el-form-item>
    </el-form>
  </panel>
</template>

<script>
// 引入组件
import Panel from "@/components/panel/Panel.vue";
// 引入ajax函数
import { getCateNames, addGoods } from "@/api/goods";

export default {
  // 注册
  components: {
    Panel,
  },
  // 数据
  data() {
    return {
      API: "http://127.0.0.1:5000",

      // 添加商品表单数据
      addGoodsForm: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
      },
      // 分类名数组
      categories: [],
    };
  },
  methods: {
    // 上传成功
    handleAvatarSuccess(res) {
      console.log(res);
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: res.msg,
        });
        // 回填图片
        this.addGoodsForm.imgUrl = res.imgUrl;
      }
    },

    // 获取数据
    async getData() {
      try {
        let res = await getCateNames();
        // 赋值 动态渲染分类下拉框
        this.categories = res.data.categories;
      } catch (err) {
        console.log(err);
      }
    },

    // 添加商品
    async handleAddGoods() {
      // 处理图片名字
      this.addGoodsForm.imgUrl = this.addGoodsForm.imgUrl.substr(23);

      try {
        let res = await addGoods(this.addGoodsForm);

        if (res.data.code === 0) {
          this.$router.push("/goods/goods-list");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.getData(); // 调用函数 获取数据
  },
};
</script>

<style lang="less" scoped>
.name {
  width: 194px;
}

.desc {
  width: 300px;
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
</style>