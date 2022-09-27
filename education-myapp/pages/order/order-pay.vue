<template>
	<view class="pay-card">
		<div class="card-title">
			支付方式
		</div>
		<div class="pay">
			<div class="pay-item">
				<div class="pay-left">
					<img src="/static/static/pay/alipay.png" alt="">
					支付宝
				</div>
				<div class="pay-right">
					<radio value="1" :checked="pay == 1" @click="changPay(1)" />
				</div>
			</div>
			<div class="pay-item">
				<div class="pay-left">
					<img src="/static/static/pay/wxpay.png" alt="">
					微信支付
				</div>
				<div class="pay-right">
					<radio value="2" :checked="pay == 2" @click="changPay(2)" />
				</div>
			</div>
		</div>
	</view>

	<div class="card">
		<div class="card-left">实付金额</div>
		<div class="card-right" style="color:#fa140e">￥{{price ? price : 999}}</div>
	</div>

	<div class="pay-btn">
		立即支付
	</div>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		reactive,
		toRefs
	} from 'vue'

	const data = reactive({
		price: '', // 支付金额
		pay: 1, // 支付方式
	})

	const changPay = (val) => {
		data.pay = val
	}

	onLoad((option) => {
		data.price = option.price
	})

	const {
		price,
		pay
	} = toRefs(data)
</script>

<style lang="scss">
	.pay-btn {
		width: 90%;
		margin: 20px auto;
		background-color: #345dc2;
		color: white;
		height: 40px;
		text-align: center;
		line-height: 40px;
		border-radius: 30px;
		font-size: 16px;
	}

	.card {
		margin: 0 15px;
		padding: 0 10px;
		background-color: #fff;
		margin-top: 15px;
		box-shadow: 1px 0 5px 0 rgb(0 0 0 / 8%);
		border-radius: 10px;
		display: flex;
		height: 45px;
		justify-content: space-between;
		align-items: center;
		font-size: 15px
	}

	.pay-card {
		font-size: 16px;
		margin: 0 15px;
		padding: 0 10px;
		background-color: #fff;
		margin-top: 15px;
		box-shadow: 1px 0 5px 0 rgb(0 0 0 / 8%);
		border-radius: 10px;

		.pay {
			width: 100%;

			.pay-item {
				height: 45px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.pay-left {
					display: flex;
					align-items: center;

					img {
						width: 30px;
						height: 30px;
						margin-right: 10px;
					}
				}

			}
		}

		.card-title {
			line-height: 45px;
			border-bottom: 0.5px solid #efeff4;
		}

	}
</style>
