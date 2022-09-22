<template>
	<scroll-view scroll-X="true" class="top">
		<view :class=" activeIndex == 0 ? 'topitem active' : 'topitem' " @click="changeindex('hot',0)">
			热门回答
		</view>
		<view :class=" activeIndex == 1 ? 'topitem active' : 'topitem' " @click="changeindex('new',1)">
			最新问题
		</view>
		<view :class=" activeIndex == 2 ? 'topitem active' : 'topitem' " @click="changeindex('wait',2)">
			等待回答
		</view>
		
	</scroll-view>


	<swiper class="swiper-box" @change="changePage" :current="activeIndex">
		<swiper-item v-for="item in 3">
			<scroll-view class="scroll-box" scroll-y="true">
				<view class="content">
					<view class="content-item" v-for="item in hotQuestionList" :key="item.id">
						<view class="title">
							{{item.title}}
						</view>
						<view class="bottom-box">
							<view class="left">
								{{item.reply}}回复 {{item.thumhup}}浏览
							</view>
							<view class="right">
								{{item.nickName}}·{{item.updateDate}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="bottom" v-if="isshow">
				---我是有底线的----
			</view>
		</swiper-item>
	</swiper>

	<gotop :gotopShow="gotopShow"></gotop>
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
		getHotquestionList,
		getNewquestionList,
		getWaitquestionList
	} from '@/api/api.js'
	import gotop from '@/components/gotop/gotop.vue'
	export default {
		setup() {

			const data = reactive({
				activeIndex: 0,
				hotQuestionList: [],
				gotopShow: false,
				status: true,
				current: 1,
				isshow: false
			});
			const router = useRouter();
			const route = useRoute();
			getHotquestionList({
				current: 1,
				size: 10
			}).then((res) => {
				data.hotQuestionList = res.data.data.records
			})
			const changePage = (e) => {
				// console.log(e.detail.current);
				data.activeIndex = e.detail.current
				if (data.activeIndex == 0) {
					getHotquestionList({
						current: 1,
						size: 10
					}).then((res) => {
						data.hotQuestionList = res.data.data.records
						data.isshow = false
					})
				} else if (data.activeIndex == 1) {
					getNewquestionList({
						current: 1,
						size: 10
					}).then((res) => {
						data.hotQuestionList = res.data.data.records
						data.isshow = false
					})
				} else {
					getWaitquestionList({
						current: 1,
						size: 10
					}).then((res) => {
						data.hotQuestionList = res.data.data.records
						data.isshow = false
					})
				}
			}
			const changeindex = (type, index) => {
				data.activeIndex = index
				
			}
			return {
				changeindex,
				changePage,
				...toRefs(data)
			}
		},
		onReachBottom() {
			this.current++;
			console.log(1);
			if (this.hotQuestionList.length > 40) {
				return this.isshow = true
			} else {
				if (this.activeIndex == 0) {
					getHotquestionList({
						current: this.current,
						size: 10
					}).then((res) => {
						this.hotQuestionList = [...this.hotQuestionList, ...res.data.data.records]
					})
				} else if (this.activeIndex == 1) {
					console.log(1);
					getNewquestionList({
						current: this.current,
						size: 10
					}).then((res) => {
						this.hotQuestionList = [...this.hotQuestionList, ...res.data.data.records]
					})
				} else {
					getWaitquestionList({
						current: this.current,
						size: 10
					}).then((res) => {
						this.hotQuestionList = [...this.hotQuestionList, ...res.data.data.records]
					})
				}
			}


		},
		onPageScroll(e) {
			console.log(e);
			if (e.scrollTop >= 800) {
				this.gotopShow = true
			} else {
				this.gotopShow = false
			}
		}
	}
</script>

<style lang='scss' scoped>
	.scroll-box {
		height: calc(100vh - 210rpx);
	}

	.top {
		white-space: nowrap;
		position: fixed;
		top: 80rpx;
		left: 0;
		background-color: #fff;
		z-index: 99;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;

		.topitem {
			display: inline-block;
			width: 30%;
		}

		.active {
			color: #36f;
			position: relative;
		}

		.active::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50rpx;
			width: 120rpx;
			height: 5rpx;
			background-color: #36f;
		}
	}

	.swiper-box {
		height: calc(100vh - 210rpx);
	}

	.content {
		width: 100%;
		margin-top: 130rpx;
		padding: 0 30rpx;
		white-space: nowrap;

		.content-item {
			height: 150rpx;
			width: 100%;

			.title {
				font-weight: 600;
				font-size: 32rpx;
			}

			.bottom-box {
				display: flex;
				justify-content: space-between;
				color: #999;

				.left {
					width: 30%;
				}

				.right {
					width: 60%;
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
