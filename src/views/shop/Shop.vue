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
    handlePictureCardPreview(file) {
      // console.log(file);
      // 显示模态框
      this.dialogVisible = true;
    },

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