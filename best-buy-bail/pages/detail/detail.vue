<template>
		<view >
			<view class="banner">
				<u-swiper :list="data.goodsItem.pics" height="680" name="pics_mid_url"></u-swiper>
			</view>
			<view class="price">
				￥{{data.goodsItem.goods_price}}
			</view>
			<view class="Goodsname">
				<view class="name">
					{{data.goodsItem.goods_name}}
				</view>
				<view class="like">
					<view><u-icon name="star"></u-icon></view>
					<view>
						收藏
					</view>
				</view>
			</view>
			<u-parse :html="data.goodsItem.goods_introduce"></u-parse>
			<view class="bottom">
				<view class="iconbox">
					<view class="icon">
						<u-icon name="share"></u-icon>
					</view>
					<view class="name">
						客服
					</view>
					
				</view>
				<view class="iconbox">
					<view class="icon">
						<u-icon name="share"></u-icon>
					</view>
					<view class="name">
						分享
					</view>
					
				</view>
				<view class="iconbox">
					<view class="icon">
						<u-icon name="shopping-cart"></u-icon>
					</view>
					<view class="name">
						购物车
					</view>
				</view>
				<view class="btnbox">
					<u-button class="btn" type="warning" @click="addcar">加入购物车</u-button>
				</view>
				<view class="btnbox">
					<u-button class="btn" type="error">立即购买</u-button>
				</view>
			</view>
		</view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {getGoodsDetail} from '@/api/api'
 const data = reactive({
	 goodsItem:{},
	 carList:[]
 })
 const addcar = ()=>{
	let obj = {
		price:data.goodsItem.goods_price,
		name:data.goodsItem.goods_name,
		pic:data.goodsItem.goods_small_logo,
		num:1,
		status:false,
		id:data.goodsItem.goods_id
	}
	
	uni.getStorage({
		key:'carList',
		success: (res) => {
			data.carList = res.data
		let index =	data.carList.findIndex((item)=>{
			return item.id == obj.id
			})	
			if(index != -1){
				data.carList[index].num ++
				uni.setStorage({
					key:'carList',
					data:data.carList,
					success:()=> {
						console.log(1);
					}
				})
			}else{
				data.carList.push(obj)
				uni.setStorage({
					key:'carList',
					data:data.carList,
					success:()=> {
						console.log(2);
					}
				})
			}
		},
		fail() {
			uni.setStorage({
				key:'carList',
				data:data.carList,
				success:()=> {
					console.log(3);
				}
			})
		}
	})
	
	
 }
	onLoad((opt)=>{
			getGoodsDetail(opt.id).then((res:any)=>{
				data.goodsItem =res.message
			})
	})

</script>

<style lang="scss" scoped>
.price{
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 20rpx;
	color: #eb4450;
	font-weight: 700;
}
.Goodsname{
	display: flex;
	padding: 0 5rpx ;
	margin-bottom: 20rpx;
	.like{
		width: 160rpx;
		text-align: center;
		border-left: 1px solid #000;
	}
}
.bottom{
	position: fixed;
	display: flex;
	background-color: #fff;
	justify-content: space-between;
	width: 100%;
	bottom: 0;
	z-index: 9;
	.iconbox{
		flex: 1;
		text-align: center;
	}
	.btnbox{
		flex: 2;
		.btn{
			border-radius: 0;
		}
	}
}
</style>
