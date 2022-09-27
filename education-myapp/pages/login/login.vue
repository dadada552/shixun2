<template>
	<!-- 关闭按钮 -->
	<view class="close iconfont icon-close" @click="back" />

	<!-- 登录表单 -->
	<div class="login-box">
		<!-- 登录水印 -->
		<div class="login-text">
			LOGIN
		</div>

		<!-- 欢迎回来 -->
		<div class="welcome">
			欢迎回来!
		</div>

		<div class="login-form">
			<uni-view class="input-item">
				<uni-text class="tit"><span>手机号码</span></uni-text>
				<uni-view>
					<uni-input>
						<div class="uni-input-wrapper">
							<div class="uni-input-placeholder input-placeholder" style="color: rgb(144, 147, 153);">
							</div><input maxlength="11" autocomplete="off" type="number" placeholder="请输入手机号码"
								v-model="tel" class="uni-input-input">
						</div>
					</uni-input>
				</uni-view>
			</uni-view>

			<uni-view class="input-item">
				<uni-text class="tit"><span>验证码</span></uni-text>
				<uni-view style="display: flex;align-items: center;justify-content: space-between;">
					<uni-input>
						<div class="uni-input-wrapper">
							<div class="uni-input-placeholder input-placeholder" style="color: rgb(144, 147, 153);">
							</div>
							<input maxlength="6" autocomplete="off" type="number" placeholder="请输入手机验证码" v-model="code"
								class="uni-input-input">
						</div>

					</uni-input>
					<view class="codeBtn" @click="getCode" v-if="timer === null">
						获取验证码
					</view>
					<view class="codeBtn" @click="showOutTime" v-else>
						{{timer}}s
					</view>
				</uni-view>
			</uni-view>
		</div>

		<div class="login-btn" @click="login">
			登录
		</div>

	</div>

	<!-- 底部用户协议 隐私政策 -->
	<div class="agreement">
		<text :class="{'iconfont':true,'icon-roundcheckfill':true,'active':iconFlag}" @click="toggleIcon"></text>
		<text style="color:#999;">请认真阅读并同意</text>
		<text style="color:#40a2ff;">《用户服务协议》</text>
		<text style="color:#40a2ff;">《隐私权政策》</text>
	</div>
</template>

<script setup>
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		loginId
	} from '../../api/api.js'

	const data = reactive({
		iconFlag: false, // 是否阅读服务鞋子
		tel: '', // 手机号
		code: '', // 验证码
		timer: null, // 验证码倒计时
	})

	// 切换用户协议
	const toggleIcon = () => {
		data.iconFlag = !data.iconFlag
	}

	// 返回
	const back = () => {
		uni.navigateBack()
	}

	// 登录
	const login = () => {
		if (!data.tel && !data.code) {
			return uni.showToast({
				title: '请将手机号或者验证码填写完整!',
				icon: 'none'
			})
		}

		if (data.tel.length != 11 && data.code.length != 6) {
			return uni.showToast({
				title: '手机号或者验证码格式错误!',
				icon: 'none'
			})
		}

		if (!data.iconFlag) {
			return uni.showToast({
				title: '请阅读并同意用户服务协议和隐私权政策',
				icon: 'none'
			})
		}

		// 登录成功
		loginId({
			mobile: data.tel,
			code: data.code
		}).then(res => {
			// 存储token
			uni.setStorage({
				data: JSON.stringify(res.data.data),
				key: 'loginInfo'
			})

			uni.showToast({
				title: '登录成功!',
				icon: 'none'
			})
			// 返回上一级
			uni.navigateBack()
		})
	}

	// 获取验证码
	const getCode = () => {
		if (data.tel.length != 11) {
			uni.showToast({
				title: '手机号格式不正确!',
				icon: 'none'
			})
		} else {
			uni.showLoading()
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '发送成功',
					icon: 'none'
				})
			}, 500)

			// 改变按钮
			data.timer = 5
			const timeOut = setInterval(() => {
				if (data.timer == 1) {
					data.timer = null
					clearInterval(timeOut)
				} else {
					data.timer--
				}
			}, 1000)
		}
	}

	// 显示剩余时间
	const showOutTime = () => {
		uni.showModal({
			content: `请在${data.timer}秒后重试`,
			showCancel: false
		})
	}

	const {
		iconFlag,
		tel,
		code,
		timer
	} = toRefs(data)
</script>

<style lang="scss">
	.active {
		color: #345dc2 !important;
	}

	.agreement {
		position: absolute;
		width: 100%;
		bottom: 20px;
		font-size: 12px;
		display: flex;
		padding: 10px 30px;
		box-sizing: border-box;
		justify-content: space-between;

		.icon-roundcheckfill {
			color: #999;
		}
	}

	.login-box {
		padding-top: 100px;

		.login-btn {
			border-radius: 5px;
			height: 46px;
			color: white;
			line-height: 46px;
			text-align: center;
			background-color: #345dc2;
			margin: 0 30px;
		}

		.login-btn:active {
			transform: scale(0.98);
			box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
			background-color: #007aff;
		}


		.input-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 15px;
			background: #f8f6fc;
			height: 60px;
			border-radius: 4px;
			margin-bottom: 25px;

			.codeBtn {
				background-color: #345dc2;
				border-radius: 5px;
				width: 90px;
				text-align: center;
				font-size: 12px;
				padding: 5px 0;
				color: #fff;
			}

			.uni-input-wrapper {
				display: flex;
				position: relative;
				width: 100%;
				height: 100%;

				.uni-input-input {
					display: block;
					height: 100%;
					background: none;
					opacity: 1;
				}
			}

			.tit {
				height: 25px;
				line-height: 28px;
				font-size: 13px;
				color: #606266;
				margin-bottom: 10px;
			}
		}

		.login-form {
			padding: 0 30px;
		}

		.login-text {
			font-size: 60px;
			color: #f8f8f8;
		}

		.welcome {
			position: relative;
			top: -45px;
			padding-left: 30px;
			font-size: 23px;
			color: #555;
			text-shadow: 1px 0 1px rgb(0 0 0 / 30%)
		}
	}

	.close {
		position: absolute;
		left: 10px;
		top: calc(0px + 10px);
		z-index: 90;
		padding: 10px;
		font-size: 19px;
		color: #606266;
	}
</style>
