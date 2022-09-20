<template>
	<view class="cate-box">
		<view class="left-box">
			<scroll-view class="scroll-view" scroll-y="true">
				<view :class="navindex == index ? ' active scroll-view-item' :'scroll-view-item' "
				 v-for="item,index in hotTitleList" :key="item.id" @click="changeIndex(item,index)">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<view class="right-box" >
			<view class="right-item" v-for="item in induceList" :key="item.id">
				{{item.name}}
			</view>
		</view>
	</view>
	
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
import {getHotrecom} from '@/api/api.js'
export default {
  setup () {

  const data = reactive({ 
	  hotTitleList:[],
	  navindex:0,
	  induceList:[]
 }); 
 const router = useRouter(); 
 const route = useRoute();
	getHotrecom().then((res)=>{
		data.hotTitleList = res.data.data
		data.induceList = res.data.data[0].labelList
	})
	const changeIndex = (obj,index) =>{
		data.navindex = index
	let item =	data.hotTitleList.find((item)=>item.id == obj.id)
		data.induceList = item.labelList
	}
    return {
    ...toRefs(data),
	changeIndex
    }
  },
}
</script>

<style lang='scss' scoped>
.cate-box{
	display: flex;
	width: 100%;
	.left-box{
		width: 30%;
		background-color: #eee;
		.scroll-view{
			width: 100%;
			height: calc(100vh - 100rpx - 80rpx);
			.scroll-view-item{
				text-align: center;
				height: 200rpx;
				line-height: 200rpx;
				font-size: 30rpx;
				font-weight: 600;
			}
			.active{
				color: #36f;
				position: relative;
			}
			.active::before{
				content: '';
				position: absolute;
				left: 0;
				top: 20rpx;
				width: 10rpx;
				height: 160rpx;
				background-color: #36f;
				border-radius: 2rpx;
			}
		}
	}
	.right-box{
		flex: 1;
		display: grid;
		margin-top: 30rpx;
		grid-template:
			'a1 a2 a3' 80rpx
			'a4 a5 a6' 80rpx
			/ 150rpx 150rpx 150rpx;
			justify-content: end;
			align-content: start;
			column-gap: 30rpx;
			row-gap: 30rpx;
		.right-item{
			border: 1px solid #333;
			line-height: 80rpx;
			text-align: center;
			border-radius: 35rpx;
		}
	}
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
}
</style>
