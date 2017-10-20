<template>
	<section class="bnheader">
		<el-row>
			<el-col :span="16" class="bnh-logo">
				<h1>BeeNet OSS管理后台</h1>
			</el-col>
			<el-col :span="8" class="bnh-info">
				<span>张三</span>
				<a href="javascript:;">退出登录</a>
			</el-col>
		</el-row>
	</section>
</template>
<script>
export default {
	data () {
		return {}
	},
	mounted () {

	},
	methods: {

	}
}
</script>
<style lang="less">

.bnheader{
	position: relative;
	z-index: 100;
	background: #2B2B37;
	color: #ffffff;
	height: 80px;
}
.bnh-logo{
	font-size: 1.5em;
	padding-left: 2em;
	height: 80px;
	display: flex;
	align-items: center;
}
.bnh-info{
	height: 80px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding-right: 3em;
	span{
		margin-right: 2em;
	}
	a{
		color: #ffffff;
	}
	
}
</style>