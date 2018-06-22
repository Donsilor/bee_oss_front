<template>
	<div class="page-content rootLog-page">
		<div style="padding-bottom: 30px;">
			<!--搜索框-->
			<el-row :gutter="24" >
				<el-col :span="3" style="padding-right: 0">
					<el-select placeholder="请选择城市">
						<el-option label="暂无数据" value=""></el-option>
					</el-select>
				</el-col>
				<el-col :span="3" style="padding-right: 0">
					<el-select placeholder="请选择小区">
						<el-option label="暂无数据" value=""></el-option>
					</el-select>
				</el-col>
				<el-col :span="3" style="padding-right: 0">
					<el-input v-model="familyForm.phone" placeholder="输入手机号查询"></el-input>
				</el-col>
				<el-col :span="3" style="padding-right: 0; margin-top: 6px">
					<el-checkbox v-model="familyForm.abnormal">仅看异常家庭</el-checkbox>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="getRootLogs(1)">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
				</el-col>
			</el-row>
		</div>
		<div>
			<el-table
					:data="rootLogData.tableData"
					style="width: 100%">
				<el-table-column v-for="item in rootLogData.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :show-overflow-tooltip="true"
								 :label="item.label"
								 :width="'auto'"
								 sortable
				>
					<template slot-scope="scope">
						<div :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="15" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex';
import rootLogJson from '../json/warnList.json'
import '../lib/util'
export default {
	computed: {
	},
    components: {},
	data () {
		return {
            familyForm: {
              phone: '',
			  abnormal: false
			},
            totalItem: 0,
			currentPage: 1,
            rootLogData: {},
            rootLogForm: {
                log_type: '',
                host_name: '',
				select_date: new Date(),
                svr_id: '',
                monitor_name: '',
				limit: 15,
                start_end_time: []
			},
		}
	},
	mounted () {
	    this.getRootLogs(1)
	},
	watch: {
	},
	methods: {
        getDetail (dataObj) {
            this.detailFlag = true
            let obj = this.logDetail
			for (let attr in obj) {
                obj[attr] = dataObj[attr]
			}
		},
        getRootLogs (page) {
            let obj = this
			let param = {}
            let currentForm =  obj.rootLogForm
            currentForm.page = page
			for (let attr in currentForm) {
                if (attr === 'start_end_time') {
                    if (currentForm['start_end_time'].length) {
                        param.start_time = currentForm['start_end_time'][0].Format('hh:mm:ss')
                        param.end_time = currentForm['start_end_time'][1].Format('hh:mm:ss')
					}
				}else {
                    param[attr] = currentForm[attr]
				}
			}
            obj.$store.dispatch('getwarnDataList',param).then((result) => {
                // obj.terminalList = result
                rootLogJson.tableData = result.data.result.data
				this.rootLogData = rootLogJson
				this.totalItem = result.data.result.total
            })
        },
        pageChange () {
            this.getRootLogs(this.currentPage)
        }
	},
    ...mapActions([
		'getwarnDataList'
    ])
}
</script>
<style lang="less">
	.rootLog-page{
		.el-table td>.cell>div{
			overflow:hidden;
			white-space:nowrap;
			text-overflow:ellipsis;
			-o-text-overflow:ellipsis;
			-moz-text-overflow: ellipsis;
			-webkit-text-overflow: ellipsis;
		}
		.el-table .cell, .el-table th>div{
			padding-right: 0;
		}
		.el-date-editor.el-input{
			width: 150px;
		}
	}
	.rootLogDetail{
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