<template>
  <div>
    <!-- 首页轮播图 -->
    <div class="banner">
      <div class="W">
        <el-carousel height="460px">
          <el-carousel-item v-for="(item, index) in bannerlist" :key="index">
            <img
              class="img"
              :src="`http://101.132.181.9:3000/${item.imgPath}`"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="W">
      <div class="mymain">
        <div class="top">
          <h1><span class="title">手机</span></h1>
          <div class="content">
            <div class="left">
              <img
                class="img"
                src="http://101.132.181.9:3000/public/imgs/phone/phone.png"
                alt=""
              />
            </div>
            <div class="right">
              <mymain :data="telList">
                <li id="more" style="" slot="liu">
                  浏览更多 <i class="el-icon-d-arrow-right"></i>
                </li>
              </mymain>
            </div>
          </div>
        </div>
      </div>
      <!-- 家电热门 -->
      <div class="mymain">
        <div class="top">
          <h1>
            <span class="title">家电</span>
            <mymenu :val="2" @fromChild="changeval">
              <span slot="1"> 热门 </span>
              <span slot="2"> 电视影音 </span>
            </mymenu>
          </h1>
        </div>
        <div class="content">
          <div class="left">
            <ul>
              <li>
                <img
                  src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo1.png"
                  alt=""
                />
              </li>
              <li>
                <img
                  src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo2.png"
                  alt=""
                />
              </li>
            </ul>
          </div>
          <div class="right">
            <mymain :data="jiadianHotlist">
              <li id="more" style="" slot="liu">
                浏览更多 <i class="el-icon-d-arrow-right"></i>
              </li>
            </mymain>
          </div>
        </div>
      </div>
      <!-- 配件 -->
      <div class="mymain">
        <div class="top">
          <h1>
            <span class="title">配件</span>
            <mymenu :val="3" @fromChild="changeval2">
              <span slot="1"> 热门 </span>
              <span slot="2"> 保护套 </span>
              <span slot="3"> 充电器 </span>
            </mymenu>
          </h1>
        </div>
        <div class="content">
          <div class="left">
            <ul>
              <li>
                <img
                  src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo1.png"
                  alt=""
                />
              </li>
              <li>
                <img
                  src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo2.png"
                  alt=""
                />
              </li>
            </ul>
          </div>
          <div class="right">
            <mymain :data="peijianHotlist">
              <li id="more" style="" slot="liu">
                浏览更多 <i class="el-icon-d-arrow-right"></i>
              </li>
            </mymain>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { carousel, getshopinhome, getHotProduct } from "../api/api";
import mymain from "../components/mymain.vue";
import mymenu from "../components/mymenu.vue";
export default {
  name: "",
  components: {
    mymain,
    mymenu,
  },
  data() {
    return {
      bannerlist: [], // 轮播图数据
      telList: [], //手机的数据
      jiadianHotlist: [], //家电热门数据
      jiadianActivelist: [], //保存默认的家电热门数据
      peijianHotlist: [], //配件热门数据
      peijianActivelist: [],
      tcllist: [], //电视的数据
      baohulist: [], //保护膜数据
      apilist: [], //充电器数据
      fromChildatjiadian: 1, //默认的家电值
      fromChildatpeijian: 1, //默认的配件值
    };
  },
  created() {
    //获取轮播图数据
    carousel().then((res) => {
      this.bannerlist = res.data.carousel;
    });
    //获取手机数据
    getshopinhome({ categoryName: "手机" }).then((res) => {
      console.log(res);
      this.telList = res.data.Product;
    });
    //获取热门家电数据
    getHotProduct({ categoryName: ["电视机", "空调", "洗衣机"] }).then(
      (res) => {
        this.jiadianHotlist = res.data.Product;
        this.jiadianActivelist = res.data.Product;
      }
    );
    //获取电视机数据
    getshopinhome({ categoryName: "电视机" }).then((res) => {
      console.log(res);
      this.tcllist = res.data.Product;
    });
    //获取热门配件数据
    getHotProduct({
      categoryName: ["保护套", "保护膜", "充电器", "充电宝"],
    }).then((res) => {
      this.peijianHotlist = res.data.Product;
      this.peijianActivelist = res.data.Product;
    });
    //获取保护膜数据
    getshopinhome({ categoryName: "保护套" }).then((res) => {
      this.baohulist = res.data.Product;
    });
    //获取充电器数据
    getshopinhome({ categoryName: "充电器" }).then((res) => {
      this.apilist = res.data.Product;
    });
  },
  mounted() {},
  methods: {
    changeval(val) {
      this.fromChildatjiadian = val;
    },
    changeval2(val) {
      this.fromChildatpeijian = val;
    },
  },
  watch: {
    //监听子组件在 家电热门的数据改变
    fromChildatjiadian: function (val) {
      if (val == 1) {
        this.jiadianHotlist = this.jiadianActivelist;
      }
      if (val == 2) {
        this.jiadianHotlist = this.tcllist;
      }
    },
    //监听子组件在 配件热门的数据改变
    fromChildatpeijian: function (val) {
      if (val == 1) {
        this.peijianHotlist = this.peijianActivelist;
      }
      if (val == 2) {
        this.peijianHotlist = this.baohulist;
      }
      if (val == 3) {
        this.peijianHotlist = this.apilist;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.title {
  padding-left: 20px;
}
.banner {
  background-color: #fff;
  img {
    width: 100%;
  }
}
.mymain {
  margin: 20px 0;
  .top {
    h1 {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      .title {
        font-size: 28px;
      }
    }
  }
}
.content {
  display: flex;
  justify-content: space-around;
  .left {
    width: 234px;
    img {
      width: 100%;
    }
  }
  .right {
    flex: 1;
  }
}
#more {
  width: 23%;
  height: 280px;
  padding: 10px 0;
  margin: 0 0 14.5px 13.7px;
  background-color: #fff;
  transition: all 0.2s linear;
  position: relative;
  text-align: center;
  line-height: 280px;
}
#more:hover {
  box-shadow: 0 2px 12px rgba(122, 110, 110, 0.459);
}
</style>
