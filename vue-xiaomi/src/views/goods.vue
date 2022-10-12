<template>
	<div class="goods">
		<header>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>全部商品</el-breadcrumb-item>
				<el-breadcrumb-item>分类</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="tab">
				<div class="W">
					<span>分类</span>
					<li
						:class="{ active: !$route.query.categoryID }"
						@click="routeChange()"
					>
						全部
					</li>

					<li
						v-for="item in cateList"
						:key="item.category_id"
						:class="{ active: $route.query.categoryID == item.category_id }"
						@click="routeChange(item.category_id)"
					>
						{{ item.category_name }}
					</li>
				</div>
			</div>
		</header>
		<main>
			<div class="W">
				<ul class="list">
					<li v-for="item in goodsList" :key="item.product_id">
						<goods-cell :goodsItem="item"></goods-cell>
					</li>
				</ul>
				<el-pagination
					layout="prev, pager, next"
					:current-page.sync="currentPage"
					:page-size="15"
					:total="total"
					background
					@current-change="reload"
				></el-pagination>
			</div>
		</main>
	</div>
</template>

<script>
	import {
		getAllgoodscate,
		getAllgoods,
		getProductByCategory,
		seachGoods,
	} from '../api/api';
	import GoodsCell from '../components/GoodsCell.vue';

	export default {
		name: '',
		components: {
			GoodsCell,
		},
		data() {
			return {
				cateList: [],
				goodsList: [],
				currentPage: 1,
				total: 0,
			};
		},
		created() {
			getAllgoodscate().then((res) => {
				console.log(res);
				this.cateList = res.data.category;
			});

			this.reload();
		},
		methods: {
			reload() {
				if (this.$route.query.search) {
					seachGoods({
						search: this.$route.query.search,
						currentPage: this.currentPage,
						pageSize: 15,
					}).then((res) => {
						this.goodsList = res.data.Product;
					});
				} else if (this.$route.query.categoryID) {
					getProductByCategory({
						categoryID: [this.$route.query.categoryID * 1],
						currentPage: this.currentPage,
						pageSize: 15,
					}).then((res) => {
						this.goodsList = res.data.Product;
					});

					getProductByCategory({
						categoryID: [this.$route.query.categoryID * 1],
					}).then((res) => {
						this.total = res.data.Product.length;
					});
				} else {
					getAllgoods({
						currentPage: this.currentPage,
						pageSize: 15,
					}).then((res) => {
						this.goodsList = res.data.Product;
					});
					getAllgoods().then((res) => {
						this.total = res.data.Product.length;
					});
				}
			},

			routeChange(id) {
				if (id) {
					this.$router.push({
						path: '/goods',
						query: { categoryID: id },
					});
				} else {
					this.$router.push('/goods');
				}
			},
		},
		watch: {
			$route(to, from) {
				if (to.query != from.query) {
					this.reload();
				}
			},
		},
	};
</script>
<style scoped lang="scss">
	.goods {
		background-color: #f5f5f5;
		header {
			background-color: #fff;
		}
		.el-breadcrumb {
			margin: 20px auto;
			width: 1225px;
			font-size: 16px;
		}

		.tab {
			height: 40px;
			line-height: 40px;
			> div {
				box-sizing: border-box;
				height: 40px;
				border-bottom: #ccc solid 1px;
			}

			span {
				box-sizing: border-box;
				float: left;
				padding-right: 20px;
				height: 40px;
				font-weight: 700;
				border: solid #ccc;
				border-width: 0 1px 1px 0;
			}

			li {
				box-sizing: border-box;
				float: left;
				padding: 0 20px;
				height: 40px;
				border: solid #ccc;
				border-width: 1px 1px 1px 0;
				font-size: 14px;
				background-color: #fff;
			}

			li.active {
				border-bottom: 0;
				color: deepskyblue;
			}
		}

		main {
			padding: 20px 0;

			.list {
				min-height: 600px;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;

				li {
					margin: 0 5.5px 14.5px;
				}
			}

			.el-pagination {
				text-align: center;
			}
		}
	}
</style>