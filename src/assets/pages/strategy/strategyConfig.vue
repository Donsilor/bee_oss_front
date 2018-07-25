<template>
	<div class="page-content config-page">
		<!--顶部tab-->
		<div style="position: relative">
			<el-row :gutter="24">
				<el-col :span="2" style="padding-right: 0; ">
					<el-button type="primary" @click="openAddEditLayer()">添加策略组配置说明</el-button>
				</el-col>
			</el-row>
		</div>
		<!--列表-->
		<div style="margin-top: 20px">
			<el-table
					:data="imgList.tableData"
					style="width: 100%; border-top:0 none">
					<el-table-column v-for="item in imgList.tableColumn" :key="item.prop"
									 :prop="item.prop"
									 :label="item.label"
									 :width="'auto'"
					>
						<template slot-scope="scope">
							
							<div>{{scope.row[item.prop]}}</div>
						</template>
					</el-table-column>
					<el-table-column
							width="180"
							label="操作">
						<template slot-scope="scope">
							<el-button  type="text" size="small" @click="openEditLayer(scope.row)">编辑</el-button>
							<el-button  type="text" size="small" @click="deleteImg(scope.row)">删除</el-button>
							
						</template>
					</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--添加/修改-->
		<el-dialog :title="addEditFlag?'添加策略组':'编辑策略组'" :visible.sync="addEditLayer">
			<div class="edit_form">
				<el-form :model="AddEditForm" :rules="rulesAddEdit" ref="AddEditForm" label-width="100px" >
					
				<el-form-item label="字段类型">
    				<el-select v-model="AddEditForm.F_type" placeholder="请选择">
                        <el-option label="灰度服务器" value="gray_host">
                        </el-option>
                        <el-option label="策略开关" value="strategy_switch">
                        </el-option>
                    </el-select>
				</el-form-item>
                

				<el-form-item label="字段值" v-if="AddEditForm.F_type == 'gray_host'">
				    <el-input v-model="AddEditForm.F_value"></el-input>
				</el-form-item>

                <el-form-item label="字段值" v-if="AddEditForm.F_type == 'strategy_switch'">
                   
                    <el-select v-model="AddEditForm.F_value" placeholder="请选择">
                        <el-option label="on" value="on">
                        </el-option>
                        <el-option label="off" value="off">
                        </el-option>
                    </el-select>
                </el-form-item>

				<el-form-item label="字段补充说明">
				    <el-input v-model="AddEditForm.F_desc"></el-input>
				</el-form-item>
					
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
import { Message } from 'element-ui'
import Sortable  from 'sortablejs'
import getCorsUrl from '../../lib/corsconfig'
import API from '../../service/index'
export default {
	data () {
	    return {
            addEditLayer: false,
            totalItem: 0,
            currentPage: 1,
            listParams: {
                page: 1
			},
	        imgList: {
                "tableColumn":[
                    {"prop": "F_id", "label": "id"},
                    {"prop": "F_type", "label": "字段类型"},
                    {"prop": "F_value", "label": "字段值"},
                    {"prop": "F_desc", "label": "字段补充描述"},
                    {"prop": "F_create_time", "label": "创建时间"}
                ],
                "tableData":[]
            },
            addEditFlag: true,
            AddEditForm: {
               F_id: '',
               F_strategy_name: '',
               F_value: '',
               F_type: '',
               F_desc: '',
               F_host_list: ''
            },
            rulesAddEdit: {
            },
            sortArr: [],
		}
	},
    mounted () {
        this.getImgList(1);

        let table = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        let obj = this
    },
	methods: {
        getdata () {
            console.log('移动中.....')
		},
        openAddEditLayer () {
            this.addEditFlag = true
            this.addEditLayer = true
            this.$nextTick(() => {
				let currentForm = this.AddEditForm
				for (let attr in currentForm) {
                    currentForm[attr] = ''
				}
            })
		},
        pageChange () {
            this.getImgList(this.currentPage)
        },
        deleteImg (dataObj) {
            const obj  = this
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.StrategyConfigDel({F_id: dataObj.F_id}).then((result) => {
                    if (result.code === 200) {
                        obj.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        obj.getImgList(obj.currentPage)
                    }
                })
            }).catch(() => {

            });
        },
        openEditLayer (dataObj) {
            this.addEditFlag = false
            this.addEditLayer = true
            this.$nextTick(() => {
                let currentData = this.AddEditForm
				for (let attr in currentData) {
                    currentData[attr] = dataObj[attr]
				}
            })
        },
        addEditConfirm (formName) {
            let obj = this
            obj.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentParam = JSON.parse(JSON.stringify(obj.AddEditForm))
                    delete currentParam.image_url
                    if (obj.addEditFlag) {
                        delete currentParam.id
                    }
                    if (!obj.addEditFlag) {
                    API.StrategyConfigEdit(currentParam).then((result) => {
                        if (result && result.code === 200) {
                            Message({
                                message:  '编辑成功',
                                type: 'success'
                            })
                            obj.addEditLayer = false
                            obj.getImgList(obj.currentPage)
                        }
                        
                    })
                	}else{
                    API.StrategyConfigAdd(currentParam).then((result) => {
                   
                            if (result && result.code === 200) {
                                Message({
                                    message:  '新增成功',
                                    type: 'success'
                                })
                                obj.addEditLayer = false
                                obj.getImgList(obj.currentPage)
                            } else {
                                Message({
                                    message: result.list[0].detail,
                                    type: 'error'
                                })
                            }
                        
                        })
                	}
                } else {
                    return false
                }
            })
        },
		getImgList (page) {
            this.listParams.page = page
            this.listParams.limit = 10
            const obj  = this
            API.StrategyConfiglists(obj.listParams).then((result) => {
                console.log(result)
                if (result && result.result && result.result.length) {
                    let currentArr = result.result
                    obj.imgList.tableData = currentArr
                    obj.totalItem = result.result.total || 0
                    obj.sortArr = []
                    currentArr.forEach((item) => {
                        obj.sortArr.push(item.id)
					})
                }
            })
		},
       

	},
    ...mapActions([
    	'StrategyConfiglists'
    ]),
    computed: {
        ...mapGetters({})
    }
}
</script>
<style lang="less">
	.icon-rank{
		position: relative;
		left: 10px;
		top: 8px;
		display: inline-block;
		width: 30px;
		height: 30px;
		background-color: #333;
		background-image: url("../../../assets/images/icon-rank.png");
		background-size: 100% 100%;
	}
	.img-con{
		max-width: 100%;
		max-height: 100%;
		overflow: hidden;
		img{
			max-width: 100%;
			max-height: 100%;
		}
	}
</style>