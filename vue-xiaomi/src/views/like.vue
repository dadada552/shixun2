<template>
  <div>
    <header>
      <h1 class="W"> 我的收藏 </h1>
    </header>
      <div class="W">
        <img
      v-if="likearr.length == 0"
      src="../assets/imgs/cart-empty.png"
      alt=""
    />
    <mymain v-else :data="likearr" :flag="flag"> </mymain>
      </div>
  </div>
</template>

<script>
import mymain from "../components/mymain.vue";
import { getCollect } from "../api/api";
export default {
  name: "",
  components: {
    mymain,
  },
  data() {
    return {
      likearr: [],
      flag: false,
    };
  },
  created() {
    let userID = localStorage.getItem("userID");
    getCollect({ user_id: userID }).then((res) => {
      // console.log(res);
      this.likearr = res.data.collectList;
     
    });
  },
  mounted() {},
  methods: {
    showX() {
      console.log(1);
      this.flag = true;
    },
  },
};
</script>

<style scoped lang='scss'>
header{
  background-color: #fff;
  border-bottom: 5px solid orangered;
  padding-bottom: 5px;
  h1{
  font-size: 30px;
  font-weight: 400;
  line-height: 40px;
  }
}
img{
  display: block;
  margin: 0 auto;
  width: 650px;
}
</style>
