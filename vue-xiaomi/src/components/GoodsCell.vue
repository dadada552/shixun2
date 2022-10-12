<template>
  <div
    @click="
      $router.push({
        path: '/details',
        query: { productID: goodsItem.product_id },
      })
    "
    @mouseover="flag = true"
    @mouseout="flag = false"
  >
    <el-card shadow="hover">
      <img
        width="160"
        :src="'http://101.132.181.9:3000/' + goodsItem.product_picture"
      />

      <el-popconfirm
        placement="top"
        confirm-button-text="确定"
        title="确认删除吗？"
        icon=""
        @confirm="$emit('close', goodsItem.product_id)"
      >
        <span class="close" v-show="close && flag" slot="reference" @click.stop>
          <i class="el-icon-close"></i>
        </span>
      </el-popconfirm>
      <h2>{{ goodsItem.product_name }}</h2>
      <h3>{{ goodsItem.product_title }}</h3>
      <p>
        <span>{{ goodsItem.product_selling_price }}元</span>
        <span
          class="del"
          v-if="goodsItem.product_price > goodsItem.product_selling_price"
          >{{ goodsItem.product_price }}元</span
        >
      </p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsCell",
  components: {},
  props: ["goodsItem", "close"],
  data() {
    return {
      flag: false,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.el-card {
  position: relative;
  box-sizing: border-box;
  padding: 10px 0;
  width: 234px;
  height: 300px;
  text-align: center;
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    font-weight: 100;
  }
  .close:hover {
    color: #ff6700;
  }

  img {
    display: block;
    margin: 0 auto;
  }
  h2 {
    margin-top: 25px;
    font-size: 14px;
  }
  h3 {
    margin: 10 0;
    font-size: 12px;
    color: #b0b0b0;
  }
  p {
    margin: 10px;
    span {
      font-size: 16px;
      color: #ff6700;
    }
    .del {
      padding-left: 10px;
      color: #b0b0b0;
      text-decoration: line-through;
    }
  }
}
</style>
