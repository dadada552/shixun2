<template>
	<view :class= " flag ? 'top': 'left'">
		<view class="imgbox">
			<image :src="item.mainImage"></image>
		</view>
		<view class="totaltime">
			{{item.totalTime}}
		</view>
	</view>
	<view :class= " flag ? 'bottom': 'right'">
		<view class="name">
			{{item.title}}
		</view>
		<view class="teacher">
			<view class="iconfont" style="font-size: 30rpx;color: #aaa;">&#xe6a2;</view>
			<view class="teacher-name">
				{{item.nickName}}
			</view>
		</view>
		<view class="right-bottom">
			<view class="ispay">
				{{item.isFree == 0 ? '收费' :'免费' }}
			</view>
			<view class="studybox">
				<view class="iconfont">&#xe8a3;</view>
				<view class="studynum">
					{{item.studyTotal}}人
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		reactive,
		toRefs
	} from 'vue';
	export default {
		name: "my-goods",
		props: ['item','flag'],
		setup(props, ctx) {
			const data = reactive({

			});
			return {
				...toRefs(data),
			}
		}
	}
</script>

<style lang="scss" scoped>
	.left {
		width: 50%;
		position: relative;
		margin-right: 30rpx;

		image {
			width: 100% !important;
			height: 200rpx !important;
			border-radius: 20rpx;
		}

		.totaltime {
			position: absolute;
			bottom: 5rpx;
			right: 5rpx;
			font-size: 13rpx;
			color: #fff;
			background-color: rgba(51, 51, 51, .4);
			border-radius: 20rpx;
			padding: 0 5rpx;
		}
	}

	.right {
		flex: 1;
		.teacher {
			display: flex;
			margin-top: 45rpx;
			font-size: 20rpx;
		}

		.name {
			height: 80rpx;
			white-space: normal;
			word-break: break-all;
		}

		.right-bottom {
			display: flex;
			justify-content: space-between;
			line-height: 40rpx;

			.ispay {
				color: #fb6932;
			}

			.studybox {
				display: flex;
				font-size: 30rpx;

				.studynum {
					font-size: 20rpx;
				}
			}
		}

	}
	
	.top{
		width: 300rpx;
		position: relative;
		image {
			width: 100% !important;
			height: 160rpx !important;
			border-radius: 20rpx;
		}
		.totaltime {
			position: absolute;
			top: 130rpx;
			right: 5rpx;
			font-size: 13rpx;
			color: #fff;
			background-color: rgba(51, 51, 51, .4);
			border-radius: 20rpx;
			padding: 0 5rpx;
		}
	}
	
	.bottom{
		width: 300rpx;
		.teacher {
			display: flex;
			margin-top: 45rpx;
			font-size: 20rpx;
		}
		
		.name {
			height: 70rpx;
			white-space: normal;
			word-break: break-all;
		}
		
		.right-bottom {
			display: flex;
			justify-content: space-between;
			line-height: 40rpx;
		
			.ispay {
				color: #fb6932;
			}
		
			.studybox {
				display: flex;
				font-size: 30rpx;
				.studynum {
					font-size: 20rpx;
				}
			}
		}
	}
	
	
</style>
