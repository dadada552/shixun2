<template>
	<view class="falsebar">
	</view>
	<view class="goback">
		<view class="goback-item">
			
		</view>
	</view>
		<image :src="infoData.mainImage" class="img" mode="widthFix"></image>
		<view class="content-box" style="padding: 40rpx 20rpx;">
			<view class="content">
				<text class="nowPrice"> ￥{{infoData.priceDiscount}} </text> 
				<text class="agoPrice"> ￥{{infoData.priceOriginal}} </text>
				<text class="text">优惠价 </text>
			</view>
			<view class="title">
				{{infoData.title}}
			</view>	
			<view class="bottom-text">
				<text class="iconfont icon-haoping2"> {{infoData.goodRate}}好评</text>
				<text class="iconfont icon-touxiang2">{{infoData.studyTotal}}在学 </text>
			</view>
		</view>
		
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
import {getinfo} from '@/api/api.js'
export default {
  setup () {

  const data = reactive({ 
	 infoData:''
 }); 
 const router = useRouter(); 
 const route = useRoute();
    return {

    ...toRefs(data)
    }
  },
  onLoad(opt){
	  getinfo().then((res)=>{
		  console.log(res);
		  this.infoData = res.data.data

	  })
  }
}
</script>

<style lang='scss' scoped>
.falsebar {
		height: var(--status-bar-height);
		background-color: #007AFF;
		width: 100%;
	}
	.goback{
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		top: 20rpx;
		left: 20rpx;
		z-index: 9;
		background-color: #aaa;
		opacity: .5;
		.goback-item{
			width: 50rpx;
			height: 50rpx;
			border-left: 5px solid #eee ;
			border-bottom: 5px solid #eee;
			rotate: 45deg;
			margin-top: 24rpx;
			margin-left: 35rpx;
		}
	}
	.img{
		width: 750rpx;
	}
	.nowPrice{
		color: red;
		font-size: 60rpx;
	}
	.agoPrice{
		text-decoration: line-through;
		margin: 0 20rpx;
		color: #ccc;
	}
	.text{
		padding: 10rpx 20rpx;
		border: 1px solid red;
		border-radius: 20rpx;
		color: red;
	}
	.title{
		font-size:40rpx;
		font-weight: 700;
		margin-top: 20rpx;
	}
	.bottom-text{
		margin-top: 10rpx;
		text{
			margin-right: 10rpx;
			padding: 0 20rpx;
			background-color: #eee;
			border-radius: 20rpx;
			color: #aaa;
		}
	}
	.content-box{
		border-bottom: 20rpx solid #eee;
	}
</style>
