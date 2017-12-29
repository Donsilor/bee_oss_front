<template>
	<div class="edit_form versionDetail">
		<div style="padding-bottom:15px">
			<el-date-picker
					v-model="logOutForm.date"
					@change="changeSelectLogOutDate"
					placeholder="今天"
			>
			</el-date-picker>
		</div>
		<div class="childDevice">
			<el-table
					:data="logOutList.tableData"
					style="width: 100%">
				<el-table-column v-for="item in logOutList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
				>
					<template scope="scope">
						<div :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="page-line">
			<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ['operateLogList'],
	data () {
		return {

		}
	},
	mounted () {
	},
	methods: {
	},
    computed: {
        ...mapGetters({
        })
    }
}
</script>
<style lang="less">
	.edit_form{
		.el-form-item__label{
			width: 80px;
		}
		.el-select{
			width: 100%;
		}
	}
	.versionDetail{
		.el-form-item__content{
			word-wrap: break-word;
			line-height: 30px;
		}
		.el-form-item{
			margin-bottom: 3px;
		}
		.el-form-item__label{
			line-height: 30px;
			padding-top: 0;
			padding-bottom: 0;
			color: #999;
		}
	}
</style>