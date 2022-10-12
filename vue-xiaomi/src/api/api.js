import server from './http.js' //导入axios

//首页轮播
const carousel = () =>  server.post('/resources/carousel')



const login = (msg) => {
   let data = server.post('/users/login', msg)
   return data
}
const shoppingCart = (msg) => {
   let data = server.post('/user/shoppingCart/getShoppingCart', msg)
   return data
}
// 获取首页商品
const getshopinhome = (msg) => {
   let data = server.post(`product/getPromoProduct`, msg)
   return data
}
// 注册
const register = (msg) => {
   let data = server.post('users/register', msg)
   return data
}
// 关于我们
const getAllProduct = () => {
   let data = server.post("product/getAllProduct")
   return data
}
//首页全部商品分类
const getAllgoodscate = () => {
   let data = server.post("product/getCategory")
   return data
}
// 获取热门商品
const getHotProduct = (msg) => {
   let data = server.post("product/getHotProduct", msg)
   return data
}
//获取全部商品
const getAllgoods = (msg) => {
   let data = server.post("product/getAllProduct", msg)
   return data
}
const getProductByCategory = (msg) => {
   let data = server.post("product/getProductByCategory", msg)
   return data
}
//获取商品详情
const getDetails = (msg) => {
   let data = server.post("product/getDetails", msg)
   return data
}
//获取商品轮播图
const getDetailsPicture = (msg) => {
   let data = server.post("product/getDetailsPicture", msg)
   return data
}
//获取到我的收藏数据
const getCollect = (msg) => {
   let data = server.post("user/collect/getCollect", msg)
   return data
}
//添加我的收藏
const addCollect = (msg) => {
   let data = server.post("user/collect/addCollect", msg)
   return data
}
//删除收藏数据
const delCollect = (msg) => {
   let data = server.post("user/collect/deleteCollect", msg)
   return data
}
//添加购物车
const addcar = (msg) => {
   let data = server.post("user/shoppingCart/addShoppingCart", msg)
   return data
}
//修改购物车数量
const updateShoppingCart = (msg) => {
   let data = server.post("user/shoppingCart/updateShoppingCart", msg)
   return data
}
//订单页面
const getOrder = (msg) => {
   let data = server.post("user/order/getOrder", msg)
   return data
}
//添加订单
const addOrder = (msg) => {
   let data = server.post("user/order/addOrder", msg)
   return data
}
//得到购物车数据
const getcar = (msg) => {
   let data = server.post("user/shoppingCart/getShoppingCart", msg)
   return data
}
//搜索
const seachGoods = (msg) => {
   let data = server.post("product/getProductBySearch", msg)
   return data
}
export {
   carousel,
   login,
   shoppingCart,
   getshopinhome,
   register,
   getAllProduct,
   getAllgoodscate,
   getAllgoods,
   getProductByCategory,
   getDetails,
   getDetailsPicture,
   getHotProduct,
   getCollect,
   addCollect,
   delCollect,
   addcar,
   updateShoppingCart,
   getOrder,
   addOrder,
   getcar,
   seachGoods
}