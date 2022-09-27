<template>
	<view class="money">
		<text style="color: #e7e4e9; font-size: 15px;">
			余额
		</text>
		<text style="color: #fff; font-size: 44px;">
			{{money}}币
		</text>
	</view>

	<view class="recharge">
		充值:
	</view>

	<view class="list">
		<div :class="{'list-item':true,'active':activeIndex == i}" v-for="item,i in payList" :key="i"
			@click="changIndex(i)">
			<view style="color: #fa140e;font-size: 18px;">
				{{item.price}}币
			</view>
			<view style="font-size: 15px;  color: #999;">
				￥{{item.price}}
			</view>
		</div>
	</view>

	<div class="desc">
		<div class="desc-title">
			充值说明:
		</div>
		<uni-view>
			1.在IOS设备的APP要进行充值后，使用虚拟币消费。<br>2.充值后不能在非IOS设备使用，与安卓版和网站余额不通用。<br>3.充值后没有使用期限，但不可提现、退换、转让和申请发票。<br>4.如遇无法充值、充值失败等问题，可关注[梦学谷]公众号，联系我们解决。<br>
		</uni-view>
	</div>

	<!-- 底部按钮 -->
	<div class="foot-btn">
		<div class="btn">立即充值</div>
	</div>
</template>

<script setup>
	import {
		getMyBalance
	} from '../../api/api.js'
	import {
		reactive,
		toRefs
	} from 'vue'

	const data = reactive({
		payList: [{
			price: 0
		}, {
			price: 30
		}, {
			price: 60
		}, {
			price: 90
		}, {
			price: 120
		}, {
			price: 150
		}],
		activeIndex: 0,
		money: 0
	})

	getMyBalance().then(res => {
		data.money = res.data.data
	})

	const changIndex = (i) => {
		data.activeIndex = i
	}

	const {
		payList,
		activeIndex,
		money
	} = toRefs(data)
</script>

<style lang="scss">
	.foot-btn {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		height: 50px;
		border-top: 0.5px solid #efeff4;

		.btn {
			width: 94%;
			margin: 5px auto;
			height: 40px;
			background-color: #345dc2;
			color: white;
			text-align: center;
			line-height: 40px;
			border-radius: 20px;
		}
	}

	.desc {
		margin: 0 10px;
		font-size: 15px;
		line-height: 22px;
		color: #6e6d70;

		.desc-title {
			font-size: 15px;
			line-height: 22px;
			color: #6e6d70;
			font-weight: 700;
			padding-top: 25px;
			padding-bottom: 15px;
		}
	}

	.active {
		border: 1px solid red !important;
	}

	.list {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		width: 96%;
		margin: 10px auto;

		.list-item {
			text-align: center;
			width: 31%;
			border: 1px solid #f8f9fb;
			border-radius: 5px;
			background-color: #fff;
			margin-right: 5px;
			margin-bottom: 7px;
			padding: 10px 0;
		}
	}

	.recharge {
		margin: 10px 0 0 10px;
		font-size: 15px;
		color: #999;
	}

	.money {
		height: 144px;
		background-color: #345dc2;
		color: #fff;
		font-size: 44px;
		text-align: center;
		padding-top: 30px;
		box-sizing: border-box;

		text {
			display: block;
		}
	}
</style>
