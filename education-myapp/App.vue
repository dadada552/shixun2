<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import url("common/css/common.css");
	@import url('static/icon/iconfont.css');
	@import url('static/icon/teacth/iconfont.css');
	@import url('static/icon/play/iconfont.css');
	@import url('static/icon/gotop/iconfont.css');
	@import url('static/icon/my/iconfont.css');
	@import "./uni_modules/vk-uview-ui/index.scss";
	// @import url('@/uni_modules/vk-uview-ui/index.scss');
	/* @import url('@/uni_modules/vk-uview-ui/index.scss'); */
	*{
		margin: 0;
		padding: 0;
	}
	
	scroll-view[show-scrollbar="false"] ::-webkit-scrollbar{
		display: none;
	}
</style>
