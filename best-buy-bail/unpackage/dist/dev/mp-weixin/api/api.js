"use strict";
var api_http = require("./http.js");
const getBanner = (msg) => {
  return api_http.http({
    url: "home/swiperdata"
  }).then((res) => {
    return res.message;
  });
};
const getHomeCate = (msg) => {
  return api_http.http({
    url: "home/catitems"
  }).then((res) => {
    return res.message;
  });
};
const getFloorData = (msg) => {
  return api_http.http({
    url: "home/floordata"
  }).then((res) => {
    return res.message;
  });
};
const getCategories = (msg) => {
  return api_http.http({
    url: "categories"
  }).then((res) => {
    return res.message;
  });
};
const getSearchVal = (msg) => {
  return api_http.http({
    url: `goods/qsearch?query=${msg.searchVal}`
  }).then((res) => {
    return res.message;
  });
};
exports.getBanner = getBanner;
exports.getCategories = getCategories;
exports.getFloorData = getFloorData;
exports.getHomeCate = getHomeCate;
exports.getSearchVal = getSearchVal;
