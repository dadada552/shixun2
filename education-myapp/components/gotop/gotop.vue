<template>
	<view class="gotop iconfont" @click="gotop" v-show="gotopShow">
		&#xe633;
	</view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
export default {
	props:['gotopShow'],
  setup () {

  const data = reactive({
 }); 
 const router = useRouter(); 
 const route = useRoute();
 const gotop = ()=>{
 	uni.pageScrollTo({
 		scrollTop:0
 	})
 }
    return {
		gotop,
    ...toRefs(data)
    }
  },
}
</script>

<style lang='scss'>
.gotop{
		position: fixed;
		width: 100rpx;
		height: 100rpx;
		bottom: 150rpx;
		right: 20rpx;
		background-color: #ccc;
		border-radius: 50%;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 50rpx
	}
</style>
