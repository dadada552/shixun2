"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_button2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_icon2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_grid_item = () => "../../uni_modules/vk-uview-ui/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../uni_modules/vk-uview-ui/components/u-grid/u-grid.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "mine",
  setup(__props) {
    const gologin = () => {
      common_vendor.index.navigateTo({
        url: `/pages/login/login`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(gologin),
        b: common_vendor.p({
          type: "success",
          plain: true
        }),
        c: common_vendor.p({
          col: 4,
          border: false
        }),
        d: common_vendor.p({
          name: "order",
          color: "red",
          size: 46
        }),
        e: common_vendor.p({
          name: "rmb-circle",
          color: "red",
          size: 46
        }),
        f: common_vendor.p({
          name: "car",
          color: "red",
          size: 46
        }),
        g: common_vendor.p({
          name: "close-circle",
          color: "red",
          size: 46
        }),
        h: common_vendor.p({
          col: 4,
          border: false
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/jiabin/Desktop/uni-app/shixun2/best-buy-bail/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
