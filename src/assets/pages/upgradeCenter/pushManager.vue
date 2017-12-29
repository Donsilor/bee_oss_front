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
						<div v-else-if="item.prop == 'status'" >{{getStatusTextPush(scope.row.status)}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template scope="scope">
						<el-button  type="text" size="small" @click="getVersionDetail(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--版本详情-->
		<el-dialog title="版本详情" :visible.sync="infoBoxFlag">
			<div class="edit_form">
				<el-form :model="ruleFormDetail" :rules="rulesDetail" ref="ruleFormDetail" label-width="100px" >
					<el-row>
						<el-col :span="12">
							<el-form-item label="版本Title" prop="title">
								<el-input :disabled="true" v-model="ruleFormDetail.title" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="版本号" prop="version">
								<el-input :disabled="true" v-model="ruleFormDetail.version" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="概略描述" prop="description">
								<el-input :disabled="true" v-model="ruleFormDetail.description" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="详细事项" prop="description">
								<el-input :disabled="true" v-model="ruleFormDetail.description" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="是否强制升级" prop="force">
								<el-select :disabled="true" v-model="ruleFormDetail.force" placeholder="请选择">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="版本状态" prop="status">
								<el-select :disabled="true" v-model="ruleFormDetail.status" placeholder="请选择">
									<el-option label="启用" :value="1"></el-option>
									<el-option label="停用" :value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="限制规则" prop="description">
						<el-input :disabled="true" v-model="ruleFormDetail.description" placeholder=""></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="固件大小" prop="size">
								<el-input :disabled="true" v-model="ruleFormDetail.size" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="下载url" prop="download_url_object">
								<el-input :disabled="true" v-model="ruleFormDetail.download_url_object" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="图标url" prop="img_url_object">
								<el-input :disabled="true" v-model="ruleFormDetail.img_url_object" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发布时间" prop="release_tm">
								<el-input :disabled="true" v-model="ruleFormDetail.release_tm" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="下载md5" prop="download_file_md5">
								<el-input :disabled="true" v-model="ruleFormDetail.download_file_md5" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="创建时间" prop="created_at">
								<el-input :disabled="true" v-model="ruleFormDetail.created_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="更新时间" prop="updated_at">
								<el-input :disabled="true" v-model="ruleFormDetail.updated_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="删除时间" prop="delete_at">
								<el-input :disabled="true" v-model="ruleFormDetail.delete_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div style="text-align: right; margin: 0">
				<el-button type="primary"  @click="infoBoxFlag=false" >确定</el-button>
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
            pushBoxFlag: false,
			info: {},
			infoBoxFlag: false,
			totalItem: 20,
			currentPage: 1,
			listParams: {
                method: 'list_versions',
                page: 1,
                limit: 5,
                level: 1
			},
            pushHistoryList: {},
            ruleFormDetail: {},
            rulesDetail: {}
		}
	},
	mounted () {
		this.getPushList(1);
	},
	methods: {
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
                default:
                    text = 'H5'
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
		getPushList () {
            this.pushHistoryList = push_history_json
			let obj = this
			let param = {
                method: 'released_versions',
				type: 1
			}
            obj.$store.dispatch('pubilcCorsAction', param).then((result) => {
                obj.pushHistoryList.tableData = result.result
                // 翻页效果
            })
		},
        getVersionDetail (dataObj) {

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