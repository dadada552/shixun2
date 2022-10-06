<template>
	<view>
		<view class="topBtn">
			<u-button v-if="!data.flag" type="success" plain @click="goAddress">获取收货地址</u-button>
			<view v-else>
				<view class="userInfo">
					<text class="username">{{data.address.userName}}</text>
					<text>{{data.address.telNumber}}</text>
				</view>
				<view class="address">
					{{data.address.cityName}}{{data.address.countyName}}{{data.address.detailInfo}}
				</view>
			</view>
		</view>
		<view class="title">
			购物车 
		</view>
		<view class="lisorImg" v-show="data.carList.length == 0">
			<image src="http://hbimg.b0.upaiyun.com/e1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658" mode="widthFix"></image>
			
		</view>
		
		<view class="content">
			<view class="item" v-for="item,index in data.carList" :key="item.id">
				<view class="item-check">
					<u-checkbox v-model="item.status" @change="selectOne(index,$event)"></u-checkbox>
				</view>
				<view class="item-img">
					<image :src="item.pic"  style="width: 140rpx;height: 140rpx;"></image>
				</view>
				<view class="item-desc">
					<view class="item-goodsName">
						{{item.name}}
					</view>
					<view class="item-price">
						<view class="price">
						￥{{item.price}}	
						</view>
						<view class="num">
							<u-number-box v-model="item.num" @change="valChange(item,$event)"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="bottom">
			<view class="left">
				<view class="checkbox">
					<u-checkbox v-model="data.checked" :disabled="false" @change="selectAll">全选</u-checkbox>
				</view>
				<view class="numbox">
					合计: <text class="red">￥{{priceAll.pricenum}}</text>
					<view>
						包含运费
					</view>
				</view>
			</view>
			<view class="right">
				<u-button class="btn" type="error">结算（{{priceAll.num}}）</u-button>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive,computed  } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	const data = reactive({
		checked:false,
		carList:[],
		flag:false
	})
	const valChange = (obj,e)=>{
		obj.num = e.value
	}
	const selectAll = (e)=>{
		data.carList.forEach((item)=>{
			item.status = e.value
		})
	}
	const priceAll = computed(()=>{
		let pricenum = 0
		let num = 0
		 data.carList.filter(item => item.status==true).forEach((item)=>{
			pricenum +=  item.price * item.num
			num += item.num 
		 })
		 return {
			 pricenum,num
		 }
	})
	const goAddress = ()=>{
		
		uni.chooseAddress({
			success(res) {
				console.log(res);
				data.address = res
				data.flag = true
				console.log(data.address);
			}
		})
	}
	const selectOne = (index,e)=>{
	data.carList[index].status = e.value
	 data.checked =	data.carList.every((item)=>{
			return item.status
		})
	}
	onLoad(()=>{	
		uni.getStorage({
			key:'carList',
			success(res) {
				console.log(res.data);
				data.carList = res.data
			}
		})
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
	<!-- #ifdef H5 -->
	bottom:100rpx;
	<!-- #endif -->
	<!-- #ifdef MP-WEIXIN -->
	bottom: 0;
	<!-- #endif -->
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
.content{
	.item{
		display: flex;
		margin: 20rpx 0;
		.item-check{
			flex: 1;
			text-align: center;
			line-height: 140rpx;
		}
		.item-img{
			flex: 2;
			text-align: center;	
		}
		.item-desc{
			flex: 3;
			line-clamp: 2;
			box-orient: vertical;
			.item-goodsName{
				height: 76rpx;
				 overflow: hidden;
				text-overflow: ellipsis;
				
			}
			.item-price{
				display: flex;
				justify-content: space-between;
				margin-top:20rpx ;
			}
		}
	}
}
.userInfo{
	.username{
		margin-right: 50rpx;
	}
}
</style>
