<template>
  <div>
    <header>
      <h1 class="W">我的订单</h1>
    </header>
    <div class="W">
      <img
        v-if="orderlist.length == 0"
        src="../assets/imgs/cart-empty.png"
        alt=""
      />
      <myorder :data="orderlist"></myorder>
    </div>
  </div>
</template>

<script>
import myorder from "../components/myorder.vue";
import { getOrder } from "../api/api";
export default {
  name: "",
  components: { myorder },
  data() {
    return {
      orderlist: [],
    };
  },
  created() {
    let userID = localStorage.getItem("userID");
    getOrder({ user_id: userID }).then((res) => {
      this.orderlist = res.data.orders;
    });
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
header {
  background-color: #fff;
  border-bottom: 5px solid orangered;
  padding-bottom: 5px;
  h1 {
    font-size: 30px;
    font-weight: 400;
    line-height: 40px;
  }
}
img {
  display: block;
  margin: 0 auto;
  width: 650px;
}
</style>
