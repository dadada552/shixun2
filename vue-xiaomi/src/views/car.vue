<template>
  <div>
    <header>
      <h1 class="W">我的购物车</h1>
    </header>
    <div class="W">
      <img
        v-if="carlist.length == 0"
        src="../assets/imgs/cart-empty.png"
        alt=""
      />
      <div v-else>
        <el-table
          :data="carlist"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <div class="name">
                <div>
                  <img
                    :src="`http://101.132.181.9:3000/${scope.row.productImg}`"
                    alt=""
                    class="img"
                  />
                </div>
                <div>
                  {{ scope.row.productName }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价"> </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.num"
                @change="handleChange(scope.row)"
                :min="1"
                :max="scope.row.maxNum"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="小计">
            <template slot-scope="scope">
              {{ scope.row.num * scope.row.price }}元
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="cart-bar">
          <div class="cart-bar-left">
            <span>继续购物</span>
            <span class="sep">|</span>
            <span class="cart-total">
              共
              <span class="cart-total-num">{{ carlist.length }}</span>
              件商品，已选择
              <span class="cart-total-num">{{ getchecknum }}</span> 件
            </span>
          </div>
          <div class="cart-bar-right">
            <span class="total-price-title">合计： {{ getcheckprice }}元</span>
            <el-button
              type="warning"
              @click="gojiesuan"
              v-show="trueArr.length > 0"
              >去结算
            </el-button>
            <el-button type="info" disabled v-show="trueArr.length == 0"
              >去结算
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getcar, updateShoppingCart } from "../api/api";
export default {
  name: "",
  components: {},
  data() {
    return {
      carlist: [],
      userID: "",
      trueArr: [],
    };
  },
  created() {
    let userID = localStorage.getItem("userID");
    this.userID = userID;
    getcar({ user_id: userID }).then((res) => {
      this.carlist = res.data.shoppingCartData;
    });
  },
  mounted() {},
  methods: {
    //修改购物车数量
    handleChange(obj) {
      updateShoppingCart({
        user_id: this.userID,
        product_id: obj.productID,
        num: obj.num,
      }).then((res) => {
        console.log(res);
      });
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.trueArr = val;
    },
    gojiesuan() {
      this.$router.push("/confirmOrder");
    },
  },
  computed: {
    getchecknum() {
      return this.trueArr.length;
    },
    getcheckprice() {
      let sum = 0;
      this.trueArr.forEach((item) => {
        sum += item.num * item.price;
      });
      return sum;
    },
  },
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
.name {
  display: flex;
  line-height: 100px;
}
.img {
  width: 100px;
  height: 100px;
}
.cart-bar {
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .cart-bar-left {
    .cart-total-num {
      color: orange;
    }
  }
}
</style>
