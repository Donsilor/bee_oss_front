<template>
	<div class="page-content config-page">
		<!--顶部tab-->
		<div style="position: relative">
			<el-row :gutter="24">
				<el-col :span="3" style="padding-right: 0; ">
					<el-input v-model="listParams.router_id" placeholder="router_id"></el-input>
				</el-col>
				<el-col :span="3" style="padding-right: 0; ">
					<el-input v-model="listParams.device_uuid" placeholder="device_uuid"></el-input>
				</el-col>
				<el-col :span="2" style="padding-right: 0; ">
					<el-button type="primary" @click="getRouterList()">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
				</el-col>
			</el-row>
			<div style="position: absolute; top:0; right: 0">
				<el-button-group>
					<el-button @click="openLayer">添加 <i class="el-icon-caret-bottom"></i></el-button>
					<el-button @click="goToImport">批量导入 <i class="el-icon-caret-bottom"></i></el-button>
				</el-button-group>
			</div>
		</div>
		<!--列表-->
		<div style="margin-top: 20px">
			<el-table
					:data="routerList.tableData"
					style="width: 100%; border-top:0 none">
				<el-table-column v-for="item in routerList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template scope="scope">
						<div v-if="item.prop == 'device_state'" >{{getStatusText(scope.row.device_state)}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template scope="scope">
						<el-button  type="text" size="small" @click="openEditLayer(scope.row)">编辑</el-button>
						<el-button  type="text" size="small" @click="delRouter(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--添加删除-->
		<el-dialog :title="addEditFlag?'添加路由':'编辑路由'" :visible.sync="addEditLayer">
			<div class="edit_form">
				<el-form :model="AddEditForm" :rules="rulesAddEdit" ref="AddEditForm" label-width="100px" >
					<el-row>
						<el-col :span="12">
							<el-form-item label="设备名称" prop="device_name">
								<el-input v-model="AddEditForm.device_name" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="UUID" prop="device_uuid">
								<el-input v-model="AddEditForm.device_uuid" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="设备验证KEY" prop="device_auth_key">
								<el-input v-model="AddEditForm.device_auth_key" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设备编号" prop="device_sn">
								<el-input v-model="AddEditForm.device_sn" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="设备MAC" prop="device_mac">
								<el-input v-model="AddEditForm.device_mac" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设备状态" prop="device_state">
								<el-select v-model="AddEditForm.device_state" placeholder="请选择">
									<el-option label="正常" :value="1"></el-option>
									<el-option label="禁用" :value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="设备参数">
								<el-input v-model="AddEditForm.device_params" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div style="text-align: right; margin: 0">
				<el-button type="primary"  @click="addEditConfirm('AddEditForm')" >确定</el-button>
				<el-button  @click="addEditLayer=false" >取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import * as namespace from '../../store/namespace'
import { mapGetters, mapActions } from 'vuex'
import '../../lib/util.js'
import router_list_json from '../../json/routerList.json'
import { Message } from 'element-ui'
export default {
    components: {
	},
	data () {
		return {
            addEditFlag: true,
            addEditLayer: false,
            totalItem: 0,
            currentPage: 1,
			listParams: {
                page: 1,
				limit: 10,
                router_id: '',
                device_uuid: ''
			},
            routerList: {},
            AddEditForm: {
                device_name: '',
                device_uuid: '',
                device_auth_key: '',
                device_sn: '',
                device_mac: '',
                device_state: '',
                device_params: '',
				router_id: ''
			},
            rulesAddEdit: {
                device_name: [
                    { required: true, message: '请输入设备名称' }
                ],
                device_uuid: [
                    { required: true, message: '请输入UUID' }
                ],
                device_auth_key: [
                    { required: true, message: '请输入设备验证KEY' }
                ],
                device_sn: [
                    { required: true, message: '请输入设备编号' }
                ],
                device_mac: [
                    { required: true, message: '请输入设备MAC' }
                ],
                device_state: [
                    { required: true, message: '请选择设备状态' }
                ]
			}
		}
	},
	filters: {
		typeToString (x) {
			if (x*1 === 1) {
				return 'APP';
			} else if (x*1 === 2) {
				return '路由器';
			} else if (x*1 === 3) {
				return '子设备';
			} else {
				return '未知';
			}
		},
		forceToString (x) {
			return x ? '是': '否'; 
		},
		statusToString (x) {
			return x ? '启用': '停用';
		}
	},
	watch: {
	},
	mounted () {
		this.getRouterList(1);
	},
	methods: {
        openEditLayer (dataObj) {
            this.addEditFlag = false
            this.addEditLayer = true
            this.$nextTick(() => {
                this.rulesAddEdit.device_auth_key = [
                    { required: false }
                ]
                let currentData = this.AddEditForm
				for (let attr in currentData) {
                    currentData[attr] = dataObj[attr] || ''
				}
            })
		},
		delRouter (dataObj) {
            const obj  = this
			let currentParam = {
                router_list: [{
                    router_id: dataObj.router_id,
                    device_uuid: dataObj.device_uuid
                }]
			}
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                obj.$store.dispatch('deleteRouter', currentParam).then((result) => {
                    if (result.code === 0) {
                        obj.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        obj.getRouterList(1)
                    }
                })
            }).catch(() => {

            });
		},
        goToImport () {
            this.$router.push({path: '/main/routerManager/import'})
		},
        formatTime (val) {
            if (!val) {
                return '------'
			} else {
                let date = new Date(val*1000)
                return date.Format('yyyy-MM-dd hh:mm:ss')
			}
		},
		openLayer () {
            this.addEditFlag = true
            this.addEditLayer = true
            this.$nextTick(() => {
                this.$refs['AddEditForm'].resetFields()
            })
		},
		pageChange () {
			this.getRouterList(this.currentPage)
		},
        // 获取路由列表
		getRouterList(page) {
			this.routerList = router_list_json
			this.listParams.page = page
			const obj  = this
            obj.$store.dispatch('routerList', obj.listParams).then((result) => {
                if (result && result.list && result.list.length) {
                    obj.routerList.tableData = result.list
					obj.totalItem = result.total
				}
            })
		},
        getStatusText (type) {
		    let text = ''
		    switch(type) {
				case 1:
				    text = '工厂测试'
					break
                case 2:
                    text = '库存'
                    break
                case 3:
                    text = '销售出'
                    break
                case 5:
                    text = '返修'
                    break
                case 6:
                    text = '失效'
                    break
                default:
                    text = '未知'
                    break
			}
			return text
		},
		// 新增/编辑路由
        addEditConfirm (formName) {
            let obj = this
            obj.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentAction = obj.addEditFlag ? 'addRouter' : 'editRouter'
					let currentParam = JSON.parse(JSON.stringify(obj.AddEditForm))
					if (obj.addEditFlag) {
					   delete currentParam.router_id
					}
                    obj.$store.dispatch(currentAction, currentParam).then((result) => {
                        if (!obj.addEditFlag) {
							if (result && result.code === 0) {
                                Message({
                                    message:  '编辑成功',
                                    type: 'success'
                                })
                                obj.addEditLayer = false
                                obj.getRouterList(1)
							}
						} else {
                            if (result && result.list && (result.list[0].code === 0)) {
                                Message({
                                    message:  '新增成功',
                                    type: 'success'
                                })
                                obj.addEditLayer = false
                                obj.getRouterList(1)
							} else {
                                Message({
                                    message: result.list[0].detail,
                                    type: 'error'
                                })
							}
						}
                    })
                } else {
                    return false
                }
            })
		}
	},
    ...mapActions([
        'routerList',
        'addRouter',
		'deleteRouter',
		'importRouter'
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