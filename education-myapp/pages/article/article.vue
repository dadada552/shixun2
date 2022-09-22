<template>
	<view>
		<scroll-view scroll-X="true" class="top-box" :scroll-left="topindex*75-150" :scroll-with-animation='true'
			show-scrollbar="false">
			<view :class=" topindex == index? ' active top-box-item' :'top-box-item' " v-for="item,index in topList"
				:key="item.id" @click="changeindex(item,index)">
				{{item.name}}
			</view>
		</scroll-view>
		<swiper class="swiper-box" @change="changePage" :current="topindex">
			<swiper-item v-for="item in 9">
				<scroll-view class="scroll-box" scroll-y="true">
					<view class="content">
						<view class="content-box" v-for="item in readList">
							<view class="left">
								<view class="title">
									{{item.title}}
								</view>
								<view class="desc">
									{{item.summary}}
								</view>
								<view class="nameBox">
									<text class="teach"> {{item.nickName}} </text>
									<text class="date">·{{item.updateDate}}</text>
									<text class="good"> ·{{item.thumhup}}赞</text>
								</view>
							</view>
							<view class="right" v-if="item.imageUrl != null">
								<image :src="item.imageUrl"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="bottom" v-if="isshow">
					---我是有底线的----
				</view>
			</swiper-item>
		</swiper>

		<view class="gotop iconfont" @click="gotop" v-show="gotopShow">
			&#xe633;
		</view>

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
	import {
		getHotrecom,
		getReadList
	} from '@/api/api.js'
	import gotop from '@/components/gotop/gotop.vue'
	export default {
		setup() {

			const data = reactive({
				topList: [],
				topindex: 0,
				readList: [],
				status: true,
				current: 1,
				categoryId: 0,
				isshow: false,
				gotopShow: false
			});
			const router = useRouter();
			const route = useRoute();
			getHotrecom().then((res) => {
				data.topList = res.data.data
			})
			getReadList({
				current: 1,
				size: 10,
				categoryId: 0
			}).then((res) => {
				data.readList = res.data.data.records
			})
			const changeindex = (obj, index) => {
				data.topindex = index
			}
			const gotop = () => {
				uni.pageScrollTo({
					scrollTop: 0
				})
			}
			const changePage = (e) => {
				// console.log(e.detail.current);
				data.topindex = e.detail.current
				getReadList({
					current: 1,
					size: 10,
					categoryId: data.topList[data.topindex].id
				}).then((res) => {
					data.readList = res.data.data.records
				})
			}
			return {
				changeindex,
				gotop,
				changePage,
				...toRefs(data)
			}
		},
		onReachBottom() {
			if (this.status) {
				this.status = false
				this.current++;
				if (this.readList.length > 40) {
					return this.isshow = true
				} else {
					getReadList({
						current: this.current,
						size: 10,
						categoryId: this.categoryId
					}).then((res) => {
						this.readList = [...this.readList, ...res.data.data.records]
					})
					let timer = setTimeout(() => {
						this.status = true
					}, 1000)
				}

			}
		},
		onPageScroll(e) {
			if (e.scrollTop >= 1700) {
				this.gotopShow = true
			} else {
				this.gotopShow = false
			}
		}
	}
</script>

<style lang='scss' scoped>
	.swiper-box {
		height: calc(100vh - 220rpx);
	}
	.scroll-box{
		height: calc(100vh - 220rpx);
	}
	.gotop {
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

	.top-box {
		white-space: nowrap;
		height: 120rpx;
		width: 100%;
		position: fixed;
		top: 70rpx;
		left: 0;
		background-color: #fff;
		z-index: 99;
		line-height: 120rpx;

		.top-box-item {
			display: inline-block;
			width: 150rpx;
			height: 80rpx;
			font-size: 30rpx;
			line-height: 90rpx;
			text-align: center;
			position: relative;
		}

		.active {
			color: #36f;
		}

		.active::before {
			content: '';
			position: absolute;
			bottom: -5rpx;
			left: 20rpx;
			width: 120rpx;
			height: 5rpx;
			background-color: #39f;
		}

	}

	.content {
		width: 100%;
		margin-top: 100rpx;

		.content-box {
			display: flex;
			justify-content: space-around;
			padding: 0 20rpx;
			margin: 30rpx 0;
			height: 220rpx;

			.left {
				flex: 1;

				.title {
					font-weight: 600;
					font-size: 34rpx;
				}

				.desc {
					font-size: 10pt !important;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
					display: -webkit-box !important;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					color: #bbb;
				}

				.nameBox {
					.teach {
						font-size: 32rpx;
					}

					.date,
					.good {
						font-size: 28rpx;
						color: #bbb;
					}
				}
			}

			.right {
				width: 30%;

				image {
					width: 220rpx;
					height: 140rpx;
					border-radius: 20rpx;
				}
			}
		}
	}

	.bottom {
		text-align: center;
		height: 200rpx;
		line-height: 200rpx;
	}
</style>
