<template>
	<view style="background-color: #f8f9fb;height: calc(100vh - 60px);overflow: hidden;">
		<view class="list-box">
			<view class="list-item">
				<view class="list-left">头像</view>
				<view class="list-right">
					<img :src="user.imageUrl" alt="">
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="list-item">
				<view class="list-left">用户名</view>
				<view class="list-right">{{user.username}}
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="list-item">
				<view class="list-left">手机号</view>
				<view class="list-right">{{user.mobile}}
					<text class="iconfont icon-right"></text>
				</view>
			</view>
			<view class="list-msg">
				<view class="list-item">
					<view class="list-left">昵称</view>
					<view class="list-right">{{user.nickName}}
						<text class="iconfont icon-right"></text>
					</view>
				</view>
				<view class="list-item" @click="show = true">
					<view class="list-left">性别</view>
					<view class="list-right">{{user.sex ? '女' : '男'}}
						<text class="iconfont icon-right"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="quit-btn" @click="quit">
			退出登录
		</view>

		<!-- 修改性别弹窗 -->
		<view>
			<u-action-sheet :list="list" @click="selectSex" v-model="show"></u-action-sheet>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		editUser
	} from '../../api/api.js'

	const data = reactive({
		user: {}, // 用户信息
		list: [{
			text: '男',
			id: '0'
		}, {
			text: '女',
			id: '1'
		}, ], // 性别数组
		show: false, // 控制弹窗状态 
		storageArr: []
	})

	// 修改性别
	const selectSex = (i) => {
		data.user.sex = i
		data.storageArr.userInfo = data.user
		editUser(data.user).then(res => {
			uni.showToast({
				title: res.data.message,
				icon: "none"
			})
		})
		// 更新本地存储
		uni.setStorage({
			data: JSON.stringify(data.storageArr),
			key: 'loginInfo'
		})
	}

	// 获取用户详情
	onShow(() => {
		uni.getStorage({
			key: 'loginInfo',
			success: (res) => {
				data.user = JSON.parse(res.data).userInfo
				data.storageArr = JSON.parse(res.data)
			},
			fail: (error) => {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		})
	})

	// 退出登录	
	const quit = () => {
		uni.showModal({
			title: '确定退出登录?',
			content: '退出后不会删除任何历史数据',
			success: (res) => {
				if (res.confirm) {
					// 确定退出登录
					uni.removeStorage({
						key: 'loginInfo',
						success: (res) => {
							uni.showToast({
								title: '退出登录成功!'
							})
							uni.navigateBack()
						}
					})
				}
			}
		})
	}


	const {
		user,
		list,
		show
	} = toRefs(data)
</script>

<style lang="scss">
	.quit-btn {
		width: 100%;
		height: 50px;
		background-color: #fff;
		text-align: center;
		line-height: 50px;
		color: #333;
		font-size: 18px
	}

	.list-box {
		width: 100%;
		margin: 20px 0;
		background-color: #fff;

		.list-msg {
			border-top: 10px solid #f8f9fb;
		}

		.list-item {
			width: 100%;
			padding: 13px 19px;
			border-bottom: 0.5px solid #efeff4;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.list-left {
				font-size: 16px;
			}

			.list-right {
				display: flex;
				align-items: center;
				font-size: 16px;
				color: #959da5;

				img {
					width: 60px;
					height: 60px;
					border-radius: 50%;
				}

				.icon-right {
					margin-left: 5px;
				}
			}
		}
	}
</style>
