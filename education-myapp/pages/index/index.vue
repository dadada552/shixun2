<template>
	<!-- 轮播图 -->
	<view class="banner-box" :style="{backgroundImage: bgcList[index]}">
		<mxgBanner ref="bannerbox" @change="changeBgc"></mxgBanner>
	</view>
	<!-- 热门推荐分类 -->
	<view class="hot-recom">
		<view class="recom-item" v-for=" item in recomList" :key="item.id" @click="goshowList(item)">
			{{item.name}}
		</view>
		<view class="recom-item">
			全部分类
		</view>
	</view>
	<!-- 热门推荐 -->
	<my-title title="热门推荐" tag='hot'></my-title>
	<scroll-view class="hot-recom-item" scroll-x="true">
		<view class="left">
			<view class="item" @click="goinfo(item)" v-for="item in hotListLeft" :key="item.id">
				<my-goods :item="item"  :flag="false"></my-goods>
			</view>
		</view>
		<view class="right">
			<view class="item" v-for="item in hotListRight" :key="item.id" @click="goinfo(item)">
				<my-goods :item="item" :flag="false"></my-goods>
			</view>
		</view>
	</scroll-view>
	<!-- 近期上新 -->
	<my-title title="近期上新" tag='new'></my-title>
		<scroll-view scroll-x="true" class="newgoods" >
			<view class="newgoods-box">
				<view v-for="item in newList" :key="item.id" class="newgoods-item" @click="goinfo(item)">
					<my-goods   :item = 'item' :flag='true'></my-goods>
				</view>
			</view>
		</scroll-view>
		<!-- 免费精选 -->
	<my-title title="免费精选" tag="FREE"></my-title>	
	<scroll-view class="hot-recom-item" scroll-x="true">
		<view class="left">
			<view class="item" v-for="item in freeListleft" :key="item.id" @click="goinfo(item)">
				<my-goods :item="item" :flag="false"></my-goods>
			</view>
		</view>
		<view class="right">
			<view class="item" v-for="item in freeListright" :key="item.id" @click="goinfo(item)">
				<my-goods :item="item" :flag="false"></my-goods>
			</view>
		</view>
	</scroll-view>
	<!-- 付费精品 -->
	<my-title title="付费精品" tag="NICE"></my-title>
	<view class="nice-box">
		<view class="item" v-for="item in niceList" :key="item.id" @click="goinfo(item)">
			<my-goods :item="item" :flag="false"></my-goods>
		</view>
		<view class="bottom" v-if="isshow">
			---我是有底线的----
		</view>
	</view>
	<view class="gotop iconfont" @click="gotop" v-show="gotopShow" >
		&#xe633;
	</view>
</template>

<script>
	import {
		reactive,
		toRefs
	} from 'vue';
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	import mxgBanner from '@/components/mxg-banner/mxg-banner.vue'
	import myTitle from '@/components/my-title/my-title.vue'
	import mygoods from '@/components/my-goods/my-goods.vue'
	import {
		getHotrecom,getHotList,getNewList,getFreeList,getNiceList
	} from '@/api/api.js'
	export default {
		components: {
			mxgBanner
		},
		setup() {
			const data = reactive({
				bgcList: [
					'linear-gradient(rgb(0, 108, 0) 50%, rgb(255, 255, 255))',
					'linear-gradient(rgb(69, 50, 140) 50%, rgb(255, 255, 255))',
					'linear-gradient(rgb(0, 114, 183) 50%, rgb(255, 255, 255))'
				],
				topbgclist: [
					'#006c00', '#45328c', '#0072b7'
				],
				index: 0,
				recomList: [],
				hotListLeft: [],
				hotListRight:[],
				newList:[],
				freeListleft:[],
				freeListright:[],
				niceList:[],
				current:1,
				status:true,
				isshow:false,
				gotopShow:false
			});
			const router = useRouter();
			const route = useRoute();
			//设置 顶部导航栏跟随轮播图改变颜色
			const changeBgc = (e) => {
				data.index = e.detail.current
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: data.topbgclist[data.index],
				})
			}
			/**跳转详情*/
			const goinfo = (obj)=>{
				console.log(obj.id);
				uni.navigateTo({
					url:`/pages/info/info`
				})
			}
			//获取首页热门商品分类
			getHotrecom().then((res) => {
				data.recomList = res.data.data.slice(0, res.data.data.length - 2)
			})
			// 获取热门推荐
			getHotList({current:1,size:8,sort:'hot'}).then((res)=>{
				data.hotListLeft = res.data.data.records.slice(0,5)
				data.hotListRight = res.data.data.records.slice(5,res.data.data.records.length)
			})
			//获取近期上新
			getNewList({current:1,size:8,sort:'new'}).then((res)=>{
				// console.log(res);
				data.newList = res.data.data.records
			})
			//获取免费精选
			getHotList({current:1,size:8,isFree:'1'}).then((res)=>{
				data.freeListleft = res.data.data.records.slice(0,5)
				data.freeListright = res.data.data.records.slice(5,res.data.data.records.length)
			})
			//获取付费精品
			getNiceList({current:1,size:8,isFree:'0'}).then((res)=>{
				data.niceList = res.data.data.records
			})
			/**回到顶部*/
			const gotop = ()=>{
				uni.pageScrollTo({
					scrollTop:0
				})
			}
			/**点击跳转*/
			const goshowList = (item)=>{
				uni.navigateTo({
					url:`../showList/showList?id=${item.id}&&name=${item.name}`
				})
			}
			return {
				...toRefs(data),
				changeBgc,
				gotop,
				goshowList,
				goinfo
			}
		},
		onShow() {
			// 默认设置顶部导航栏颜色
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#006c00',

			})
		},
		//下拉加载数据
		onReachBottom() {
			if(this.status){
				this.status =false
				this.current ++;
				if(this.niceList.length > 40){
					return this.isshow = true
				}else{
						getNiceList({current:this.current,size:8,isFree:'0'}).then((res)=>{
								this.niceList = [...this.niceList,...res.data.data.records]
								
							})
						let timer =	setTimeout(()=>{
								this.status = true
							},1000)
				}
					
			}
		},
		//监听页面滚动
		onPageScroll(e){
			if(e.scrollTop>=1700){
				this.gotopShow = true
			}else{
				this.gotopShow = false
			}
		},
		onNavigationBarSearchInputClicked(e){
			uni.navigateTo({
				url:'../search/search'
			})
		}
		// onNavigationBarButtonTap(e) {
		// 	console.log("success")		
		// },
	}
</script>

<style lang='scss' scoped>
	.gotop{
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		bottom: 150rpx;
		right: 20rpx;
		background-color: #ccc;
		border-radius: 50%;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 50rpx
	}
	.banner-box {
		width: 100%;
		height: 450rpx;
		padding: 20rpx;
		padding-top: 20px;
	}

	.hot-recom {
		width: 100%;
		height: 150rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		background-color: #fff;
		padding: 0 40rpx;
		margin-bottom: 50rpx;

		.recom-item {
			flex: 20%;
			margin: 0 10rpx;
			text-align: center;
			background-color: #eee;
			border-radius: 20rpx;
			margin-top: 10rpx;
			line-height: 70rpx;
			font-size: 13px;
		}
	}

	.hot-recom-item {
		white-space: nowrap;

		.left {
			display: inline-block;
			width: 700rpx;
			.item {
				display: flex;
				justify-content: space-around;
				height: 220rpx;
				width: 90%;
				padding-bottom: 20rpx;
				border-bottom: 1px dashed #ccc;
				margin-left: 20rpx;
			}
		}

		.right {
			display: inline-block;
			width: 700rpx;
			.item {
				display: flex;
				justify-content: space-around;
				height: 220rpx;
				width: 100%;
				padding-bottom: 20rpx;
				border-bottom: 1px dashed #ccc;
				margin-left: 20rpx;
			}
		}
	}
	.newgoods{
		white-space: nowrap;
		margin: 30rpx 0;
		height: 380rpx;
		.newgoods-box{
			display: flex;
			
			.newgoods-item{
				margin: 0 20rpx;
				box-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
			}
		}
	}
	.nice-box{
		width: 100%;
		.item {
				display: flex;
				justify-content: space-around;
				height: 220rpx;
				width: 90%;
				padding-bottom: 20rpx;
				border-bottom: 1px dashed #ccc;
				margin-left: 20rpx;
			}
			.bottom{
				text-align: center;
				height: 200rpx;
				line-height: 200rpx;
			}
	}
</style>
