import http from './http'
/** 获取轮播图数据*/
const getbanner = () => {
  let data = http.get('article/api/advert/show/1')
  return data
}
/** 获取首页热门推荐分类*/
const getHotrecom = ()=>{
	let data = http.get('article/api/category/label/list')
	return data
}
/** 获取热门数据 */
const getHotList = (msg)=>{
	let data = http.post('course/api/course/search',msg)
	return data
}
/**获取近期上新数据*/
const getNewList = (msg)=>{
	let data = http.post('course/api/course/search',msg)
	return data
}
/**获取免费精选数据*/
const getFreeList = (msg)=>{
	let data = http.post('course/api/course/search',msg)
	return data
}
/**获取付费精品*/
const getNiceList = (msg)=>{
	let data = http.post('course/api/course/search',msg)
	return data
}
/**获取阅读数据*/
const getReadList = (msg)=>{
	let data = http.post('article/api/article/search',msg)
	return data
}
/**获取热门回答*/
const getHotquestionList = (msg)=>{
	let data = http.post('question/api/question/hot',msg)
	return data
}
/**获取最新问题*/
const getNewquestionList = (msg)=>{
	let data = http.post('question/api/question/new',msg)
	return data
}
/**获取等待回答*/
const getWaitquestionList = (msg)=>{
	let data = http.post('question/api/question/wait ',msg)
	return data
}
/**获取详情*/
const getinfo = ()=>{
	let data = http.get('course/api/course/null')
	return data
}
const getzhangjie = ()=>{
	let data = http.get('course/api/chapter/section/list/null')
	return data
}
const getcomment = ()=>{
	let data = http.get('course/api/comment/list/null')
	return data
}
const getGroup = ()=>{
	let data = http.get('course/api/group/list/null')
	return data
}
const getsearchData = (msg)=>{
	let data = http.post('course/api/course/search',msg)
	return data
}
export {
	getbanner,
	getsearchData,
	getGroup,
	getcomment,
	getinfo,
	getzhangjie,
	getHotrecom,
	getHotList,
	getNewList,
	getFreeList,
	getNiceList,
	getReadList,
	getHotquestionList,
	getWaitquestionList,
	getNewquestionList
}