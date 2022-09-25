<template>
	<view class="falsebar">
	</view>
	<view class="goback" @click="goback">
		<view class="goback-item">

		</view>
	</view>
	<view>
		<image v-show="isshow" :src="infoData.mainImage" class="img" mode="widthFix"></image>
		<view v-show="isshow" class="content-box" style="padding: 40rpx 20rpx;">
			<view class="content">
				<text class="nowPrice"> ￥{{infoData.priceDiscount}} </text>
				<text class="agoPrice"> ￥{{infoData.priceOriginal}} </text>
				<text class="text">优惠价 </text>
			</view>
			<view class="title">
				{{infoData.title}}
			</view>
			<view class="bottom-text">
				<text class="iconfont icon-haoping2"> {{infoData.goodRate}}好评</text>
				<text class="iconfont icon-touxiang2">{{infoData.studyTotal}}在学 </text>
			</view>
		</view>
	</view>
	<view class="bottom-content">
		<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false">
		</u-tabs-swiper>
		<swiper class="swiper-box" circular :current="swiperCurrent" @transition="transition"
			@animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="item in 4" :key="item">
				<scroll-view :scroll-y="isflag" style="800rpx">
					<image v-show="current == 0" class="img" :src="imgUrl" alt="" mode="widthFix"></image>
					<view v-show="current == 1" class="box" v-for="(obj, index) in dataList" :key="index">
						<view class="title">
							第{{index+1}}章 {{obj.name}}
						</view>
						<view class="title-item" v-for="data,i in obj.sectionList" :key="data.id">
							{{index+1}} - {{i+1}} {{data.name}}
						</view>
					</view>
					<view v-show="current == 2" class="pinglun">
						<view class="pinglun-item" v-for="item in pinglunList">
							<view class="top-box">
								<view class="img-box">
									<image src="/static/tab/my.png" mode="widthFix"></image>
								</view>
								<view class="name-box">
									{{item.nickName}}
									<view class="timeBox">
										{{item.createDate}}
									</view>
								</view>
								<view class="icon-box">
									<text class="iconfont icon-haoping2  icon"></text>
								</view>
							</view>
							<view class="pinglun-content">
								{{item.content}}
							</view>
							<view class="huifu-content" v-if="item.children">
								讲师回复：{{item.children.content}}
							</view>
						</view>
					</view>
					<view class="taocan" v-show="current == 3">
						<view class="taocan-item" v-for="item,index in taocanData" :key="index">
							<view class="taocan-title">
								{{item.title}}
							</view>
							<view class="taocan-list" v-for="obj in item.list" :key="obj.id">
								<mygoods :item="obj" :flag="false"></mygoods>
							</view>
							<view class="price-box">
								<view class="left">
									<text class="now"> ￥{{item.totalPrice}} </text>
									<text class="last"> ￥{{item.groupPrice}} </text>
								</view>
								<view class="right">
									购买套餐
								</view>
							</view>
						</view>
						
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>

	<view class="btn-box">
		<u-button class="btn" type="primary">立即购买</u-button>
	</view>
	<view class="zhan">
		
	</view>
</template>

<script>
	import {
		ref,
		reactive,
		toRefs
	} from 'vue';
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	import {
		getinfo,
		getzhangjie,
		getcomment,
		getGroup
	} from '@/api/api.js'
	import mygoods from '@/components/my-goods/my-goods.vue'
	export default {
		components:{
			mygoods
		},
		setup(props, ctx) {
			const uTabs = ref(null)
			const data = reactive({
				infoData: '',
				list: [{
						name: '详情'
					}, {
						name: '章节'
					}, {
						name: '评论'
					},
					{
						name: '套餐'
					}
				],
				current: 0,
				imgUrl: '',
				swiperCurrent: 0,
				dataList: [], //章节数据
				pinglunList: [], //评论的数据
				taocanData:[],
				isshow: true,
				isflag: false, //是否开启详情区域滚动
				detailTop: 0, //详情区域距离顶部距离
				statusNavHeight: 0, //状态栏+导航栏的高度
			});
			const router = useRouter();
			const route = useRoute();
			/*tab改变事件**/
			const tabsChange = (e) => {
				data.swiperCurrent = e
			}
			const transition = (e) => {
				let dx = e.detail.dx;
				uTabs.value.setDx(dx)
			}
			const animationfinish = (e) => {
				let current = e.detail.current;
				uTabs.value.setFinishCurrent(current)
				data.swiperCurrent = current
				data.current = current
			}
			const goback = ()=>{
				uni.navigateBack({
					delta:1
				})
			}
			return {
				tabsChange,
				transition,
				goback,
				animationfinish,
				uTabs,
				...toRefs(data)
			}
		},
		onLoad(opt) {
			getinfo().then((res) => {
				this.infoData = res.data.data
				this.imgUrl = res.data.data.detailUrls[0]
			})
			getzhangjie().then((res) => {
				this.dataList = res.data.data
			})
			getcomment().then((res) => {
				this.pinglunList = res.data.data
			})
			getGroup().then((res) => {
				console.log(res);
				this.taocanData = res.data.data
			})
		},
		onReachBottom() {
			//页面到达底部，开启详情区域滚动
			this.isflag = true
		},
		onReady() {
			// 获取详情区域距离顶部高度
			let view = uni.createSelectorQuery().in(this).select(".bottom-content");
			view.fields({
				rect: true
			}, data => {
				// console.log("节点的顶部高度为" + data.top);
				this.detailTop = data.top
			}).exec();
		},
		onPageScroll(e) {
			if (this.detailTop - this.statusNavHeight <= e.scrollTop) {
				// 页面到达底部则将详情区域滚动条开启
				this.enableScroll = true
				return
			}
			// 当前滚动条距离顶部距离 小于 详情区域到达顶部高度
			if (this.enableScroll && e.scrollTop < this.detailTop) {
				// 禁用详情滚动
				this.enableScroll = false
			}
		}
	}
</script>

<style lang='scss' scoped>
	.zhan{
		height: 120rpx;
		width: 100%;
	}
	.falsebar {
		height: var(--status-bar-height);
		background-color: #007AFF;
		width: 100%;
	}

	.img {
		width: 100%;
	}

	.u-tabs {
		height: 100rpx;
	}

	.box {
		padding: 0 20rpx;
	}

	.goback {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		top: 20rpx;
		left: 20rpx;
		z-index: 9;
		background-color: #aaa;
		opacity: .5;

		.goback-item {
			width: 50rpx;
			height: 50rpx;
			border-left: 5px solid #eee;
			border-bottom: 5px solid #eee;
			rotate: 45deg;
			margin-top: 24rpx;
			margin-left: 35rpx;
		}
	}

	.img {
		width: 750rpx;
	}

	.nowPrice {
		color: red;
		font-size: 60rpx;
	}

	.agoPrice {
		text-decoration: line-through;
		margin: 0 20rpx;
		color: #ccc;
	}

	.text {
		padding: 10rpx 20rpx;
		border: 1px solid red;
		border-radius: 20rpx;
		color: red;
	}

	.title {
		font-size: 40rpx;
		font-weight: 700;
		margin-top: 20rpx;
	}

	.title-item {
		height: 80rpx;
		border-bottom: 1px solid #ccc;
		line-height: 80rpx;
	}

	.bottom-text {
		margin-top: 10rpx;

		text {
			margin-right: 10rpx;
			padding: 0 20rpx;
			background-color: #eee;
			border-radius: 20rpx;
			color: #aaa;
		}
	}

	.content-box {
		border-bottom: 20rpx solid #eee;
	}

	.btn-box {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 0 30rpx;
		background-color: #fff;
	}

	.btn {
		border-radius: 50rpx;
		width: 100%;
	}

	.swiper-box {
		height: 1250rpx;
	}

	.pinglun-item {
		padding: 10rpx 20rpx;
		border-bottom: 1px solid #ccc;

		.top-box {
			display: flex;
			justify-content: flex-start;
			height: 80rpx;

			.img-box {
				width: 10%;

				image {
					width: 100%;
					border-radius: 50%;
				}
			}

			.name-box {
				font-weight: 700;

				.timeBox {
					font-weight: 400;
				}
			}

			.icon-box {
				margin-left: 300rpx;
				line-height: 80rpx;
				color: #aaa;

				.icon {
					font-size: 40rpx;
				}

			}
		}

		.pinglun-content {
			margin: 10rpx 0 30rpx 0;
			font-size: 30rpx;
			font-weight: 400;
		}

		.huifu-content {
			padding: 20rpx 10rpx;
			background-color: #eee;
			margin-bottom: 20rpx;
			color: #7d828f;
		}
	}
	
	.taocan{
		padding: 0 20rpx ;
		margin-top:30rpx ;
		.taocan-item{
			padding: 10rpx;
			border-radius: 20rpx;
			border: 1px solid #eee;
			box-shadow: 2px 0 10px 0 rgb(0 0 0 / 10%);
			.taocan-title{
				font-size: 30rpx;
				font-weight: 600;
			}
			.taocan-list{
				margin-top: 20rpx;
					display: flex;
					justify-content: space-around;
					height: 220rpx;
					width: 90%;
					padding-bottom: 20rpx;
					border-bottom: 1px dashed #ccc;
					margin-left: 20rpx;
			}
			.price-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				.left{
					.now{
						font-size: 36rpx;
						color: red;
						font-weight: 600;
						margin-left: 10rpx;
					}
					.last{
						text-decoration: line-through;
					}
				}
				.right{
					font-size: 36rpx;
					color: red;
					font-weight: 600;
					margin-left: 10rpx;
				}
			}
		}
		
	}
</style>
