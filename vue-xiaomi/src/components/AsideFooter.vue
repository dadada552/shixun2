<template>
  <div class="my-footer">
    <p class="text">
      <span>7天无理由退换货</span>
      <span>满99全场免邮</span>
      <span>100%品质保障</span>
    </p>
    <p class="github"></p>
    <p class="jump">
      <span class="to" @click="$router.push('/')">首页</span>
      <span class="separa">|</span>
      <span class="to" @click="$router.push('/goods')">全部商品</span>
      <span class="separa">|</span>
      <span class="to" @click="$router.push('/about')">关于我们</span>
    </p>
    <p class="coty">商城版权所有 2012-2021</p>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.my-footer {
  background-color: #3d3d3d;
  padding-bottom: 10px;
  .text {
    padding: 0 300px;
    height: 144px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #555;

    span {
      padding-left: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      background: url("../assets/imgs/us-icon.png") left top no-repeat;
    }
  }
  .github {
    margin: 10px 0;
    height: 50px;
    background: url("../assets/imgs/github.png") center center no-repeat;
  }

  .jump,
  .coty {
    margin: 20px 0;
    text-align: center;
    color: #aaa;
    font-size: 18px;

    span {
      font-size: 18px;
    }

    .separa {
      padding: 0 20px;
    }

    .to:hover {
      color: #eee;
    }
  }
}
</style>

