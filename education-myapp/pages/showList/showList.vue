<template>
		<view>
			<view class="falsebar">
			
			</view>
			<view class="box-bg">
				<uni-nav-bar dark color="#999" backgroundColor="#fff" shadow left-icon="left" 
										rightText="取消" @clickLeft="goback">
				<input type="text" v-model="searchValue" class="ipt" placeholder="搜索你想要的内容">
				<uni-icons class="icon" type="search" size="25"></uni-icons>
				</uni-nav-bar>
			</view>
			
		</view>
		
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
// import {uni-nav-bar} from '@dcloudio/uni-ui'
export default {
  setup () {

  const data = reactive({ 
	  searchValue:'',
 }); 
 const router = useRouter(); 
 const route = useRoute();
 const goback = ()=>{
	 uni.navigateBack({
	 	delta:1
	 })
 }
    return {
goback,
    ...toRefs(data)
    }
  },
  onLoad(opt){
	  console.log(opt);
	  this.searchValue = opt.name
	  // console.log(opt);
	  // console.log(this);
	 
  }
}
</script>

<style lang='scss'>
.falsebar {
	height: var(--status-bar-height);
	background-color: #007AFF;
	width: 100%;
}
.box-bg{
	position: relative;
	.icon{
		position: absolute;
		top: 20rpx;
		left: 170rpx;
	}
}
.ipt{
	margin-top: 14rpx;
	border-radius: 20rpx;
	width: 600rpx;
	height: 60rpx;
	background-color: #eee;
	padding-left: 60rpx;
	color: #000;
}
</style>

