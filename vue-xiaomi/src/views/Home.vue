<template>
	<div>
		<myheade></myheade>
		<!-- 上部导航栏 -->
		<div class="top1 W">
			<div class="top-nav">
				<ul>
					<li>
						<img src="../assets/imgs/logo.png" alt="" @click="changeRouter" />
					</li>
					<li>
						<div
							:class="$route.path == '/homeview' ? `active` : ''"
							@click="gorouter('/')"
						>
							首页
						</div>
						<div
							:class="$route.path == '/goods' ? `active` : ''"
							@click="gorouter('/goods')"
						>
							全部商品
						</div>
						<div
							:class="$route.path == '/about' ? `active` : ''"
							@click="gorouter('/about')"
						>
							关于我们
						</div>
					</li>
				</ul>
			</div>
			<div class="ipt">
				<el-input
					placeholder="请输入内容"
					v-model="searchTxt"
					class="input-with-select"
				>
					<el-button
						slot="append"
						@click="searchGoods"
						icon="el-icon-search"
					></el-button>
				</el-input>
			</div>
		</div>
		<div class="view">
			<router-view></router-view>
		</div>
		<myfooter></myfooter>
	</div>
</template>

<script>
	// import { login } from "@/api/api.js";
	import myheade from '../components/myhead.vue';
	import myfooter from '../components/AsideFooter.vue';
	export default {
		data() {
			return {
				active: '/',
				searchTxt: '',
			};
		},
		created() {},
		methods: {
			changeRouter() {
				this.$router.push('/');
				this.active = '/';
			},
			gorouter(str) {
				this.active = str;
				this.$router.push(str);
			},
			searchGoods() {
				this.$router.push({
					path: '/goods',
					query: { search: this.searchTxt },
				});
			},
		},
		components: {
			myheade,
			myfooter,
		},
	};
</script>
<style lang="scss" scoped>
	.top1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
	}
	.view {
		background-color: #eee;
	}
	.ipt {
		width: 260px;
	}

	.top-nav {
		height: 60px;
		margin-top: 20px;
		border-bottom: 1px solid #eee;
		padding-bottom: 5px;

		ul {
			display: flex;
			li {
				display: flex;
				div {
					padding: 0 20px;
					line-height: 60px;
				}
				.active {
					border-bottom: 2px solid #36f;
				}
				.input-with-select {
					height: 60px;
				}
			}
		}
	}
</style>
