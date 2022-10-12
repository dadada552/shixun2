<template>
  <div class="info">
    <header>
      <div class="W">
        <div class="top">
          <h1>{{ item.product_name }}</h1>
          <div>
            <ul>
              <li>概述</li>
              <li>参数</li>
              <li>用户评价</li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="content W">
      <!-- 左侧轮播图 -->
      <div class="img-box">
        <el-carousel height="560px">
          <el-carousel-item v-for="item in carousellist" :key="item.id">
            <img
              :src="`http://101.132.181.9:3000/${item.product_picture}`"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 右侧介绍 -->
      <div class="detai">
        <div class="top-content">
          <h1>{{ item.product_name }}</h1>
          <p class="intro">{{ item.product_intro }}</p>
          <p class="zi">小米自营</p>
          <p class="price">{{ item.product_selling_price }}元</p>
        </div>
        <div class="bottom-content">
          <p>
            <span>{{ item.product_name }}</span>
            <span>{{ item.product_selling_price }}</span>
          </p>
          <h1>总计： {{ item.product_selling_price }}</h1>
        </div>
        <div class="btn-box">
          <el-button class="gocar" @click="gocar('加入购物车')" type="warning"
            >加入购物车</el-button
          >
          <el-button class="like" type="info" @click="gocar('喜欢')"
            >喜欢</el-button
          >
        </div>
        <div class="bottom">
          <span> <i class="el-icon-circle-check"></i> 小米自营 </span>
          <span> <i class="el-icon-circle-check"></i> 小米发货 </span>
          <span> <i class="el-icon-circle-check"></i> 7天无理由退货 </span>
          <span> <i class="el-icon-circle-check"></i> 7天价格保护 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetails, getDetailsPicture, addCollect, addcar } from "../api/api";
export default {
  name: "",
  components: {},
  data() {
    return {
      item: {},
      carousellist: [],
    };
  },
  created() {
    //获取详情页数据
    getDetails({ productID: this.$route.query.productID }).then((res) => {
      this.item = res.data.Product[0];
    });
    //获取详情页轮播图数据
    getDetailsPicture({ productID: this.$route.query.productID }).then(
      (res) => {
        this.carousellist = res.data.ProductPicture;
      }
    );
  },
  mounted() {},
  methods: {
    gocar(str) {
      let token = localStorage.getItem("token");
      let userID = localStorage.getItem("userID");
      if (token) {
        if (str == "加入购物车") {
          addcar({ user_id: userID, product_id: this.item.product_id }).then(
            (res) => {
              if (res.data.code == "001") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
            }
          );
        } else {
          addCollect({
            user_id: userID,
            product_id: this.item.product_id,
          }).then((res) => {
            if (res.data.code == "001") {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      } else {
        this.$store.commit("changestatus", true);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.top {
  display: flex;
  height: 60px;
  justify-content: space-between;
  width: 100%;
  line-height: 60px;
  padding-bottom: 10px;
  border-bottom: 2px solid orangered;
  div {
    width: 30%;
  }
  h1 {
    font-weight: 700;
    font-size: 30px;
  }
  ul {
    display: flex;
    justify-content: space-around;
  }
}
header{
  background-color: #fff;
}
.content {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .img-box {
    width: 560px;
    margin-right: 40px;
    img {
      width: 100%;
    }
  }
  .detai {
    flex: 1;
    padding: 10px;
    .top-content {
      padding-bottom: 20px;
      border-bottom: 1px solid #000;
      h1 {
        font-size: 24px;
        font-weight: 400;
      }
      .intro {
        color: #b0b0b0;
        font-size: 16px;
        margin: 10px 0;
      }
      .zi {
        font-size: 20px;
        color: orangered;
        margin: 10px 0;
      }
      .price {
        margin-top: 20px;
        color: orangered;
        font-size: 18px;
      }
    }
    .bottom-content {
      background: #f9f9fa;
      padding: 30px 60px;
      margin: 50px 0 50px;
      p {
        display: flex;
        justify-content: space-between;
        color: #b0b0b0;
        margin-bottom: 30px;
      }
      h1 {
        font-size: 28px;
        color: orangered;
      }
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      .gocar,
      .like {
        width: 340px;
        height: 55px;
      }
    }
    .bottom {
      text-align: center;
      margin-top: 20px;
      color: #b0b0b0;
    }
  }
}
</style>
