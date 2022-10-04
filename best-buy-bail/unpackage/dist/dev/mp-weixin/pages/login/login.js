"use strict";
var common_vendor = require("../../common/vendor.js");
var api_api = require("../../api/api.js");
require("../../api/http.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const data = common_vendor.reactive({
      code: ""
    });
    common_vendor.onLoad(() => {
      common_vendor.index.login({
        success(res) {
          data.code = res.code;
        }
      });
    });
    const getUserInfo = () => {
      common_vendor.index.getUserProfile({
        desc: "Wexin",
        success: (res) => {
          console.log(data.code);
          api_api.getToken({
            encryptedData: res.encryptedData,
            rawData: res.rawData,
            iv: res.iv,
            signature: res.signature,
            code: data.code
          }).then((r) => {
            console.log(r);
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getUserInfo),
        b: common_vendor.p({
          type: "success",
          plain: true
        })
      };
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/jiabin/Desktop/uni-app/shixun2/best-buy-bail/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
