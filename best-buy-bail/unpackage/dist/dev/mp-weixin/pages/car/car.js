"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_number_box2 = common_vendor.resolveComponent("u-number-box");
  (_easycom_u_button2 + _easycom_u_checkbox2 + _easycom_u_number_box2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_checkbox = () => "../../uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.js";
const _easycom_u_number_box = () => "../../uni_modules/vk-uview-ui/components/u-number-box/u-number-box.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_checkbox + _easycom_u_number_box)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "car",
  setup(__props) {
    const data = common_vendor.reactive({
      checked: false,
      carList: [],
      flag: false
    });
    const valChange = (obj, e) => {
      obj.num = e.value;
    };
    const selectAll = (e) => {
      data.carList.forEach((item) => {
        item.status = e.value;
      });
    };
    const priceAll = common_vendor.computed$1(() => {
      let pricenum = 0;
      let num = 0;
      data.carList.filter((item) => item.status == true).forEach((item) => {
        pricenum += item.price * item.num;
        num += item.num;
      });
      return {
        pricenum,
        num
      };
    });
    const goAddress = () => {
      common_vendor.index.chooseAddress({
        success(res) {
          console.log(res);
          data.address = res;
          data.flag = true;
          console.log(data.address);
        }
      });
    };
    const selectOne = (index, e) => {
      data.carList[index].status = e.value;
      data.checked = data.carList.every((item) => {
        return item.status;
      });
    };
    common_vendor.onLoad(() => {
      common_vendor.index.getStorage({
        key: "carList",
        success(res) {
          console.log(res.data);
          data.carList = res.data;
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !data.flag
      }, !data.flag ? {
        b: common_vendor.o(goAddress),
        c: common_vendor.p({
          type: "success",
          plain: true
        })
      } : {
        d: common_vendor.t(data.address.userName),
        e: common_vendor.t(data.address.telNumber),
        f: common_vendor.t(data.address.cityName),
        g: common_vendor.t(data.address.countyName),
        h: common_vendor.t(data.address.detailInfo)
      }, {
        i: data.carList.length == 0,
        j: common_vendor.f(data.carList, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => selectOne(index, $event)),
            b: "1ea085a0-1-" + i0,
            c: common_vendor.o(($event) => item.status = $event),
            d: common_vendor.p({
              modelValue: item.status
            }),
            e: item.pic,
            f: common_vendor.t(item.name),
            g: common_vendor.t(item.price),
            h: common_vendor.o(($event) => valChange(item, $event)),
            i: "1ea085a0-2-" + i0,
            j: common_vendor.o(($event) => item.num = $event),
            k: common_vendor.p({
              modelValue: item.num
            }),
            l: item.id
          };
        }),
        k: common_vendor.o(selectAll),
        l: common_vendor.o(($event) => data.checked = $event),
        m: common_vendor.p({
          disabled: false,
          modelValue: data.checked
        }),
        n: common_vendor.t(common_vendor.unref(priceAll).pricenum),
        o: common_vendor.t(common_vendor.unref(priceAll).num),
        p: common_vendor.p({
          type: "error"
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/jiabin/Desktop/uni-app/shixun2/best-buy-bail/pages/car/car.vue"]]);
wx.createPage(MiniProgramPage);
