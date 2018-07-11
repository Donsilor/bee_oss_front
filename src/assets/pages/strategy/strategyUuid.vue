<template>
	<div class="page-content config-page">
		<div style="position: relative">
			
			<!--搜索框-->
			<el-row type="flex" justify="space-between">
				<el-col :span="8">
					<el-input class="searchInput" v-model="searchKey" :maxlength="11" type="text" placeholder="输入用策略组id" />
					<el-button type="primary" @click="search">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
				</el-col>

				<el-col :span="20" style="padding-right: 0; ">
					<el-button type="primary" @click="openAddEditLayer()">添加用户所在策略组</el-button>
				</el-col>
				
				<!--<el-col :span="6" style="text-align: right;">-->
					<!--<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>-->
				<!--</el-col>-->
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
							width="280"
							label="操作">
						<template slot-scope="scope">
							<el-button  type="text" size="small" @click="openEditLayer(scope.row)">编辑用户策略组</el-button>
							<el-button  type="text" size="small" @click="deleteImg(scope.row)">从该组中移除</el-button>
							
						</template>
					</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--添加/修改-->
		<el-dialog :title="addEditFlag?'添加用户所在策略组':'编辑用户所在策略组'" :visible.sync="addEditLayer">
			<div class="edit_form">
				<el-form :model="AddEditForm" :rules="rulesAddEdit" ref="AddEditForm" label-width="80px" >
					<el-form-item label="用户uuid">
				    <el-input v-model="AddEditForm.F_uuid"></el-input>
					</el-form-item>
					<el-form-item label="策略组id">
					    <el-input v-model="AddEditForm.F_strategy_id"></el-input>
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
export default {
	data () {
	    return {
            addEditLayer: false,
            totalItem: 0,
            currentPage: 1,
            searchKey:'',
            listParams: {
                page: 1
			},
	        imgList: {
                "tableColumn":[
                    {"prop": "F_uuid", "label": "uuid"},
                    {"prop": "F_strategy_id", "label": "策略组id"},
                    {"prop": "F_create_time", "label": "创建时间"}
                ],
                "tableData":[]
            },
            addEditFlag: true,
            AddEditForm: {
               F_strategy_id: '',
               F_uuid: ''
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
		search () {
			if (!this.searchKey) {
			  this.$message.error('请输入策略组id')
			  return
			}
			this.getImgList()
		},
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
                obj.$store.dispatch('StrategyUuidDel', {F_strategy_id: dataObj.F_strategy_id}).then((result) => {
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
                this.fileListObj = [{name: dataObj['image_url_object'], url: dataObj['image_url_object']}]
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
                    obj.$store.dispatch('StrategyUuidEdit', currentParam).then((result) => {
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
                    obj.$store.dispatch('StrategyUuidAdd', currentParam).then((result) => {
                   
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
            this.listParams.F_strategy_id = this.searchKey > 0 ? this.searchKey : 1
            const obj  = this
            obj.$store.dispatch('StrategyUuidList', obj.listParams).then((result) => {
                if (result && result.result && result.result.data.length) {
                    let currentArr = result.result.data
                    obj.imgList.tableData = currentArr
                    obj.totalItem = result.total || 0
                    obj.sortArr = []
                    currentArr.forEach((item) => {
                        obj.sortArr.push(item.id)
					})
                }
            })
		},
       

	},
    ...mapActions([
    	'StrategyUuidList'
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