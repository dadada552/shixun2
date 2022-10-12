"use strict";
var common_vendor = require("../../common/vendor.js");
var api_api = require("../../api/api.js");
require("../../api/http.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_parse2 = common_vendor.resolveComponent("u-parse");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_swiper2 + _easycom_u_icon2 + _easycom_u_parse2 + _easycom_u_button2)();
}
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_parse = () => "../../uni_modules/vk-uview-ui/components/u-parse/u-parse.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_swiper + _easycom_u_icon + _easycom_u_parse + _easycom_u_button)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const data = common_vendor.reactive({
      goodsItem: {},
      carList: []
    });
    const gocar = () => {
      common_vendor.index.switchTab({
        url: "/pages/car/car"
      });
    };
    const addcar = () => {
      let obj = {
        price: data.goodsItem.goods_price,
        name: data.goodsItem.goods_name,
        pic: data.goodsItem.goods_small_logo,
        num: 1,
        status: false,
        id: data.goodsItem.goods_id
      };
      common_vendor.index.getStorage({
        key: "carList",
        success: (res) => {
          data.carList = res.data;
          let index = data.carList.findIndex((item) => {
            return item.id == obj.id;
          });
          if (index != -1) {
            data.carList[index].num++;
            common_vendor.index.setStorage({
              key: "carList",
              data: data.carList,
              success: () => {
                console.log(1);
              }
            });
          } else {
            data.carList.push(obj);
            common_vendor.index.setStorage({
              key: "carList",
              data: data.carList,
              success: () => {
                console.log(2);
              }
            });
          }
        },
        fail() {
          common_vendor.index.setStorage({
            key: "carList",
            data: data.carList,
            success: () => {
              console.log(3);
            }
          });
        }
      });
    };
    common_vendor.onLoad((opt) => {
      api_api.getGoodsDetail(opt.id).then((res) => {
        data.goodsItem = res.message;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          list: data.goodsItem.pics,
          height: "680",
          name: "pics_mid_url"
        }),
        b: common_vendor.t(data.goodsItem.goods_price),
        c: common_vendor.t(data.goodsItem.goods_name),
        d: common_vendor.p({
          name: "star"
        }),
        e: common_vendor.p({
          html: data.goodsItem.goods_introduce
        }),
        f: common_vendor.p({
          name: "share"
        }),
        g: common_vendor.p({
          name: "share"
        }),
        h: common_vendor.p({
          name: "shopping-cart"
        }),
        i: common_vendor.o(gocar),
        j: common_vendor.o(addcar),
        k: common_vendor.p({
          type: "warning"
        }),
        l: common_vendor.p({
          type: "error"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e159eb4"], ["__file", "C:/Users/jiabin/Desktop/uni-app/shixun2/best-buy-bail/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
