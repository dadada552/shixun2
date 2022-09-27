<template>
	<view class="my-head">
		<div class="header-cnt" @click="login" v-if="!loginFlag">
			<div class="left">
				<img src="http://m.mengxuegu.com/static/logo.png" alt="">
				<p>请登录</p>
			</div>
			<div class="iconfont icon-right right"></div>
		</div>

		<!-- 已登录 -->
		<div class="header-cnt" v-if="loginFlag" @click="goUser">
			<div class="left">
				<img :src="userInfo.imageUrl" alt="" style="border-radius: 50%;width: 75px;height:75px;">
				<div class="user-msg">
					<p>{{userInfo.nickName}}</p>
					<p style="font-size: 16px;color: #959da5;font-weight:400">用户名 : {{userInfo.username}}</p>
				</div>
			</div>
			<div class="iconfont icon-right right"></div>
		</div>
	</view>

	<div class="list">
		<div class="list-item" @click="goOrder">
			<div class="left">
				<text class="iconfont icon"> &#xe64d;</text>
				我的订单
			</div>
			<div class="iconfont icon-right right"></div>
		</div>
		<div class="list-item" @click="goBalance">
			<div class="left">
				<text class="icon iconfont">
					&#xe699;
				</text>我的余额
			</div>
			<div class="iconfont icon-right right"></div>
		</div>
		<div class="list-item" @click="goStudy">
			<div class="left">
				<text class="icon iconfont">&#xe65c;</text>
				我的学习
			</div>
			<div class="iconfont icon-right right"></div>
		</div>
	</div>
	<div class="list">
		<div class="list-item" @click="goSet">
			<div class="left">
				<text class="icon iconfont">&#xe666;</text>
				设置
			</div>
			<div class="iconfont icon-right right"></div>
		</div>
		<div class="list-item" @click="goFeedBack">
			<div class="left">
				<text class="icon iconfont">&#xe855;</text>
				意见反馈
			</div>
			<div class="iconfont icon-right right"></div>
		</div>
	</div>
	<div class="about" @click="goAbout">
		<div class="left">
			<text class="icon iconfont">&#xe60e;</text>
			关于我们
		</div>
		<div class="iconfont icon-right right"></div>
	</div>
</template>

<script setup>
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'

	const data = reactive({
		loginFlag: false, // 是否为登录的状态
		userInfo: {}, // 用户信息
	})

	const login = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}

	// 判断是否为登录
	const isLogin = () => {
		let flag = false
		uni.getStorage({
			key: 'loginInfo',
			fail: function(error) {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			success: (res) => {
				if (res.data) {
					return flag = true
				}
			}
		});
		return flag
	}

	// 去设置
	const goSet = () => {
		uni.navigateTo({
			url: './set'
		})
	}

	// 去意见反馈
	const goFeedBack = () => {
		uni.navigateTo({
			url: './feedback'
		})
	}

	// 页面挂载是判断是否为登录
	onShow(() => {
		uni.getStorage({
			key: 'loginInfo',
			success: (res) => {
				data.loginFlag = true

				// 获取本地存储
				uni.getStorage({
					key: 'loginInfo',
					success: (res) => {
						data.userInfo = JSON.parse(res.data).userInfo
					}
				})
			},
			fail: () => {
				data.loginFlag = false
			}
		})
	})

	// 去个人资料
	const goUser = () => {
		uni.navigateTo({
			url: '/pages/user/user'
		})
	}

	// 去我的学习
	const goStudy = () => {
		if(isLogin()){
			uni.navigateTo({
				url: './study'
			})
		}
		
	}

	// 去订单页面
	const goOrder = () => {
		if (isLogin()) {
			uni.navigateTo({
				url: '/pages/order/order'
			})
		}
	}

	// 去余额页面
	const goBalance = () => {
		if (isLogin()) {
			uni.navigateTo({
				url: '../order/my-balance'
			})
		}
	}

	// 去关于我们页面
	const goAbout = () => {
		if (isLogin()) {
			uni.navigateTo({
				url: '/pages/about/about'
			})
		}
	}

	const {
		loginFlag,
		userInfo
	} = toRefs(data)
</script>

<style lang="scss">
	.icon {
		color: #39f;
		margin-right: 5px;
	}

	.about {
		width: 100%;
		display: flex;
		padding: 13px 19px;
		box-sizing: border-box;
		justify-content: space-between;
		border-bottom: 0.5px solid #efeff4;
		font-size: 16px;
	}

	.list {
		width: 100%;
		border-bottom: 10px solid #f8f9fb;
		font-size: 16px;

		.list-item {
			width: 100%;
			display: flex;
			padding: 13px 19px;
			box-sizing: border-box;
			justify-content: space-between;
			border-bottom: 0.5px solid #efeff4;
		}
	}

	.right {
		font-size: 17px;
		color: #959da5;
	}

	.my-head {
		background-color: #345dc2;

		.header-cnt {
			width: 100%;
			padding: 25px 19px;
			background-color: #fff;
			border-radius: 15px 15px 0 0;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			align-items: center;
			border-bottom: 10px solid #f8f9fb;

			.left {
				display: flex;
				align-items: center;
				font-size: 19px;
				font-weight: 700;


				img {
					width: 140rpx;
					margin-right: 10px;
				}
			}
		}
	}
</style>
