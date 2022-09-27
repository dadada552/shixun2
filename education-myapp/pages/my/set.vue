<template>
	<view>
		<u-navbar title="设置" immersive :title-bold="true" title-color="#000"></u-navbar>
		<view class="content">
			<view class="item" v-for="item,index in list" :key="index">
				<view class="item-left">
					{{item.name}}
				</view>
				<view class="item-right">
					<u-switch v-model="item.flag" @change="changeFlag"></u-switch>
				</view>
			</view>
		</view>
		<view class="clear" @click="clearCpu">
			<view class="item-left">
				清除应用缓存
			</view>
			<view class="item-right" style="color: #959da5;">
				{{cpu}}KB
			</view>
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
	export default {
		setup() {
			const data = reactive({
				list: [{
						name: '允许非WIFI网络播放',
						flag: false
					},
					{
						name: '允许非WIFI网络缓存',
						flag: false
					}, {
						name: '视频自动连续播放',
						flag: false
					},
				],
				cpu: 1
			});

			const router = useRouter();
			const route = useRoute();
			const changeFlag = (e) => {}

			const clearCpu = () => {
				uni.showModal({
					title: '您确定清楚应用缓存吗？',
					content: '(该操作不会删除缓存课程)',
					success: (res) => {
						if (res.confirm) {
							data.cpu = 0
							uni.showToast({
								icon: 'none',
								title: '清除缓存成功!'
							})
						}
					}
				})
			}

			return {
				changeFlag,
				clearCpu,
				...toRefs(data)
			}
		},
	}
</script>

<style lang='scss'>
	.clear {
		width: 100%;
		height: 40px;
		font-size: 16px;
		display: flex;
		padding: 20px 10px;
		border-bottom: 10px solid #f8f9fb;
		align-items: center;
		justify-content: space-between;
	}

	.content {
		width: 100%;
		border-top: 10px solid #f8f9fb;
		border-bottom: 10px solid #f8f9fb;
	}

	.item {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 0.5px solid #efeff4;
		font-size: 16px;

		.item-left {
			width: 90%;
		}

		.item-right {
			flex: 1;
			color: #959DA5;
		}
	}
</style>
