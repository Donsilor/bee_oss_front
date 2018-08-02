<template>
    <div class="page-content config-page">
        <!--顶部tab-->
        <div style="position: relative">
           <!--  <el-row :gutter="24">
                <el-col :span="2" style="padding-right: 0; ">
                    <el-button type="primary" @click="openAddEditLayer()">添加文案配置</el-button>
                </el-col>
            </el-row> -->
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <el-input class="searchInput" v-model="F_key" :maxlength="12" type="text" placeholder="输入键值查询" />
                    <el-select  v-model="F_module_name" placeholder="模块名称" >
                        
                        <el-option v-for="module in moduleList"  :label="module" :value="module">
                        </el-option>
                    
                    </el-select>
                    <el-button type="primary" @click="search">&nbsp;&nbsp;查询&nbsp;&nbsp;</el-button>
                </el-col>

                <el-col :span="7" style="padding-right: 0; ">
                    <el-button type="primary" @click="openAddEditLayer()">添加文案配置</el-button>
                </el-col>

                <el-col :span="2" style="padding-right: 0; ">
                   <el-upload
                      class="upload-demo"
                      ref="upload"
                      :on-success="getUploadData"
                      :show-file-list="true"
                      :limit="1"
                      :action="transUrl">
                      <el-button type="primary" plain>批量导入</el-button> 
                    </el-upload>
                </el-col>

                <el-col :span="2" style="padding-right: 0; ">
                   <a href="javascript:;"  :href="output" download=""><el-button type="primary" plain >批量导出</el-button></a>
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
        <el-dialog :title="addEditFlag?'添加文案配置':'编辑文案配置'" :visible.sync="addEditLayer">
            <div class="edit_form">
                <el-form :model="AddEditForm" :rules="rulesAddEdit" ref="AddEditForm" label-width="100px" >
                    
                <el-form-item label="模块名称">
                    <el-select v-model="AddEditForm.F_module_name" placeholder="模块名称" >
                        
                        <el-option v-for="module in moduleList"  :label="module" :value="module">
                        </el-option>
                    
                    </el-select>
                </el-form-item>

                 <el-form-item label="键">
                    <el-input v-model="AddEditForm.F_key"></el-input>
                </el-form-item>
                 <el-form-item label="值">
                    <el-input v-model="AddEditForm.F_value"></el-input>
                </el-form-item>
            
                    
                </el-form>
            </div>
            <div style="text-align: right; margin: 0">
                <el-button type="primary"  @click="addEditConfirm('AddEditForm')" >确定</el-button>
                <el-button  @click="addEditLayer=false" >取消</el-button>
            </div>
        </el-dialog>
        <!--上传列表显示-->
        <el-dialog
          title="导入记录"
          :visible.sync="inputModel"
          :lock-scroll='false'
          width="30%"
          :before-close="handleClose">
             <div v-for="info in uploadData" class="text item" >

               <span style="color:red" v-if="info.result!=1"> {{ info.msg }}</span>
               <span  v-if="info.result==1"> {{ info.msg }}</span>
              </div>
            <!-- <el-button @click="inputModel = false">取 消</el-button> -->
           <!--  <el-button type="primary" @click="inputModel = false" >确 定</el-button> -->
          </span>
        </el-dialog>
    </div>
</template>
<script>
import * as namespace from '../store/namespace'
import { mapGetters, mapActions } from 'vuex'
import '../lib/util.js'
import { Message } from 'element-ui'
import Sortable  from 'sortablejs'
import { CMDATA_API } from '~/assets/lib/api';
import getCorsUrl from '../lib/corsconfig'
import API from '../service/index.js'

export default {
    data () {
        return {
            addEditLayer: false,
            uploadData:[],
            inputModel: false,
            transUrl: CMDATA_API.input + '?token=' + JSON.parse(localStorage.getItem('localData')).user.info.token ,
            totalItem: 0,
            uploadObj: {
                token: JSON.parse(localStorage.getItem('localData')).user.info.token
            },
            currentPage: 1,
            moduleList:[],
            listParams: {
                page: 1
            },
            imgList: {
                "tableColumn":[
                    {"prop": "F_id", "label": "id"},
                    {"prop": "F_module_name", "label": "模块名称"},
                    {"prop": "F_key", "label": "键"},
                    {"prop": "F_value", "label": "值"},
                    {"prop": "F_create_time", "label": "创建时间"}
                ],
                "tableData":[]
            },
            addEditFlag: true,
            AddEditForm: {
               F_id: '',
               F_module_name: '',
               F_key: '',
               F_value: ''
            },
            F_module_name: '',
            F_key: '',
            rulesAddEdit: {
            },
            sortArr: [],
            output:CMDATA_API.output + '?token=' + JSON.parse(localStorage.getItem('localData')).user.info.token ,
            down_ulr: ''
        }
    },
    mounted () {
        this.getImgList(1);
        this.getModuleList(); 
        let table = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        let obj = this
    },
    watch: {
        F_key () {
            this.output = CMDATA_API.output + '?token=' + JSON.parse(localStorage.getItem('localData')).user.info.token + '&F_key=' + this.F_key + '&F_module_name=' + this.F_module_name
            },
        F_module_name(){
            this.output = CMDATA_API.output + '?token=' + JSON.parse(localStorage.getItem('localData')).user.info.token +'&F_key=' + this.F_key + '&F_module_name=' + this.F_module_name
            }
    },
    methods: {
        search () {
            if (!this.F_key) {
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
                API.CmDataDel({F_id: dataObj.F_id}).then((result) => {
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
                    API.CmDataEdit(currentParam).then((result) => {
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
                    API.CmDataAdd(currentParam).then((result) => {
                   
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
            this.listParams.F_key = this.F_key
            this.listParams.F_module_name = this.F_module_name
            const obj  = this
            API.CmDataList(obj.listParams).then((result) => {
                if (result && result.result && result.result.data.length) {
                    let currentArr = result.result.data
                    obj.imgList.tableData = currentArr
                    obj.totalItem = result.result.total || 0
                    obj.sortArr = []
                    currentArr.forEach((item) => {
                        obj.sortArr.push(item.id)
                    })
                }else{
                    obj.imgList.tableData = []
                }
            })
        },
        getModuleList (page) {
            const obj  = this
            let params = {}
            params.config_key = "cm_data_module_name"
            params.only_val = 1
            API.ModuleList(params).then((result) => {
                obj.moduleList = result.result
                console.log(obj.moduleList)
            })
        },
        getUploadData (data) {
            console.log(data)
            const obj  = this
            if (data.code != 200) {
                obj.$message.error(data.msg)
                obj.$refs.upload.clearFiles()
            }else{
                this.uploadData = data.result.info
                this.inputModel = true
            }
            
            
        },
        handleClose () {
            this.inputModel = false
            this.getImgList()
            this.$refs.upload.clearFiles()

        }

       

    },
    // ...mapActions([
    //     'CmDataList',
    // ]),
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
        background-image: url("../../assets/images/icon-rank.png");
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