<template>
	<swiper class="swiper-box"   :indicator-dots="true" indicator-color="#ccc"
			indicator-active-color="#fff">
		<swiper-item v-for="(item ,index) in info" :key="index">
			<image :src="item.imageUrl" mode="widthFix" ></image> 
		</swiper-item>
	</swiper>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
import {getbanner} from '@/api/api.js'
export default {
  setup (props,ctx) {
	getbanner().then((res)=>{
		data.info =res.data.data
	})
  const data = reactive({ 
	  info:[],
	  mode:'round',
	  current: 0,
 }); 
 const router = useRouter(); 
 const route = useRoute();

    return {
    ...toRefs(data)
    }
  },
}
</script>

<style lang='scss'>
.swiper-item{
	height: 400rpx;
}
.swiper-box{
	height: 400rpx;
}
image{
	width: 700rpx;
	height: 400rpx;
	border-radius: 15rpx;
}

</style>
