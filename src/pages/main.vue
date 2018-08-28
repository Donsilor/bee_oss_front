<template>
	<div class="container">
		<bheader></bheader>
		<div class="content">
			<el-row>
				<el-col :span="3">
					<bnav></bnav>
				</el-col>
				<el-col :span="21">
					<div class="page">
						<router-view></router-view>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
import Bheader from "../components/bheader.vue";
import Bnav from "../components/bnav.vue";
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    components: {
        Bheader,
        Bnav
    }
};
</script>
<style lang="less">
</style>
