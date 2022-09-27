<template>
	<div class="header">
		<div class="back" @click="back">
			<text class="iconfont icon-back"></text>
		</div>

		<div class="title">
			1111
		</div>
	</div>

	<div class="info">
		<div class="tag-list">
			<text class="tag-item" v-for="item in info.labelList" :key="item.id">
				{{item.name}}
			</text>
		</div>

		<div class="info-title">
			{{info.title}}
		</div>

		<div class="info-head">
			<img src="http://m.mengxuegu.com/static/logo.png" alt="">
			{{info.nickName}}
			<text>
				· {{ timer(+new Date(info.createDate)) }} · {{info.viewCount}}人阅读
			</text>
		</div>

		<div class="markdown-body" v-html="info.htmlContent"></div>

		<div class="comment">
			<div class="comment-title">
				热门评论
			</div>
			<div class="comment-list">
				<div class="list-item" v-for="item in comment" :key="item.id">
					<div class="list-left">
						<img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
					</div>
					<div class="list-right">
						<div class="right-head">
							<text>{{item.nickName}}</text>
							<text>{{timer(+new Date(item.createDate))}}</text>
						</div>
						<div class="right-cnt">
							{{item.content}}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="foot">
			<input type="text" placeholder="有何高见,展开讲讲....." v-model="val" @input="changeVal">
			<u-button @click="add" class="btn" :disabled="!isDisabled">提交</u-button>
		</div>
	</div>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getDetailList,
		getHotComment
	} from '../../api/api.js'
	import {
		reactive,
		toRefs
	} from 'vue'
	import {
		timer
	} from '../../utils/time.js'

	const data = reactive({
		info: {},
		comment: [],
		isDisabled: false,
		val: '',
		id: 1
	})

	onLoad((option) => {
		data.id = option.id
		getDetailList(option.id).then(res => {
			data.info = res.data.data
		})

		getHotComment(option.id).then(res => {
			data.comment = res.data.data
		})
	})


	const changeVal = () => {
		if (data.val.length == 0) {
			data.isDisabled = false
		} else {
			data.isDisabled = true
		}
	}

	// 提交评论
	const add = () => {
		let flag = false
		uni.getStorage({
			key: 'loginIngo',
			success: (res) => {
				flag = true
			}
		})
		if (flag) {
			getHotComment(data.id).then(res => {
				data.comment = res.data.data
			})
			data.val = ''
			uni.showToast({
				title: '发表成功!',
				icon: 'none'
			})
		} else {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
	}

	// 返回上一页
	const back = () => {
		uni.navigateBack()
	}

	const {
		info,
		comment,
		val,
		isDisabled
	} = toRefs(data)
</script>

<style lang="scss">
	.foot {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		border-top: 0.5px solid #efeff4;
		display: flex;
		padding: 10px;
		box-sizing: border-box;

		input {
			width: 95%;
			height: 30px;
			background-color: #f8f9fb;
			border-radius: 10px;
			padding-left: 10px;
			box-sizing: border-box;
		}

		.btn {
			width: 81rpx;
			height: 30px;
			margin-left: 10px;
		}
	}

	.comment {
		background-color: #fff;
		margin-top: 5px;
		padding-bottom: 60px;

		.comment-list {
			width: 100%;

			.list-item {
				padding: 10px 12px;
				display: flex;

				.list-right {
					flex: 1;

					.right-head {
						display: flex;
						font-size: 12px;
						color: #959da5;
						justify-content: space-between;
					}
				}

				.list-left {
					width: 10%;

					img {
						border-radius: 50%;
						width: 50rpx;
						height: 50rpx;
					}
				}
			}
		}

		.comment-title {
			font-size: 15px;
			color: #303133;
			font-weight: 700;
			border-left: 3px solid #345dc2;
			padding-left: 10px;
			margin: 10px 0;
		}
	}

	.markdown-body {
		padding: 5px;
		box-sizing: border-box;
	}

	.info {
		width: 100%;
		margin-top: 40px;
		padding: 0 10px;
		box-sizing: border-box;

		.info-head {
			width: 100%;
			margin: 20px 0;
			display: flex;
			align-items: center;

			text {
				font-size: 12px;
				color: #999;
				margin-left: 5px;
			}

			img {
				width: 44rpx;
				height: 44rpx;
				margin-right: 10px;
			}
		}

		.info-title {
			font-size: 22px;
			line-height: 27px;
			font-weight: 700;
		}

		.tag-list {
			width: 100%;
			margin: 10px 0;
			padding: 5px 12px;

			.tag-item {
				padding: 2px 8px;
				border: 1px solid #007aff;
				border-radius: 20px;
				font-size: 12px;
				color: #007aff;
				margin-right: 10px;
			}
		}
	}

	.header {
		position: fixed;
		width: 100%;
		height: 40px;
		top: 0;
		left: 0;
		line-height: 40px;
		box-sizing: border-box;
		padding: 0 10px;
		text-align: center;
		background-color: #fff;

		.title {
			font-weight: 700;
		}

		.back {
			float: left;

			.icon-back {
				font-size: 20px
			}
		}
	}
</style>
