<template>
	<view>
		<u-navbar title="意见反馈" immersive :title-bold="true" title-color="#000"></u-navbar>
		<view class="content">
			<view class="topSelect">
				<u-radio-group v-model="selectVal">
					<u-radio v-for="(item, index) in selectList" :key="index" :name="item.name"
						:disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="feedcontent">
				<u-field style="border: 1px solid #ccc;height: 280rpx;" v-model="feedcontent" type="textarea"
					label-width="0" placeholder="请填写具体内容帮助我们了解您的意见和具体内容">
				</u-field>
			</view>
			<view class="qqnumber">
				<u-field style="border: 1px solid #ccc;" v-model="qqnumber" label-width="0" placeholder="请填写你的QQ号">
				</u-field>
			</view>
			<view class="vxnumber">
				<u-field style="border: 1px solid #ccc;" v-model="vxnumber" label-width="0" placeholder="请填写你的微信号">
				</u-field>
			</view>
			<view class="btn">
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
			<u-modal v-model="show" :content="content" @confirm='gomy'></u-modal>
		</view>
	</view>
</template>

<script>
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
			const data = reactive({
				selectVal: '意见反馈',
				feedcontent: '',
				qqnumber: '',
				vxnumber: '',
				content: '我们已经收到你的反馈',
				show: false,
				selectList: [{
						name: '意见反馈',
						disabled: false
					},
					{
						name: '产品建议',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],

			});
			const router = useRouter();
			const route = useRoute();
			const submit = () => {
				if (data.feedcontent.length < 10) {
					uni.showToast({
						title: '意见反馈最少输入10个字符',
						icon: 'error'
					})
				} else {
					if (data.qqnumber == '' && data.vxnumber == '') {
						uni.showToast({
							title: 'QQ或者微信最少输入一个',
							icon: 'error'
						})
					} else {
						data.show = true

					}
				}
			}
			const gomy = () => {
				uni.switchTab({
					url: '../my/my'
				})
			}
			return {
				submit,
				gomy,
				...toRefs(data)
			}
		},
	}
</script>

<style lang='scss' scoped>
	.topSelect {
		text-align: center;
	}

	.feedcontent,
	.qqnumber,
	.vxnumber,
	.btn {
		padding: 0 20rpx;
		margin: 40rpx 0;
	}
</style>
