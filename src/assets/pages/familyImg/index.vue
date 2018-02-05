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
							<i class="icon-rank"></i>
						</template>
					</el-table-column>
			</el-table>
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="10" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--添加修改-->
		<el-dialog :title="addEditFlag?'添加图片':'编辑图片'" :visible.sync="addEditLayer">
			<div class="edit_form">
				<el-form :model="AddEditForm" :rules="rulesAddEdit" ref="AddEditForm" label-width="100px" >
					<el-form-item label="上传图片">
						<el-upload
								ref="uploadFile"
								class="upload-demo"
								:action="corsUrls"
								:data="uploadObj"
								:before-upload="beforeAvatarUpload"
								:on-success="getUploadData"
								:limit="1"
								:file-list="fileListObj"
								:on-remove="handleRemoveImg"
						>
							<el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="图片预览" prop="image_url">
						<div class="img-con">
							<img v-if="AddEditForm.image_url" :src="AddEditForm.image_url" />
						</div>
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
               image_url: '',
			   id: '',
			   image_url_object: ''
            },
            rulesAddEdit: {
                image_url: [
                    { required: true, message: '请上传图片' }
                ]
            },
            sortArr: [],
            corsUrls: getCorsUrl() + '/oss_file_upload'
		}
	},
    components:{
        Sortable
    },
    mounted () {
        this.getImgList(1);

        let table = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        let obj = this
        Sortable.create(table, {
            onEnd({ newIndex, oldIndex }) {
//                const targetRow = self.imgList.tableData.splice(oldIndex, 1)[0]
//                self.imgList.tableData.splice(newIndex, 0, targetRow)
				let temp_new = obj.sortArr[newIndex]
                let temp_old = obj.sortArr[oldIndex]
				obj.sortArr[newIndex] = temp_old
                obj.sortArr[oldIndex] = temp_new
                obj.$store.dispatch('sortImgs', {id_list: obj.sortArr}).then((result) => {

                })
            }
        })
    },
	methods: {
        getdata () {
            console.log('移动中.....')
		},
        openAddEditLayer () {
            this.addEditFlag = true
            this.addEditLayer = true
            this.$nextTick(() => {
                this.$refs['uploadFile'].clearFiles()
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
                obj.$store.dispatch('deleteImgs', {id: dataObj.id}).then((result) => {
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
                    let currentAction = obj.addEditFlag ? 'addImgs' : 'editImgs'
                    let currentParam = JSON.parse(JSON.stringify(obj.AddEditForm))
                    delete currentParam.image_url
                    if (obj.addEditFlag) {
                        delete currentParam.id
                    }
                    obj.$store.dispatch(currentAction, currentParam).then((result) => {
                        if (!obj.addEditFlag) {
                            if (result && result.code === 200) {
                                Message({
                                    message:  '编辑成功',
                                    type: 'success'
                                })
                                obj.addEditLayer = false
                                obj.getImgList(obj.currentPage)
                            }
                        } else {
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
                    let currentArr = result.result
                    obj.imgList.tableData = currentArr
                    obj.totalItem = result.total || 0
                    obj.sortArr = []
                    currentArr.forEach((item) => {
                        obj.sortArr.push(item.id)
					})
                }
            })
		},
        getUploadData (val) {
            let data = val.result
            this.AddEditForm.image_url = data.download_url
			this.AddEditForm.image_url_object = data.object
            this.$refs['AddEditForm'].validate((valid) => {})
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
        handleRemoveImg(file, fileList) {
            let currentForm = this.AddEditForm
			for (let attr in currentForm) {
                if (attr !== 'id') {
                    currentForm[attr] = ''
				}
			}
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