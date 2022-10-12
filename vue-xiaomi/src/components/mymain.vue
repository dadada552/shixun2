<template>
  <div>
      <ul class="content-item-box">
        <li
          class="content-item"
          v-for="item in data"
          :key="item.product_id"
          @click="goinfo(item)"
        >
          <span class="delitem" v-show="flag" > X</span>
          <img
            :src="`http://101.132.181.9:3000/${item.product_picture}`"
            alt=""
          />
          
          <h2>{{ item.product_name }}</h2>
          <h3>{{ item.product_title }}</h3>
          <p>
            <span>{{ item.product_selling_price }}元</span
            >
          </p>
        </li>
        <slot name="liu"></slot>
       
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "",
  components: {},
  data() {
    return {
      flag: false,
      id: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    goinfo(item) {
      this.$router.push({
        path: "/info",
        query: { productID: item.product_id },
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.img {
  height: 614px;
}
h1 {
  font-size: 24px;
}
.content {
  display: flex;
  justify-content: space-around;
}
.content-item-box {
  display: flex;
  flex-wrap: wrap;

  .content-item:hover {
    box-shadow: 0 2px 12px rgba(122, 110, 110, 0.459);
  }
  .content-item {
    width: 23%;
    height: 280px;
    padding: 10px 0;
    margin: 0 0 14.5px 13.7px;
    background-color: #fff;
    transition: all 0.2s linear;
    position: relative;

    img {
      display: block;
      width: 160px;
      height: 160px;
      margin: 0 auto;
    }
    .delitem {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    h2 {
      margin: 25px 10px 0;
      font-size: 14px;
      color: #333;
      font-weight: 400;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    h3 {
      font-weight: 400;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 5px 10px;
      height: 18px;
      font-size: 12px;
      color: #b0b0b0;
    }
    p {
      margin: 10px 10px 10px;
      text-align: center;
      color: #ff6700;
    }
  }
}
</style>
