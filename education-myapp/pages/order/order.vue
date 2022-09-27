<template>
	<view style="padding-bottom: 10px;">
		<view class="order" v-for="item in orderList" :key="item.id">
			<view class="order-time">
				{{item.createDate}} &nbsp; 订单号: {{item.orderId}}
			</view>
			<view class="order-item" @click="goDetail" v-for="child in item.courseList" :key="child.id">
				<view class="item-left">
					<img :src="child.mainImage" alt="">
					<view class="img-time">
						22:00:22
					</view>
				</view>
				<view class="item-right">
					<view class="title">{{child.title}}</view>
					<view class="ahtour">
						<text class="iconfont icon-laoshi2"></text>孟老师
					</view>
					<view class="foot">
						<text class="price">
							<text class="iconfont icon-moneybag"></text>{{child.priceDiscount}}
						</text>
						<text class="iconfont icon-video"></text>{{child.studyTotal}}人在学
					</view>
				</view>
			</view>
			<view class="factPrice">
				实付: <text class="price">￥{{item.priceDiscount}}</text>
			</view>
			<view class="foot-btn">
				<div class="status" v-if="item.status == 1"> 待支付 </div>
				<div class="status" style="color:#959da5" v-if="item.status == 2"> 交易成功 </div>
				<div class="status" style="color:#959da5" v-if="item.status == 3"> 交易关闭 </div>
				<div class="btn" v-if="item.status == 1">
					<u-button size="mini" @click="cancel"> 取消订单 </u-button>
					&nbsp;
					<u-button type="error" size="mini" @click="goPay(item.priceDiscount)"> 立即支付 </u-button>
				</div>
				<div class="btn" v-if="item.status ==3">
					<u-button size="mini"> 删除订单 </u-button>
				</div>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		getMyOrder
	} from '../../api/api.js'
	import {
		reactive,
		toRefs
	} from 'vue'

	const data = reactive({
		orderList: [], // 我的订单
	})

	// 请求我的订单
	getMyOrder().then(res => {
		data.orderList = res.data.data
	})

	// 去支付页面
	const goPay = (price) => {
		uni.navigateTo({
			url: `./order-pay?price=${price}`
		})
	}

	// 取消订单
	const cancel = () => {
		uni.showModal({
			content: '确定取消该订单记录?',
			success: (res) => {
				if (res.confirm) {
					getMyOrder().then(res => {
						data.orderList = res.data.data
					})
				}
			}
		})
	}

	// 去详情
	const goDetail = () => {
		uni.navigateTo({
			url: '/pages/detail/detail'
		})
	}

	const {
		orderList
	} = toRefs(data)
</script>

<style lang="scss">
	.order {
		padding: 10px 15px;
		margin-bottom: 10px;
		font-size: 12px;
		box-sizing: border-box;
		border-bottom: 0.5px solid #efeff4;

		.foot-btn {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.status {
				color: #fa140e;
			}
		}

		.factPrice {
			text-align: right;
			margin: 5px 0;

			.price {
				font-size: 18px;
				margin-left: 5px;
				color: #fa140e;
			}
		}

		.order-item {
			width: 100%;
			display: flex;
			padding: 10px 0;
			box-sizing: border-box;
			border-bottom: 0.5px solid #efeff4;

			.item-left {
				position: relative;
				width: 40%;

				.img-time {
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

			.item-right {
				flex: 1;
				margin-left: 10px;

				.iconfont {
					font-size: 12px
				}

				.iconfont-moneybag {
					color: #fb6932;
				}

				.title {
					height: 45px;
					font-size: 14px;
					font-weight: 700;
				}

				.ahtour {
					font-size: 12px;
					color: #999;
				}

				.foot {
					font-size: 12px;

					.icon-moneybag {
						font-size: 14px
					}

					.icon-video {
						font-size: 12px
					}

					.price {
						color: #fb6932;
						font-size: 14px;
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
