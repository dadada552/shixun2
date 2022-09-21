<template>
	<view class="title">
		<view class="left">
			{{title}}
		</view>
		<view class="tag"> {{tag}}</view>
		<view class="right">
			全部 >
		</view>
	</view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
export default {
	props:['title','tag'],
  setup (props,ctx) {

  const data = reactive({ 
 }); 
 const router = useRouter(); 
 const route = useRoute();
    return {

    ...toRefs(data)
    }
  },
}
</script>

<style lang='scss' scoped>
.title{
	width: 100%;
	height: 80rpx;
	display: flex;
	padding: 0 30rpx;
	margin-top: 40rpx;
	.left{
		margin-right: 20rpx;
		line-height: 80rpx;
		font-size: 38rpx;
	}
	.tag{
		margin-right: 350rpx;
		height: 40rpx;
		font-size: 10rpx;
		background-image: linear-gradient(90deg,#fb6932,#fa140e);
		padding: 0 10px;
		border-radius: 15px 15px 15px 0;
		color: #fff;
	}
	.right{
		line-height: 80rpx;
		font-size: 13rpx;
		color: #959da5;
	}
}
</style>
