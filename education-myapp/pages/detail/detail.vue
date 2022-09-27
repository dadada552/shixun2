<template>
	<!-- 顶部返回按钮 -->
	<div class="back" v-if="topFlag == false">
		<div class="iconfont icon-back" @click="back"></div>
	</div>

	<div class="top-back" v-if="topFlag == true">
		<div class="back-left">
			<div class="iconfont icon-back" @click="back"></div>
		</div>
		{{info.title}}
	</div>

	<!-- 头部大图 -->
	<view class="head-img">
		<img :src="info.mainImage" alt="">
	</view>

	<div class="head-info">
		<div class="info-price">￥{{info.priceDiscount}} <del>￥{{info.priceOriginal}}</del> <text
				class="rebate">优惠价</text> </div>
		<div class="info-title"> {{info.title}} </div>
		<div class="info-msg">
			<text class="acclaim">
				<text class="iconfont icon-haoping2"></text>
				{{info.goodRate}}好评
			</text>
			<text class="acclaim">
				<text class="iconfont icon-touxiang2"></text>
				{{info.studyTotal}}人在学
			</text>
		</div>
	</div>

	<div class="foot-btn">
		<div class="go-buy">
			立即购买
		</div>
	</div>

	<!-- 详情介绍 -->
	<view>
		<view style="border-bottom: 1px solid #eee;">
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
				swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			style="height: 580px;">
			<!-- 详情 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 4000rpx;width: 100%;" @scrolltolower="onreachBottom">
					<view style="padding-bottom: 50px;">
						<img :src="info.detailUrls" alt="" style="width: 100%;">
					</view>
				</scroll-view>
			</swiper-item>

			<!-- 章节 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
					<view style="padding-bottom: 87px;">
						<view class="chapters" v-for="item,index in chapter" :key="item.id">
							<view class="chapter-title">
								第{{index+1}}章 {{item.name}}
							</view>
							<view class="chapter-cnt">
								<view class="cnt-item" v-for="child,i in item.sectionList" :key="child.id">
									<text class="iconfont icon-roundrightfill"></text>
									<text style="margin: 0 5px;">{{`${index+1}-${i+1}`}}</text>
									<text>{{child.name}}</text>
									<view class="look">
										试看
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>

			<!-- 评论 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
					<view style="padding-bottom: 65px;">
						<view class="comment" v-for="item in comment" :key="item.id">
							<view class="comment-head">
								<view class="head-left">
									<img v-if="item.userImage != null" :src="item.userImage" alt="">
									<img v-else src="/static/tab/my.png" alt="">
									<view class="head-msg">
										<view class="nick-name">
											{{item.nickName}}
										</view>
										<view class="create-time">
											{{ timer(+new Date(item.createDate)) }}
										</view>
									</view>
								</view>
								<div class="head-right">
									<view v-if="item.isGood == 1" class="iconfont icon-haoping2" style="color:#ccc">
									</view>
									<view v-else class="iconfont icon-haoping2" style="color:red"></view>
								</div>
							</view>
							<view class="comment-cnt">
								{{item.content}}
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>

			<!-- 套餐 -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 800rpx;width: 100%;" @scrolltolower="onreachBottom">
					<view>
						<view class="group" v-for="item in group" :key="item.id">
							<view class="group-title">
								{{item.title}}
							</view>
							<view class="group-list">
								<view class="list-item" v-for="child in item.list" :key="item.id">
									<div class="list-img">
										<img :src="child.mainImage" alt="">
										<view class="timer">
											10:04:21
										</view>
									</div>
									<div class="list-msg">
										<view class="list-title">
											{{child.title}}
										</view>
										<view class="user">
											<text class="iconfont icon-laoshi2" style="font-size: 10px;"></text>
											{{child.nickName}}
										</view>
										<view class="foot">
											<view class="price">
												<text class="iconfont icon-moneybag"
													style="font-size: 12px;"></text>{{child.priceDiscount}}
											</view>
											<view class="study">
												<text class="iconfont icon-moneybag"
													style="font-size: 12px;"></text>{{child.studyTotal}}人在学
											</view>
										</view>
									</div>
								</view>
							</view>
							<div class="buy-group">
								<div class="group-price">
									￥{{item.totalPrice}} <del>￥{{item.groupPrice}}</del>
								</div>
								<div class="gobuy">
									购买套餐
								</div>
							</div>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
	import {
		timer
	} from '../../utils/time.js'
	import {
		reactive,
		toRefs,
		nextTick,
		ref
	} from 'vue'
	import {
		getDetailInfo,
		getDetailChapter,
		getDetailComment,
		getDetailGroup
	} from '../../api/api.js'
	import {
		onPageScroll,
		onShow
	} from "@dcloudio/uni-app";

	const uTabs = ref()

	const data = reactive({
		list: [{
			name: '详情'
		}, {
			name: '章节'
		}, {
			name: '评论'
		}, {
			name: '套餐'
		}],
		// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
		current: 0, // tabs组件的current值，表示当前活动的tab选项
		swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
		info: {}, // 详情
		chapter: [], // 章节
		comment: [], // 评论
		group: [], // 套餐
		topFlag: false, // 是否显示顶部导航栏
	})

	// 监听滚动条距离
	onPageScroll((e) => {
		if (e.scrollTop > 200) {
			data.topFlag = true
		} else {
			data.topFlag = false
		}
	})

	// 返回顶部
	const back = () => {
		uni.navigateBack()
	}

	// tabs通知swiper切换
	const tabsChange = (index) => {
		data.swiperCurrent = index;
	}
	// swiper-item左右移动，通知tabs的滑块跟随移动
	const transition = (e) => {
		let dx = e.detail.dx;
		nextTick(() => {
			uTabs.value.setDx(dx);
		})
	}
	// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
	// swiper滑动结束，分别设置tabs和swiper的状态
	const animationfinish = (e) => {
		let current = e.detail.current;
		nextTick(() => {
			uTabs.value.setFinishCurrent(current);
		})
		data.swiperCurrent = current;
		data.current = current;
	}
	// 触底加载
	const onreachBottom = () => {
		console.log(1);
	}

	// 请求详情数据
	getDetailInfo().then(res => {
		data.info = res.data.data
	})

	// 请求章节
	getDetailChapter().then(res => {
		data.chapter = res.data.data
	})

	// 请求评论
	getDetailComment().then(res => {
		data.comment = res.data.data
	})

	// 请求套餐
	getDetailGroup().then(res => {
		console.log(res);
		data.group = res.data.data
	})

	const {
		list,
		current,
		swiperCurrent,
		info,
		chapter,
		comment,
		group,
		topFlag
	} = toRefs(data)
</script>

<style lang="scss">
	.top-back {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgb(52, 93, 194);
		color: rgb(255, 255, 255);
		font-weight: 700;
		font-size: 16px;
		opacity: 1;

		.back-left {
			float: left;
			margin-left: 10px;

			.icon-back {
				font-size: 24px;
			}
		}
	}

	.back {
		width: 40px;
		height: 40px;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 5px;
		left: 5px;
		border-radius: 50%;
		text-align: center;
		line-height: 40px;

		.icon-back {
			color: white;
			font-size: 24px;
		}
	}

	.foot-btn {
		width: 100%;
		position: fixed;
		height: 50px;
		border-top: 0.5px solid #efeff4;
		bottom: 0;
		left: 0;
		z-index: 1;
		background-color: #fff;

		.go-buy {
			width: 98%;
			background-color: #345dc2;
			text-align: center;
			font-size: 17px;
			color: #fff;
			border-radius: 25px;
			line-height: 40px;
			margin: 5px auto;
		}
	}

	.group {
		margin: 18px 15px;
		border-radius: 10px;
		box-shadow: 2px 0 10px 0 rgb(0 0 0 / 10%);
		padding: 0 10px;
		box-sizing: border-box;
		overflow: hidden;

		.buy-group {
			width: 100%;
			display: flex;
			padding: 10px 0;
			justify-content: space-between;

			.group-price {
				color: #fa140e;
				font-size: 18px;
				font-weight: 700;

				del {
					font-size: 16px;
					color: #999;
					font-weight: 400;
				}
			}

			.gobuy {
				color: #fa140e;
				font-size: 15px;
				font-weight: 700;
			}
		}

		.group-title {
			font-size: 17px;
			font-weight: 500;
			margin-top: 5px;
		}

		.group-list {
			width: 100%;
			padding-top: 5px;

			.list-item {
				width: 100%;
				display: flex;
				padding: 10px;
				border-bottom: 0.5px solid #f1f1f1;

				.list-img {
					position: relative;
					width: 45%;

					.timer {
						position: absolute;
						bottom: 5px;
						right: 2px;
						font-size: 11px;
						color: #fff;
						background: rgba(51, 51, 51, .4);
						border-radius: 10px;
						padding: 0 4px;
					}

					img {
						width: 100%;
						height: 80px;
						border-radius: 5px;
					}
				}

				.list-msg {
					flex: 1;
					margin-left: 10px;

					.list-title {
						font-size: 14px;
						font-weight: 700;
						height: 40px;
					}

					.user {
						font-size: 10px;
						color: #999;
						margin-top: 8px;
					}

					.foot {
						display: flex;

						.price {
							color: #fb6932;
							font-size: 14px;
							margin-right: 10px;
						}
					}
				}
			}
		}
	}

	.comment {
		width: 100%;
		padding: 0 18px;
		margin-top: 20px;

		.comment-cnt {
			width: 100%;
			padding: 10px 0;
			border-bottom: 0.5px solid #efeff4;
			font-size: 16px;
		}

		.comment-head {
			width: 100%;
			display: flex;

			.head-left {
				width: 40%;
				display: flex;

				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin-right: 10px;
				}

				.nick-name {
					font-weight: 600;
					font-size: 16px
				}

				.create-time {
					color: #999;
					font-size: 12px;
					overflow: hidden;
					white-space: nowrap;
				}
			}

			.head-right {
				flex: 1;

				.icon-haoping2 {
					text-align: right;
				}
			}
		}
	}

	.chapters {
		width: 100%;
		padding: 0 18px;

		.chapter-title {
			width: 100%;
			margin-top: 20px;
			color: #333;
			font-size: 17px;
			font-weight: 700;
		}

		.chapter-cnt {
			width: 100%;

			.cnt-item {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				border-bottom: 0.5px solid #efeff4;

				.look {
					float: right;
					color: #007aff;
					font-size: 12px;
				}
			}
		}
	}

	.head-info {
		padding: 12px;
		box-sizing: border-box;
		border-top: 10px solid #f8f9fb;
		border-bottom: 10px solid #f8f9fb;

		.info-msg {
			padding: 7px 0;
			font-size: 10px;

			.acclaim {
				margin-right: 7px;
				color: #7d828f;
				background-color: #f8f9fb;
				padding: 7px;
				border-radius: 15px;
			}
		}

		.info-title {
			font-size: 17px;
			font-weight: 700;
			color: #1d1d1f;
			padding-left: 4px;
		}

		.info-price {
			color: #fa140e;
			font-size: 23px;
			font-weight: 700;

			del {
				color: #b6bbbf;
				font-size: 14px;
			}

			.rebate {
				font-size: 10px;
				color: #fa140e;
				border: 1px solid #fa140e;
				border-radius: 5px;
				padding: 0 1px;
				font-weight: 400;
			}
		}
	}

	.head-img {
		width: 100%;

		img {
			width: 100%;
		}
	}
</style>
