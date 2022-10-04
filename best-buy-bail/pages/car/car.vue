<template>
	<view>
		<view class="topBtn">
			<u-button type="success" plain>获取收货地址</u-button>
		</view>
		<view class="title">
			购物车 
		</view>
		<view class="lisorImg">
			<image src="http://hbimg.b0.upaiyun.com/e1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658" mode="widthFix"></image>
			
		</view>
		
		<view class="bottom">
			<view class="left">
				<view class="checkbox">
					<u-checkbox v-model="data.checked" :disabled="false">全选</u-checkbox>
				</view>
				<view class="numbox">
					合计: <text class="red">￥0</text>
					<view>
						包含运费
					</view>
				</view>
			</view>
			<view class="right">
				<u-button class="btn" type="error">结算（0）</u-button>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue'
	const data = reactive({
		checked:false
	})
</script>

<style lang="scss">
.topBtn{
	padding: 20rpx;
}
.title{
	border-top: 1px solid #eb4450;
	color:#eb4450;
	border-bottom: 1px solid #eb4450;
	padding:20rpx 0;
	text-indent: 3em;
}
.bottom{
	position: fixed;
	bottom: 100rpx;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.right{
		width: 220rpx;
		.btn{
			border-radius: 0;
		}
	}
	.left{
		flex: 1;
		display: flex;
		justify-content: space-between;
		.red{
			color: red;
			font-weight: 700;
		}
	}
}
</style>
