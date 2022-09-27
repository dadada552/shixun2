<template>
	<view>
		<view class="falsebar">
		</view>
		<!-- 上部导航栏 -->
		<view class="box-bg">
			<u-navbar>
				<view class="slot-wrap">
					<input type="text" class="ipt">
					<view style="font-size: 16px;" @click="back">取消</view>
				</view>
			</u-navbar>
		</view>

		<!-- 中间部分 -->
		<view class="bar">
			<view :class=" baritemindex == index ?  'active bar-item' : 'bar-item' " v-for="item,index in barList"
				@click="changeIndex(index,item)">
				{{item}}
			</view>
		</view>

		<!-- 选择下拉框 -->
		<view class="select">
			<u-dropdown ref="select">
				<u-dropdown-item v-model="sort" :title="sortData.find(item => item.value == sort).label"
					:options="sortData" @change="changeLabel"></u-dropdown-item>

				<u-dropdown-item v-model="classData" v-show="baritemindex == 0"
					:title="classDataList.find(item => item.value === classData).label" :options="classDataList"
					@change="changeLabel"></u-dropdown-item>

				<u-dropdown-item v-model="cate" :title="catetitle" :options="cateData">
					<scroll-view scroll-x="true" style="height: 500rpx;">
						<cate @getName='getName'></cate>
					</scroll-view>
				</u-dropdown-item>
			</u-dropdown>
		</view>

		<scroll-view scroll-y="true" class="scrollBox">
			<view v-for="item in getData" :key="item.id" class="item">
				<my-goods :item='item' :flag="false"></my-goods>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getsearchData
	} from '../../api/api.js'
	import {
		reactive,
		toRefs,
		ref
	} from 'vue';
	import {
		useRouter,
		useRoute
	} from 'vue-router'
	export default {
		setup() {
			const selectDom = ref(null);
			const data = reactive({
				searchValue: '',
				baritemindex: 0,
				barList: ['课程', '文章', '问答'],
				sort: '',
				classData: '',
				cate: '',
				catetitle: '全部分类',
				getData: [],
				sortData: [{
						label: '综合排序',
						value: '',
					},
					{
						label: '热门排序',
						value: 'hot',
					},
					{
						label: '最新排序',
						value: 'new',
					}
				],
				classDataList: [{
						label: '全部课程',
						value: '',
					},
					{
						label: '付费课程',
						value: 0,
					},
					{
						label: '免费课程',
						value: 1,
					}
				],
				cateData: [],
				sortDatago: null,
				isFree: null,
			});
			const router = useRouter();
			const route = useRoute();
			const goback = () => {
				uni.navigateBack({
					delta: 1
				})
			}
			const changeIndex = (index, obj) => {
				data.baritemindex = index

			}
			const getName = (val) => {
				data.cateData.label = val.name
				data.cateData.value = val.id
				data.catetitle = val.name
				getsearchData({
					sort: data.sortDatago,
					size: 10,
					isFree: data.isFree,
					current: 1,
					content: data.searchValue,
					categoryId: null,
					labelId: data.cateData.value
				}).then((res) => {
					data.getData = res.data.data.records
				})
			}
			const changeLabel = (e) => {
				if (e == 'hot' || e == 'new') {
					data.sortDatago = e
				}
				if (e == 0 || e == 1) {
					data.isFree = e
				}
				getsearchData({
					sort: data.sortDatago,
					size: 10,
					isFree: data.isFree,
					current: 1,
					content: data.searchValue,
					categoryId: null,
					labelId: data.cateData.value
				}).then((res) => {
					data.getData = res.data.data.records
				})
			}
			const back = () => {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
			return {
				goback,
				changeIndex,
				getName,
				changeLabel,
				selectDom,
				back,
				...toRefs(data),
			}
		},
		onLoad(opt) {
			if (opt.id < 10) {
				this.searchValue = opt.name
			} else {
				this.catetitle = opt.name
			}
			getsearchData({
				sort: null,
				size: 10,
				isFree: null,
				content: opt.name,
				categoryId: null,
				labelId: null,
			}).then((res) => {
				this.getData = res.data.data.records
			})

		}
	}
</script>

<style lang='scss'>
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */

		.ipt {
			width: 85%;
			background-color: #f0f1f2;
			border-radius: 20px;
			height: 30px;
			padding-left: 10px;
			margin-right: 10px;
		}
	}

	.falsebar {
		height: var(--status-bar-height);
		background-color: #007AFF;
		width: 100%;
	}

	.box-bg {
		position: relative;
	}

	.bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		border-bottom: 1px solid #eee;

		.bar-item {
			position: relative;
		}
	}

	.active {
		color: #007AFF;
	}

	.active::after {
		content: '';
		position: absolute;
		bottom: -30rpx;
		left: 5rpx;
		background-color: #007AFF;
		width: 60rpx;
		height: 5rpx;
	}

	.select {
		display: flex;
		justify-content: space-around;

		.content {
			width: 200%;
		}
	}

	.item {
		display: flex;
		justify-content: space-around;
		width: 95%;
		padding-bottom: 20rpx;
		border-bottom: 1px dashed #ccc;
		margin-left: 20rpx;
		padding: 5px 0;
		box-sizing: border-box;
	}

	.scrollBox {
		height: 1000rpx;
	}
</style>
