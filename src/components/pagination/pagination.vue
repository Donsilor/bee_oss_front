<template>
	<div class="block" style="float:right;margin-top:10px;">
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="config.currentPage" :page-sizes="config.pageSizes" :page-size="config.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="config.total">
		</el-pagination>
	</div>
</template>
<script>
export default {
    name: "pagination",
    props: ["config"],
    methods: {
        handleSizeChange(val) {
            this.config.currentPage = 1;
            this.config.pageSize = val;
        },
        handleCurrentChange(val) {
            this.config.currentPage = val;
        }
    }
};
</script>
