"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  (_easycom_u_button2 + _easycom_u_checkbox2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_checkbox = () => "../../uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_checkbox)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "car",
  setup(__props) {
    const data = common_vendor.reactive({
      checked: false
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "success",
          plain: true
        }),
        b: common_vendor.o(($event) => data.checked = $event),
        c: common_vendor.p({
          disabled: false,
          modelValue: data.checked
        }),
        d: common_vendor.p({
          type: "error"
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/jiabin/Desktop/uni-app/shixun2/best-buy-bail/pages/car/car.vue"]]);
wx.createPage(MiniProgramPage);
