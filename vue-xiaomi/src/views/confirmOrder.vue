<template>
  <div class="order">
    <h1>确认订单</h1>
    <div>
      <div class="content">
        <div class="section-address">
          <p class="title">收货地址</p>
          <div class="address-body">
            <ul>
              <li class="in-section" style="border: 1px solid #ff6700">
                <h2>陈同学</h2>
                <p class="phone">13580018623</p>
                <p class="address">广东 广州市 白云区 江高镇 广东白云学院</p>
              </li>
              <li class="in-section">
                <h2>陈同学</h2>
                <p class="phone">13580018623</p>
                <p class="address">广东 茂名市 化州市 杨梅镇 ***</p>
              </li>
              <li class="add-address">
                <i class="el-icon-circle-plus-outline"></i>
                <p>添加新地址</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="section-goods">
          <p class="title">商品及优惠券</p>
          <div class="goods-list">
            <ul>
              <li v-for="item in orderList" :key="item.id">
                <img
                  :src="`http://101.132.181.9:3000/${item.product_picture}`"
                /><span class="pro-name"> {{ item.product_name }} </span
                ><span class="pro-price"
                  >{{ item.product_price }}元 x {{ item.product_num }}</span
                ><span class="pro-status"></span
                ><span class="pro-total"
                  >{{ item.product_num * item.product_price }}元</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="section-shipment">
          <p class="title">配送方式</p>
          <p class="shipment">包邮</p>
        </div>
        <div class="section-invoice">
          <p class="title">发票</p>
          <p class="invoice">电子发票</p>
          <p class="invoice">个人</p>
          <p class="invoice">商品明细</p>
        </div>
        <div class="section-count">
          <div class="money-box">
            <ul>
              <li>
                <span class="title">商品件数：</span
                ><span class="value">3件</span>
              </li>
              <li>
                <span class="title">商品总价：</span
                ><span class="value">7797元</span>
              </li>
              <li>
                <span class="title">活动优惠：</span
                ><span class="value">-0元</span>
              </li>
              <li>
                <span class="title">优惠券抵扣：</span
                ><span class="value">-0元</span>
              </li>
              <li>
                <span class="title">运费：</span><span class="value">0元</span>
              </li>
              <li class="total">
                <span class="title">应付总额：</span
                ><span class="value"
                  ><span class="total-price">7797</span>元
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="section-bar">
          <div class="btn">
            <el-button type="info" @click="$router.go(-1)"
              >返回购物车</el-button
            >
            <el-button type="success" @click="addOrder">结算</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrder } from "../api/api";
export default {
  name: "",
  components: {},
  data() {
    return {
      orderList: [],
      userID: "",
    };
  },
  created() {
    let userID = localStorage.getItem("userID");
    this.userID = userID;
    getOrder({ user_id: userID }).then((res) => {
      this.orderList = res.data.orders[0];
    });
  },
  mounted() {},
  methods: {
    addOrder() {
      console.log(this.orderList);
      getOrder({ user_id: this.userID }).then((res) => {
        console.log(res);
      });
      //   addOrder({user_id: this.userID, products: this.orderList }).then(
      //     (res) => {
      //       console.log(res);
      //     }
      //   );
    },
  },
};
</script>

<style scoped lang='scss'>
.order {
  padding-top: 20px;
  padding-left: 20px;
}
h1 {
  width: 1225px;
  margin: 0 auto;
  height: 80px;
  font-size: 30px;
}
.section-address {
  margin: 0 48px;
  overflow: hidden;
  .title {
    color: #333;
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 20px;
  }
  .address-body {
    ul {
      .in-section {
        float: left;
        color: #333;
        width: 220px;
        height: 178px;
        padding: 15px 24px 0;
        margin-right: 17px;
        margin-bottom: 24px;

        h2 {
          font-size: 18px;
          font-weight: 400;
          line-height: 30px;
          margin-bottom: 10px;
        }
        .phone {
          font-size: 14px;
          color: #757575;
        }
        .address {
          font-size: 14px;
          color: #757575;
          padding: 10px 0;
          max-width: 180px;
          max-height: 88px;
          line-height: 22px;
          overflow: hidden;
        }
      }
      .add-address {
        float: left;
        color: #333;
        width: 220px;
        height: 178px;
        border: 1px solid #e0e0e0;
        padding: 15px 24px 0;
        margin-right: 17px;
        margin-bottom: 24px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
.section-goods {
  margin: 0 48px;
  .title {
    color: #333;
    font-size: 18px;
    line-height: 40px;
  }
  .goods-list {
    padding: 5px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    ul {
      li {
        padding: 10px 0;
        color: #424242;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .pro-name {
          width: 650px;
          line-height: 30px;
        }
        .pro-price {
          width: 150px;
          text-align: center;
          line-height: 30px;
        }
        .pro-status {
          width: 99px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
        .pro-total {
          width: 190px;
          text-align: center;
          color: #ff6700;
          line-height: 30px;
        }
      }
    }
  }
}
.section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  .title {
    float: left;
    width: 150px;
    color: #333;
    font-size: 18px;
    line-height: 38px;
  }
  .shipment {
    float: left;
    line-height: 38px;
    font-size: 14px;
    color: #ff6700;
  }
}
.section-invoice {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
  .title {
    float: left;
    width: 150px;
    color: #333;
    font-size: 18px;
    line-height: 38px;
  }
  .invoice {
    float: left;
    line-height: 38px;
    font-size: 14px;
    margin-right: 20px;
    color: #ff6700;
  }
}
.section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
  .btn {
    float: right;
  }
}
.section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
  .money-box {
    float: right;
    text-align: right;
    ul {
      li {
        .title {
          float: left;
          width: 126px;
          height: 30px;
          display: block;
          line-height: 30px;
          color: #757575;
        }
        .value {
          float: left;
          min-width: 105px;
          height: 30px;
          display: block;
          line-height: 30px;
          color: #ff6700;
        }
      }
    }
  }
}
</style>
