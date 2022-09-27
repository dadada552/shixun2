<template>
	<view class="study-list" v-for="item in studyList" :key="item.id">
		<div class="study-left">
			<div class="title">{{item.title}}</div>
			<div class="steep">
				已学{{item.percent}}%
				<progress :percent="item.percent" style="margin-top: 5px;"></progress>
			</div>
		</div>
		<div class="study-right">
			<img :src="item.mainImage" alt="">
		</div>
	</view>
</template>

<script setup>
	import {
		getMyStudy
	} from '../../api/api.js'
	import {
		reactive,
		toRefs
	} from 'vue'

	const data = reactive({
		studyList: []
	})

	getMyStudy().then(res => {
		console.log(res);
		data.studyList = res.data.data
	})

	const {
		studyList
	} = toRefs(data)
</script>

<style lang="scss">
	.study-list {
		width: 100%;
		display: flex;
		padding: 15px 10px;
		box-sizing: border-box;

		.study-left {
			width: 60%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-right: 10px;
			padding-bottom: 5px;

			.title {
				font-size: 14px;
				font-weight: 700;
				line-height: 17px;
			}
		}

		.study-right {
			flex: 1;

			img {
				width: 100%;
				height: 75px;
				border-radius: 5px;
			}
		}
	}
</style>
