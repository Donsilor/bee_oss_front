<template>
	<div class="page-content rootLog-page">
		<!--<div style="padding-bottom: 10px;">-->
			<!--<el-button type="text" @click="goBack"><<&nbsp;返回</el-button>-->
	    <!--</div>-->
		<div style="padding-bottom: 30px;">
			<!--搜索框-->
			<el-row :gutter="24">
				<el-col :span="22">
					<el-row :gutter="24" >
						<el-col :span="3" style="padding-right: 0">
							<el-input v-model="rootLogForm.uuid" placeholder="uuid"></el-input>
						</el-col>
						<el-col :span="3" style="padding-right: 0">
							<el-input v-model="rootLogForm.msg_tag" placeholder="msg_tag"></el-input>
						</el-col>
						<el-col :span="3" style="padding-right: 0">
							<el-input v-model="rootLogForm.session_id" placeholder="session_id"></el-input>
						</el-col>
						<el-col :span="3" style="padding-right: 0">
							<el-input v-model="rootLogForm.user_id" placeholder="user_id"></el-input>
						</el-col>
						<el-col :span="3" style="padding-right: 0">
							<el-input v-model="rootLogForm.router_id" placeholder="router_id"></el-input>
						</el-col>
						<el-col :span="3">
							<el-date-picker
									style="padding-right: 40px"
									v-model="rootLogForm.select_date"
									placeholder="今天"
							>
							</el-date-picker>
						</el-col>
						<el-col :span="3" >
							<el-time-picker
									is-range
									v-model="rootLogForm.start_end_time"
									range-separator="至"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
									placeholder="选择时间范围">
							</el-time-picker>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="2">
					<el-button type="primary" @click="getRootLogs">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
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
				>
					<template scope="scope">
						<div :title="scope.row[item.prop]">{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<!--<el-table-column-->
						<!--width="auto"-->
						<!--label="日志">-->
					<!--<template scope="scope">-->
						<!--<el-button  type="text" size="small" @click="openLogOutLayer(scope.row)">登录登出日志</el-button>-->
					<!--</template>-->
				<!--</el-table-column>-->
			</el-table>
		</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex';
import rootLogJson from '../json/rootLogs.json'
import '../lib/util'
export default {
	computed: {
	},
    components: {},
	data () {
		return {
            rootLogForm: {
                inner: '',
                uuid: '',
				select_date: new Date(),
                user_id: '',
                router_id: '',
                msg_tag: '',
                session_id: '',
                start_end_time: []
			},
            totalItem: 0,
			currentPage: 1,
            rootLogData: {}
		}
	},
	mounted () {
	},
	watch: {
	},
	methods: {
        goBack () {
            let id = this.$route.params.id
            this.$router.push({path: '/main/ops/' + id})
		},
        getRootLogs () {
            let obj = this
			let param = {}
			let currentForm =  obj.rootLogForm
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
            obj.$store.dispatch('rootLogs',param).then((result) => {
                // obj.terminalList = result
                rootLogJson.tableData = result.data
				this.rootLogData = rootLogJson
            })
        },
        pageChange () {
            this.changeLogOut(this.currentPage)
        }
	},
    ...mapActions([
		'rootLogs'
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
</style>