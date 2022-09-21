<template>
		<view class="top">
			<view class="login-box">
				<view class="img-box">
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="login">
					请登录
				</view>
				<view class="go">
					
				</view>
			</view>
		</view>
		<view class="myorder">
			<view class="icon iconfont">
				&#xe64d;
			</view>
			<view class="title">
				我的订单
			</view>
			<view class="go">
				
			</view>
		</view>
		<view class="mymoney">
			<view class="icon iconfont">
				&#xe699;
			</view>
			<view class="title">
				我的余额
			</view>
			<view class="go">
				
			</view>
		</view>
		<view class="mystudy">
			<view class="icon iconfont">
				&#xe65c;
			</view>
			<view class="title">
				我的学习
			</view>
			<view class="go">
				
			</view>
		</view>
		<view class="myedit">
			<view class="icon iconfont">
				&#xe666;
			</view>
			<view class="title">
				我的设置
			</view>
			<view class="go">
				
			</view>
		</view>
		<view class="myopinion">
			<view class="icon iconfont">
				&#xe855;
			</view>
			<view class="title">
				意见反馈
			</view>
			<view class="go">
				
			</view>
		</view>
		<view class="about">
			<view class="icon iconfont">
				&#xe60e;
			</view>
			<view class="title">
				关于我们
			</view>
			<view class="go">
				
			</view>
		</view>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute} from 'vue-router'
export default {
  setup () {

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
	.go{
		width: 34rpx;
		height: 34rpx;
		border-right: 3px solid #aaa;
		border-bottom: 3px solid #aaa;
		rotate: -45deg;
		margin-right: 20rpx;
	}
	.title{
		font-size: 500;
		margin-right: 420rpx;
	}
	.icon{
		margin-left: 20rpx;
		color:#345DC2;
	}
	.mymoney,.myorder,.mystudy,.myedit,.myopinion,.about{
		display: flex;
		width: 100%;
		height: 120rpx;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #ccc;
	}
		
	.mystudy,.myopinion{
		height: 140rpx;
		border-bottom: 10px solid #eee;
	}
.top{
	width: 100%;
	height: 250rpx;
	background-color: #345DC2;
	margin-bottom: 40rpx;

	.login-box{
		height: 280rpx;
		width: 100%;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 15px solid #eee;
		.img-box{
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			image{
				width: 100%;height: 100%;
				border-radius: 50%;
			}
		}
		.login{
			font-size: 60rpx;
			font-weight: 700;
			margin-right: 260rpx;
		}
		
	}
}
</style>
