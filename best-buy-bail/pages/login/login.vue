<template>
	<view>
		<u-button type="success" :plain="true" @click="getUserInfo">登录</u-button>
	</view>
</template>

<script lang="ts" setup>
	import {getToken} from '@/api/api'
	import { onLoad } from '@dcloudio/uni-app'
	import { reactive } from 'vue'
	const data = reactive({
		code:''
	})
	onLoad(()=>{
		uni.login({
			success(res) {
				data.code = res.code
			}
		})
	})
	const getUserInfo = ()=>{	
		uni.getUserProfile({
			desc:'Wexin',
			success:res=>{
				console.log(data.code);
				getToken({encryptedData:res.encryptedData,
				rawData:res.rawData,
				iv:res.iv,
				signature:res.signature,
				code:data.code
				}).then((r)=>{
					console.log(r);
				})
			}
		})
	}
</script>

<style lang="scss">
	view{
		width: 80%;
		margin: 20rpx auto;
	}
</style>
