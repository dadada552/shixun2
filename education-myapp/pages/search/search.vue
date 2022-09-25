<template>
	<view class="searchpage">
		<view class="top-title">
			热门搜索
		</view>
		<view class="top-tag">
			<view class="tag-item" @click="changeSearch(item)" v-for="item,index in topTagList" :key="index">
				{{item}}
			</view>
		</view>
		<view class="top-title">
			历史搜索
		</view>
		
	</view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
let obj = null
export default {
	
  setup (props,ctx) {

  const data = reactive({ 
	  topTagList:['Java','Python','Vue.js','React','SpringBoot','springCloud'],
	  searchVal:''
 }); 
 const router = useRouter(); 
 const route = useRoute();
 const changeSearch = (val)=>{
	uni.navigateTo({
		url:`../showList/showList?name=${val}`
	})
	
 }
    return {
    ...toRefs(data),
	changeSearch
    }
  },
  onNavigationBarButtonTap(e){
	uni.navigateBack({
		delta:1
	})
  },
}
</script>

<style lang='scss'>
	.searchpage{
		padding: 0 20rpx;
	}
.top-title{
	font-size: 34rpx;
	font-weight: 600;
	
}
.top-tag{
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
	.tag-item{
		height: 46rpx;
		border-radius: 5rpx;
		border: 1px solid #ccc;
		margin-left: 20rpx;
		margin-top: 20rpx;
		text-align: center;
		padding: 0 20rpx;
	}
}
</style>

