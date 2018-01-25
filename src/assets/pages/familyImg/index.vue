<template>
	<div class="page-content config-page">
		<!--顶部tab-->
		<div style="position: relative">
			<el-row :gutter="24">
				<el-col :span="2" style="padding-right: 0; ">
					<el-button type="primary" @click="openAddEditLayer()">添加背景图片</el-button>
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
					<template scope="scope">
						<div v-if="item.prop == 'image_url'" ><img :src="scope.row['image_url']" width="20" height="20"></div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template scope="scope">
						<el-button  type="text" size="small" @click="openEditLayer(scope.row)">编辑</el-button>
						<el-button  type="text" size="small" @click="deleteImg(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--添加修改-->
		<el-dialog :title="addEditFlag?'添加路由':'编辑路由'" :visible.sync="addEditLayer">
			<div class="edit_form">
				<el-form :model="AddEditForm" :rules="rulesAddEdit" ref="AddEditForm" label-width="100px" >
					<el-form-item label="上传图片" prop="f_img">
						<el-upload
								ref="uploadFile"
								class="upload-demo"
								action="http://iot-dev-upgrade-center.egtest.cn:7777/oss_file_upload"
								:data="uploadObj"
								:on-success="getUploadData"
								:on-preview="handlePreview"
								:limit="1"
								:file-list="fileListObj"
						>
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="图片预览" prop="f_img">
						<el-input v-model="AddEditForm.f_img" placeholder=""></el-input>
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
export default {
	data () {
	    return {
            fileListObj: [],
            uploadObj: {
                token: JSON.parse(localStorage.getItem('localData')).user.info.token
            },
            addEditLayer: false,
            totalItem: 0,
            currentPage: 1,
            listParams: {
                page: 1
			},
	        imgList: {
                "tableColumn":[
                    {"prop": "id", "label": "id"},
                    {"prop": "image_url", "label": "缩略图"},
                    {"prop": "created_at", "label": "创建时间"}
                ],
                "tableData":[]
            },
            addEditFlag: true,
            AddEditForm: {
               f_img: ''
            },
            rulesAddEdit: {
                f_img: [
                    { required: true, message: '请上传图片' }
                ]
            }
		}
	},
    mounted () {
        this.getImgList(1);
    },
	methods: {
        openAddEditLayer () {
            this.addEditLayer = true
		},
        pageChange () {
            this.getImgList(this.currentPage)
        },
        deleteImg (id) {
            const obj  = this
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                obj.$store.dispatch('deleteRouter', {router_id: id}).then((result) => {
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
        addEditConfirm (formName) {
            let obj = this
            obj.$refs[formName].validate((valid) => {
                if (valid) {
                    let currentAction = obj.addEditFlag ? 'addImg' : 'editImg'
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
        },
		getImgList (page) {
            this.listParams.page = page
            const obj  = this
            obj.$store.dispatch('imgList', obj.listParams).then((result) => {
                if (result && result.result && result.result.length) {
                    obj.imgList.tableData = result.result
                    obj.totalItem = result.total || 0
                }
            })
		},
        getUploadData (val) {
            let data = val.result
            this.importForm.download_url_object = data.object
            this.$refs['importForm'].validate((valid) => {})
        },
        beforeAvatarUpload (file) {
            // const isRight = (file.type === 'application/zip' || file.type === 'application/rar');
            const isLt2M = file.size / 1024 / 1024 < 100;

//            if (!isRight) {
//                this.$message.error('上传只能是 zip|rar 格式!');
//            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 100MB!');
            }
            return isLt2M;
        },

	},
    ...mapActions([
        'imgList',
        'addImgs',
        'deleteImgs',
        'editImgs'
    ]),
    computed: {
        ...mapGetters({})
    }
}
</script>