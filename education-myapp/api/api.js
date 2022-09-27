import http from './http'
/** 获取轮播图数据*/
const getbanner = () => {
	let data = http.get('article/api/advert/show/1')
	return data
}

/** 获取推荐分类*/
const getHotrecom = () => {
	let data = http.get('article/api/category/label/list')
	return data
}

/** 获取热门数据 */
const getHotList = (msg) => {
	let data = http.post('course/api/course/search', msg)
	return data
}

/**获取近期上新数据*/
const getNewList = (msg) => {
	let data = http.post('course/api/course/search', msg)
	return data
}

/**获取免费精选*/
const getFreeList = (msg) => {
	let data = http.post('course/api/course/search', msg)
	return data
}

/**获取付费精选*/
const getPaymentList = (msg) => {
	let data = http.post('course/api/course/search', msg)
	return data
}

// 获取阅读列表
const getArticleList = (msg) => {
	let data = http.post('article/api/article/search', msg)
	return data
}

// 获取问答列表
const getReplyList = (msg) => {
	let data = http.post(`question/api/question/${msg.type}`, msg)
	return data
}

// 获取详情
const getDetailInfo = () => {
	let data = http.get('course/api/course/null')
	return data
}
// 获取章节
const getDetailChapter = () => {
	let data = http.get('course/api/chapter/section/list/null')
	return data
}

// 获取评论
const getDetailComment = () => {
	let data = http.get('course/api/comment/list/null')
	return data
}

// 获取详情
const getDetailGroup = () => {
	let data = http.get('course/api/group/list/null')
	return data
}

// 登录
const loginId = (msg) => {
	let data = http.post('auth/login', msg)
	return data
}

// 修改用户信息
const editUser = (msg) => {
	let data = http.put('system/user', msg)
	return data
}

// 请求我的订单
const getMyOrder = () => {
	let data = http.get('pay/order/user/list')
	return data
}

// 取消订单
const cancelOrder = () => {
	let data = http.put('pay/order/cancel')
	return data
}

// 请求我的余额
const getMyBalance = () => {
	let data = http.get('pay/user/balance')
	return data
}

// 搜索数据
const getsearchData = (msg) => {
	let data = http.post('course/api/course/search', msg)
	return data
}

// 请求我的学习
const getMyStudy = () => {
	let data = http.get('course/course/study/list')
	return data
}

// 请求列表详情
const getDetailList = (id) => {
	let data = http.get(`article/api/article/${id}`)
	return data
}

// 请求热门评论
const getHotComment = (id) => {
	let data = http.get(`article/api/comment/list/${id}`)
	return data
}

export {
	getbanner,
	getHotrecom,
	getHotList,
	getNewList,
	getFreeList,
	getPaymentList,
	getArticleList,
	getReplyList,
	getDetailInfo,
	getDetailChapter,
	getDetailComment,
	getDetailGroup,
	loginId,
	editUser,
	getMyOrder,
	cancelOrder,
	getMyBalance,
	getsearchData,
	getMyStudy,
	getDetailList,
	getHotComment
}
