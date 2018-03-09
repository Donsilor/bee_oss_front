<template>
	<div class="page-content config-page">
		<!--推送历史记录-->
		<div>
			<el-table
					:data="pushHistoryList.tableData"
					style="width: 100%; border-top:0 none">
				<el-table-column v-for="item in pushHistoryList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template scope="scope">
						<div v-if="item.prop == 'type'" >{{getTypeText(scope.row.type)}}</div>
						<div v-else-if="item.prop == 'push_type'" >{{scope.row.push_type ? '灰度' : '全量'}}</div>
						<div v-else-if="item.prop == 'total_nums'" >{{scope.row.total_nums + '/' + scope.row.success_nums}}</div>
						<div v-else-if="item.prop == 'status'" >{{getStatusTextPush(scope.row.status)}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template scope="scope">
						<el-button  type="text" size="small" @click="getPushDetail(scope.row)">推送详情</el-button>
						<el-button  type="text" size="small" @click="getPushNameList(scope.row)">查看名单</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--推送详情-->
		<el-dialog title="推送详情" :visible.sync="pushDetailFlag">
			<div class="edit_form">
				<el-table
						:data="pushDetailList.tableData"
						style="width: 100%; border-top:0 none">
					<el-table-column v-for="item in pushDetailList.tableColumn" :key="item.prop"
									 :prop="item.prop"
									 :label="item.label"
									 :width="'auto'"
					>
						<template scope="scope">
							<div v-if="item.prop == 'status'" >{{getStatusTextPush(scope.row.status)}}</div>
							<div v-else>{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="text-align: right; margin: 0">
				<el-button type="primary"  @click="pushDetailFlag=false" >确定</el-button>
			</div>
		</el-dialog>
		<!--查看名单-->
		<el-dialog title="推送名单" :visible.sync="pushNameListFlag">
			<div class="edit_form">
				<el-table
						:data="pushNameList.tableData"
						style="width: 100%; border-top:0 none">
					<el-table-column v-for="item in pushNameList.tableColumn" :key="item.prop"
									 :prop="item.prop"
									 :label="item.label"
									 :width="'auto'"
					>
						<template scope="scope">
							<div>{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="text-align: right; margin: 0">
				<el-button type="primary"  @click="pushNameListFlag=false" >确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import * as namespace from '../../store/namespace';
import { mapGetters, mapActions } from 'vuex';
import '../../lib/util.js';
import push_history_json from '../../json/pushHistory.json'
import version_input from './component/versionInputLayer.vue'
import push_update from './component/pushUpdateLayer.vue'
export default {
    components: {
        'version-input': version_input,
		'push-update': push_update
	},
	data () {
		return {
            pushDetailFlag: false,
			pushNameListFlag: false,
			info: {},
            pushDetail: {
                id: '',
				version: '',
				type: '',
				uuid: '',
				created_at: '',
				status: ''
			},
			infoBoxFlag: false,
			totalItem: 0,
			currentPushData: {},
			currentPage: 1,
            pushHistoryList: {},
            ruleFormDetail: {},
            rulesDetail: {},
            pushDetailList: {
                "tableColumn":[
                    {"prop": "id", "label": "id"},
                    {"prop": "uuid", "label": "设备标识uuid"},
                    {"prop": "created_at", "label": "升级成功时间"},
                    {"prop": "status", "label": "升级状态"}
                ],
                "tableData":[]
			},
            pushNameList: {
                "tableColumn":[
                    {"prop": "id", "label": "id"},
                    {"prop": "uuid", "label": "设备标识uuid"},
                    {"prop": "created_at", "label": "创建时间"}
                ],
                "tableData":[]
            }
		}
	},
	mounted () {
		this.getPushList(1);
	},
	methods: {
        pageChange () {
            this.getPushList(this.currentPage)
        },
        formatTime (val) {
            if (!val) {
                return '------'
			} else {
                let date = new Date(val*1000)
                return date.Format('yyyy-MM-dd hh:mm:ss')
			}
		},
        getTypeText (type) {
		    let text = ''
		    switch(type) {
				case 1:
				    text = 'app'
					break
                case 2:
                    text = '路由器'
                    break
                case 3:
                    text = '子设备'
                    break
                case 4:
                    text = 'IOS APP'
                    break
				case 5:
				    text = 'H5'
					break
                default:
                    text = 'Android_Pad'
                    break
			}
			return text
		},
        getStatusTextPush(type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '成功'
                    break
                case 0:
                    text = '失败'
                    break
                default:
                    break
            }
            return text
        },
        getStatusText (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '有效'
                    break
                case 0:
                    text = '无效'
                    break
                default:
                    break
            }
            return text
        },
        getForceText (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '强制升级'
                    break
                case 0:
                    text = '不强制'
                    break
                default:
                    break
            }
            return text
        },
		getPushList (page) {
            this.pushHistoryList = push_history_json
			let obj = this
			let param = {
                method: 'history_push_logs',
				limit: 10,
				page: page
			}
            obj.$store.dispatch('pubilcCorsAction', param).then((result) => {
                obj.pushHistoryList.tableData = result.result ? result.result.items : []
                // 翻页效果
				obj.totalItem =  result.result ? result.result.page.total : 0
            })
		},
        getPushDetail (dataObj) {
			this.pushDetailFlag = true
            let obj = this
            let param = {
                push_log_id: dataObj.id,
				type: dataObj.type,
			    version: dataObj.version,
                product_id: dataObj.product_id,
                method: 'push_detail'
            }
            obj.$store.dispatch('pubilcCorsAction', param).then((result) => {
                obj.pushDetailList.tableData = result.result ? result.result.items : []
                // 翻页效果
            })
		},
        getPushNameList (dataObj) {
            this.currentPushData = dataObj
            this.pushNameListFlag = true
            let obj = this
            let param = {
                push_log_id: dataObj.id,
                type: dataObj.type,
                version: dataObj.version,
                method: 'push_list'
            }
            obj.$store.dispatch('pubilcCorsAction', param).then((result) => {
                obj.pushNameList.tableData = result.result ? result.result.items : []
            })
		}
	},
    ...mapActions([
		'pubilcCorsAction'
    ]),
	computed: {
		...mapGetters({})
	}
}
</script>
<style lang="less">
	.cp-filterFormBox{
		padding: 20px;
		label{
			line-height: 36px;
		}
		.cpf-line{
			margin-bottom: 20px;
		}
	}
.config-page{
	.el-tabs__active-bar{
		height: 2px;
	}
	.h3_pp{
		height: 30px;
		line-height: 30px;
		margin:30px 0 15px;
	}
	.cpsr-line{
		margin-bottom: 80px;
	}
	.infoBox{
		font-size: 1rem;
		>div{
			margin-bottom: 18px;
		}
	}
	.edit_form{
		.el-form-item__label{
			width: 80px;
		}
		.el-select{
			width: 100%;
		}
	}
	.el-input.is-disabled .el-input__inner{
		color: #333;
	}
	.p-r{
		position: relative;
	}
	.btn-back{
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>