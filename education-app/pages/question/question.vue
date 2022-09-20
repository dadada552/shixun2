<template>
	<scroll-view scroll-X="true" class="top">
		<view :class=" activeIndex == 0 ? 'topitem active' : 'topitem' " @click="changeindex('hot',0)">
			热门回答
		</view>
		<view :class=" activeIndex == 1 ? 'topitem active' : 'topitem' " @click="changeindex('new',1)">
			最新问题
		</view>
		<view :class=" activeIndex == 2 ? 'topitem active' : 'topitem' " @click="changeindex('wait',2)">
			等待回答
		</view>
	</scroll-view>
	<scroll-view scroll-X="true" class="content">
		<view class="content-item" v-for="item in hotQuestionList" :key="item.id">
				<view class="title">
					{{item.title}}
				</view>
				<view class="bottom">
					<view class="left">
						{{item.reply}}回复 {{item.thumhup}}浏览
					</view>
					<view class="right">
						{{item.nickName}}·{{item.updateDate}}
					</view>
				</view>
		</view>
	</scroll-view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
import {getHotquestionList} from '@/api/api.js'
export default {
  setup () {

  const data = reactive({ 
	  activeIndex:0,
	  hotQuestionList :[]
 }); 
 const router = useRouter(); 
 const route = useRoute();
 getHotquestionList({current:1, size: 10}).then((res)=>{
	 console.log(res);
	 data.hotQuestionList = res.data.data.records
 })
 const changeindex = (type,index)=>{
	 data.activeIndex = index
 }
    return {
		changeindex,
    ...toRefs(data)
    }
  },
}
</script>

<style lang='scss' scoped>
.top{
	white-space: nowrap;
	position: fixed;
	top: 80rpx;
	left: 0;
	background-color: #fff;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	.topitem{
		display:inline-block;
		width: 30%;
	}
	.active{
		color: #36f;
		position: relative;
	}
	.active::after{
		content: '';
		position: absolute;
		bottom: 0;
		left: 50rpx;
		width: 120rpx;
		height: 5rpx;
		background-color: #36f;
	}
}

.content{
	width: 100%;
	margin-top: 130rpx;
	padding: 0 30rpx;
	.content-item{
		height: 150rpx;
		width: 100%;
		.title{
			font-weight: 600;
			font-size: 32rpx;
		}
		.bottom{
			display: flex;
			justify-content: space-between;
			color: #999;
			.left{
				width: 30%;
			}
			.right{
				width: 60%;
			}
		}
	}
}
</style>
