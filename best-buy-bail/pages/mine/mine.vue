<template>
	<view class="pageBox">
		<view class="topbox">
			<view class="btn-box">
				<u-button type="success" :plain="true" @click="gologin">登录</u-button>
			</view>
		</view>
		<view class="likeBox">
			<u-grid :col="4" :border="false">
					<u-grid-item>
						<text>0</text>
						<view class="grid-text">收藏的店铺</view>
					</u-grid-item>
					<u-grid-item>
						<text>0</text>
						<view class="grid-text">收藏的商品</view>
					</u-grid-item>
					<u-grid-item>
						<text>0</text>
						<view class="grid-text">关注的商品</view>
					</u-grid-item>
					<u-grid-item>
						<text>0</text>
						<view class="grid-text">我的足迹</view>
					</u-grid-item>
				</u-grid>
		</view>
		<view class="myorder">
			<view class="title">
				我的订单
			</view>
			<u-grid :col="4" :border="false">
					<u-grid-item>
						<u-icon name="order" color="red"  :size="46"></u-icon>
						<view class="grid-text">全部订单</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="rmb-circle" color="red"  :size="46"></u-icon>
						<view class="grid-text">代付款</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="car" color="red"  :size="46"></u-icon>
						<view class="grid-text">待收货</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="close-circle" color="red" :size="46"></u-icon>
						<view class="grid-text">退货/退款</view>
					</u-grid-item>
				</u-grid>
		</view>
		<view class="address">
			收货地址管理
		</view>
		<view class="link">
			<view class="top">
				<view class="kefu">
					联系客服
				</view>
				<view class="num">
					400-618-4000
				</view>
			</view>
			<view class="center">
				意见反馈
			</view>
			<view class="bottom">
				关于我们
			</view>
		</view>
		<view class="share">
			把应用推荐给其他人
		</view>
	</view>
</template>

<script lang="ts" setup>
	const gologin = ()=>{
		uni.navigateTo({
			url:`/pages/login/login`
		})
		
	}
</script>

<style lang='scss'>
	.pageBox{
		background-color: #eee;
		position: relative;
		padding-bottom: 60rpx;
	}
.topbox{
	height: 556rpx;
	width: 100%;
	background-color: #eb4450;
	display: flex;
	align-items: center;
	.btn-box{
		width: 140rpx;
		height: 80rpx;
		margin: 0 auto;
	}
}
.likeBox{
	width: 80%;
	position: absolute;
	left:80rpx;
	top:490rpx;
}
.myorder{
	margin: 0 auto;
	margin-top: 100rpx;
	background-color: #fff;
	width: 80%;
	.title{
		border-bottom: 3px solid #eee;
		padding: 20rpx 20rpx;
	}
}
.address{
	margin: 0 auto;
	margin-top: 20rpx;
	background-color: #fff;
	width: 80%;
	padding: 20rpx 10rpx;
}
.link{
	margin: 0 auto;
	margin-top: 20rpx;
	background-color: #fff;
	width: 80%;
	padding: 0 10rpx;
	.top{
		display: flex;
		justify-content: space-between;
		border-bottom: 3px solid #eee;
		padding: 10rpx 0;
	}
	.center{
		border-bottom: 3px solid #eee;
		padding: 10rpx 0;
	}
	.bottom{
		padding: 10rpx 0;
	}
}
.share{
	margin: 0 auto;
	margin-top: 20rpx;
	background-color: #fff;
	width: 80%;
	padding: 20rpx 10rpx;
}
</style>
