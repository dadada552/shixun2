<template>
  <div>
    <div v-for="(item, index) in data" :key="index">
      <div class="top">
        <span>订单编号:{{ item[0].order_id }}</span>
        <span
          >订单时间:{{ new Date(item[0].order_time).toLocaleString() }}
        </span>
      </div>
      <el-table :data="item">
        <el-table-column prop="product_name" label="商品名称">
          <template slot-scope="scope">
            <div class="name">
              <div>
                <img
                  :src="`http://101.132.181.9:3000/${scope.row.product_picture}`"
                  alt=""
                  class="img"
                />
              </div>
              <div>
                {{ scope.row.product_name }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="product_price" label="单价"> </el-table-column>
        <el-table-column prop="product_num" label="数量"> </el-table-column>
        <el-table-column prop="name" label="小计">
          <template slot-scope="scope">
            {{ scope.row.product_num * scope.row.product_price }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang='scss'>
.name {
  display: flex;
  line-height: 100px;
}
.img {
  width: 100px;
  height: 100px;
}
.top {
  height: 60px;
  font-size: 24px;
  line-height: 80px;
  color: orange;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 4px solid orangered;
  padding: 0 20px;
  padding-bottom: 20px;
  
}
</style>
