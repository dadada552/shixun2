<template>
	<view>
		<view class="falsebar">
		</view>
		<!-- 上部导航栏 -->
		<view class="box-bg">
			<uni-nav-bar dark color="#999" backgroundColor="#fff" shadow left-icon="left" rightText="取消"
				@clickLeft="goback">
				<input type="text" v-model="searchValue" class="ipt" placeholder="搜索你想要的内容">
				<uni-icons class="icon" type="search" size="25"></uni-icons>
			</uni-nav-bar>
		</view>
		<!-- 中间部分 -->
		<view class="bar">
			<view :class=" baritemindex == index ?  'active bar-item' : 'bar-item' " 
			v-for="item,index in barList" @click="changeIndex(index,item)">
				{{item}}
			</view>
		</view>
		<!-- 选择下拉框 -->

		<view class="select">

		</view>
		

		
	</view>

</template>

<script>
	import {
		reactive,
		toRefs
	} from 'vue';
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	// import {uni-nav-bar} from '@dcloudio/uni-ui'
	export default {
		setup() {

			const data = reactive({
				searchValue: '',
				baritemindex: 0,
				barList: ['课程', '文章', '问答'],
				selectList:[
					
				]
			});
			const router = useRouter();
			const route = useRoute();
			const goback = () => {
				uni.navigateBack({
					delta: 1
				})
			}
			const changeIndex = (index, obj) => {
				console.log(index);
				data.baritemindex = index
			}
			return {
				goback,
				changeIndex,
				...toRefs(data)
			}
		},
		onLoad(opt) {
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

	.box-bg {
		position: relative;

		.icon {
			position: absolute;
			top: 20rpx;
			left: 170rpx;
			color: #ccc !important;
		}
	}

	.ipt {
		margin-top: 14rpx;
		border-radius: 20rpx;
		width: 600rpx;
		height: 60rpx;
		background-color: #eee;
		padding-left: 60rpx;
		color: #000;
	}

	.bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		border-bottom:1px solid #eee ;
		.bar-item{
			position: relative;
		}
	}
	.active{
		color: #007AFF;
	}
	.active::after{
		content: '';
		position: absolute;
		bottom: -30rpx;
		left: 5rpx;
		background-color: #007AFF;
		width: 60rpx;
		height: 5rpx;
	}
	.select{
		display: flex;
		justify-content: space-around;
		.content{
			width: 200%;
		}
	}
</style>
