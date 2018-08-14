<template>
    <el-form :model="importForm" ref="importForm" :rules="rulesImport" label-width="8em">
        <el-form-item label="版本title" prop="title">
            <el-input type="text" v-model="importForm.title" />
        </el-form-item>
        <el-form-item label="路由器pid" prop="router_pid" v-if="inputType === 2 && addEditFlag">
            <el-input type="text" v-model="importForm.router_pid" />
        </el-form-item>
        <el-form-item label="product_id" prop="product_id" v-if="(inputType === 3 || inputType === 8 || inputType === 5)  && addEditFlag">
            <el-input type="text" v-model="importForm.product_id" />
        </el-form-item>
        <el-form-item label="os_type" prop="os_type" v-if="inputType === 5">
            <el-select v-model="importForm.os_type" placeholder="os_type">
                <el-option v-for="item in os_type_list" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否限制规则" v-if="!releasedFlag">
            <el-radio-group v-model="importForm.selectRule" @change="ruleChange">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="路由pid" v-if="inputType !== 2  && !releasedFlag && importForm.selectRule">
            <el-select style="width: 100%;" v-model="importForm.router_pid" placeholder="路由pid" @change="routerPidChange">
                <el-option v-for="item in routerPidList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="子设备" v-if="inputType === 2 && !releasedFlag && importForm.selectRule">
            <el-row>
                <el-col :span="8">
                    <el-select v-model="importForm.brand_id" placeholder="品牌">
                        <el-option v-for="item in brandIDOptionsChild" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7" :offset="1">
                    <el-select v-model="importForm.type_id" placeholder="类型">
                        <el-option v-for="item in typeIDOptionsChild" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7" :offset="1">
                    <el-select v-model="product_id" @change="productChange" placeholder="产品">
                        <el-option v-for="item in productIDOptionsChild" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="支持版本" prop="productsList" v-if="inputType === 2  && !releasedFlag && importForm.selectRule">
            <el-select style="width: 100%;" multiple v-model="importForm.productsList" placeholder="子设备">
                <el-option v-for="item in subsetProduct" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="支持路由" prop="routersList" v-if="inputType !== 2  && !releasedFlag && importForm.selectRule">
            <el-select style="width: 100%;" multiple v-model="importForm.routersList" placeholder="路由">
                <el-option v-for="item in router" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="version" v-if="!releasedFlag">
            <el-input type="text" v-model="importForm.version" />
        </el-form-item>
        <el-form-item label="概要描述" prop="note">
            <el-input type="text" v-model="importForm.note" />
        </el-form-item>
        <el-form-item label="详细事项" prop="description">
            <el-input type="text" v-model="importForm.description" />
        </el-form-item>
        <el-form-item label="备注" prop="extra_note">
            <el-input type="text" v-model="importForm.extra_note" />
        </el-form-item>
        <el-form-item label="appstore链接" prop="download_url_object" v-if="os_type === 'ios' && !releasedFlag">
            <el-input type="text" v-model="importForm.download_url_object" />
        </el-form-item>
        <el-form-item label="上传固件包" prop="download_url_object" v-if="os_type !== 'ios' && !releasedFlag" class="is-required">
            <!--<el-input type="text" v-model="importForm.download_url_object" />-->
            <!-- <el-upload ref="uploadFile" class="upload-demo" :action="corsUrls" :data="uploadObj" :before-upload="beforeAvatarUpload" :on-success="getUploadData" :on-preview="handlePreview" :limit="1" :file-list="fileListObj" :on-remove="handleRemove">
                <el-button size="small" type="primary">点击上传</el-button>
             </el-upload> -->
            <upload-file ref="uploadFile" class="newButtonStyle" @uploadSuccess ="getSuccessNews"></upload-file>
            <!-- <span style="color:red" v-show="!download_url_object">请先上传文件</span> -->//TODO
        </el-form-item>
        <el-form-item label="上传img图片" prop="img_url_object">
            <el-upload ref="uploadFileImg" class="upload-demo" :action="corsUrls" :before-upload="beforeAvatarUploadImg" :on-success="getUploadDataImg" :data="uploadObj" :on-preview="handlePreviewImg" :limit="1" :file-list="fileListImg" :on-remove="handleRemoveImg">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="是否强制升级" prop="force">
            <el-select style="width: 100%;" v-model="importForm.force" placeholder="请选择">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
                <el-option label="不弹窗升级" :value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="importSubmitForm('importForm')">确定</el-button>
            <el-button @click="closeParentFlow">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import * as namespace from '../../../store/namespace';
import { mapGetters, mapActions } from 'vuex';
import getCorsUrl from '../../../lib/corsconfig';
import API from '../../../service/index'
import uploadFile from '../../uploadFile.vue';
export default {
    components: {
        uploadFile,
    },
    props: [
        'brandIDOptions',
        'type',
        'typeIDOptions',
        'productIDOptions',
        'routerPidList',
        'inputType',
        'product',
        'addEditFlag',
        'editDataObj',
        'releasedFlag',
        'os_type',
        'activeName'
    ],
    data() {
        return {
            brandIDOptionsChild: this.brandIDOptions,
            typeIDOptionsChild: this.typeIDOptions,
            productIDOptionsChild: this.productIDOptions,
            typeOptions: [
                {
                    value: 1,
                    label: 'APP'
                },
                {
                    value: 2,
                    label: '路由器'
                },
                {
                    value: 3,
                    label: '子设备'
                }
            ],
            systemOptions: [
                {
                    value: 'IOS',
                    label: 'IOS'
                },
                {
                    value: 'Android',
                    label: 'Android'
                }
            ],
            uploadObj: {
                token: JSON.parse(localStorage.getItem('localData')).user.info.token
            },
            fileListObj: [],
            fileListImg: [],
            importForm: {
                router_pid: '',
                method: '',
                title: '',
                version: '',
                //release_time: '',
                routersList: [],
                productsList: [],
                download_url_object: '',
                img_url_object: '',
                download_file_md5: '',
                size: '',
                force: 0,
                brand_id: '',
                type_id: '',
                product_id: '',
                description: '',
                note: '',
                extra_note: '',
                selectRule: 1,
                os_type: ''
            },
            rulesImport: {
                router_pid: [{ required: true, message: '请输入路由器pid' }],
                os_type: [{ required: true, message: '请选择os_type' }],
                version: [{ required: true, message: '请输入版本号' }],
                title: [{ required: true, message: '请输入版本标题' }],
                description: [{ required: true, message: '请输入概要描述' }],
                note: [{ required: true, message: '请输入详细事项' }],
                extra_note: [{ required: false, message: '请输入详细事项' }],
                product_id: [{ required: true, message: '请输入子设备' }],
                routersList: [{ required: true, message: '请选择支持版本' }],
                productsList: [{ required: true, message: '请选择支持版本' }],
                // download_url_object: [{ required: true, message: '请上传固件包' }],
                img_url_object: [{ required: true, message: '请上传img图片' }],
                force: [{ required: true, message: '请选择是否强制升级' }]
            },
            subsetProduct: [],
            router: [],
            router_pid: '',
            corsUrls: getCorsUrl() + '/oss_file_upload',
            editData: {
                user_id: '',
                status: '',
                id: ''
            },
            product_id: '',
            os_type_list: [
                {
                    label: 'android_app',
                    value: 'android_app'
                },
                {
                    label: 'ios_app',
                    value: 'ios_app'
                },
                {
                    label: 'android_pad',
                    value: 'android_pad'
                }
            ],
            os_type_text: {
                1: 'android_app',
                4: 'ios_app',
                6: 'android_pad'
            }
        };
    },
    watch: {
        'importForm.brand_id'(curVal, oldVal) {
            this.importForm.type_id = '';
            this.importForm.product_id = '';
            this.typeIDOptionsChild = this.type.filter(x => x.brand_ids.indexOf(curVal * 1) >= 0).map(x => {
                return {
                    label: x.type_name,
                    value: x.type_id
                };
            });
        },
        'importForm.type_id'(curVal, oldVal) {
            this.importForm.product_id = '';
            const brandKey = this.importForm.brand_id * 1;
            const typeKey = curVal * 1;
            this.productIDOptionsChild = this.product.filter(x => x.brand_id === brandKey && x.type_id === typeKey).map(x => {
                return {
                    label: x.product_id,
                    value: x.product_id
                };
            });
        }
    },
    mounted() {},
    methods: {
        getSuccessNews:function(val){
            console.log(99999999999,val)
            if(val){
                // this.importForm.download_url_object = val;
                this.importForm.download_url_object = val.download_url_object;
                this.importForm.download_file_md5 = val.download_file_md5;
                this.importForm.size = val.size;
                this.$refs['importForm'].validate(valid => {});
                console.log(this.$refs['importForm'].validate())
            }
        },
        ruleChange(val) {
            //            if (val) {
            //                this.rulesImport.productsList =  [
            //                    { required: true, message: '请选择支持版本' }
            //                ]
            //                this.rulesImport.routersList =  [
            //                    { required: true, message: '请选择支持版本' }
            //                ]
            //			} else {
            //                this.rulesImport.productsList =  [
            //                    { required: false }
            //                ]
            //                this.rulesImport.routersList =  [
            //                    { required: false }
            //                ]
            //			}
        },
        renderEditData() {
            let attrObj = {
                title: '',
                download_file_md5: '',
                force: '',
                version: '',
                description: '',
                img_url_object: '',
                note: '',
                extra_note: '',
                size: '',
                download_url_object: ''
            };
            if (this.inputType === 2) {
                attrObj['router_pid'] = '';
            }
            if (this.inputType === 3 || this.inputType === 8 || this.inputType === 5) {
                attrObj['product_id'] = '';
            }
            if (this.inputType === 5) {
                attrObj['os_type'] = this.os_type_text[this.editDataObj['os_type']];
            }
            let thisForm = this.importForm;
            for (let attr in attrObj) {
                let value = this.editDataObj[attr];
                thisForm[attr] = value || value === 0 ? value : '';
            }
            // thisForm['release_time'] = new Date(this.editDataObj['release_time']*1000)
            let imgName = this.editDataObj['img_url_object'];
            this.fileListImg = [{ name: imgName, url: imgName }];
            if (this.os_type !== 'ios') {
                let objName = this.editDataObj['download_url_object'];
                this.fileListObj = [{ name: objName, url: objName }];
            }
            if (this.inputType === 2) {
                let currentProducts = this.editDataObj['rules'];
                if (currentProducts.length === 1 && currentProducts[0].rule === '*') {
                    thisForm['selectRule'] = 0;
                } else {
                    currentProducts.forEach(item => {
                        thisForm['productsList'].push(item.product_id + '--' + item.rule);
                    });
                }
            } else {
                let currentRouters = this.editDataObj['rules'];
                if (currentRouters.length === 1 && currentRouters[0].rule === '*') {
                    thisForm['selectRule'] = 0;
                } else {
                    currentRouters.forEach(item => {
                        thisForm['routersList'].push(item.router_pid + '--' + item.rule);
                    });
                }
            }

            // 由于接口设计，要求编辑的时候带上详情的几个字段
            for (let attr in this.editData) {
                this.editData[attr] = this.editDataObj[attr];
            }
        },
        resetImportForm() {
            if (this.inputType === 3 || this.inputType === 8 || this.inputType === 5) {
                // 此处尚未找到具体原因，暂时先这样修复
                this.$refs['importForm'].fields.forEach((field, index) => {
                    if (field.prop === undefined) {
                        this.$refs['importForm'].fields.splice(index, 1);
                    }
                });
                this.rulesImport['product_id'] = [{ required: true, message: '请输入子设备' }];
            }
            this.$refs['importForm'].resetFields();
            if (this.os_type !== 'ios' && !this.releasedFlag) {
                // this.$refs['uploadFile'].clearFiles();//TODO
            }
            this.$refs['uploadFileImg'].clearFiles();
            let form = this.importForm;
            for (let attr in form) {
                switch (attr) {
                    case 'routersList':
                    case 'productsList':
                        form[attr] = [];
                        break;
                    case 'force':
                        form[attr] = 0;
                        break;
                    case 'selectRule':
                        form[attr] = 1;
                        break;
                    default:
                        form[attr] = '';
                        break;
                }
            }
        },
        closeParentFlow() {
            this.$emit('closeImportBox');
        },
        productChange(val) {
            let obj = this;
            if (this.inputType === 3 || this.inputType === 8) {
                return;
            }
            API.pubilcCorsAction({
                    method: 'released_versions',
                    type: 3,
                    product_id: val
                })
                .then(res => {
                    if (res.code === 0) {
                        let list = res.result;
                        if (list && list.length) {
                            obj.currentProductId = val;
                            obj.subsetProduct = list.map(x => {
                                return {
                                    label: x.version,
                                    product_id: x.product_id,
                                    value: `${x.product_id}--${x.version}`
                                };
                            });
                        } else {
                            obj.subsetProduct = [];
                        }
                    }
                });
        },
        //录入
        importSubmitForm(formName) {
            console.log("formName",formName)
            console.log(this.$refs[formName])
            if(!this.importForm.download_url_object){
                
            }
            const obj = this;
            obj.$refs[formName].validate(valid => {
                console.log("valid",valid)
                if (valid) {
                    if (!obj.importForm['selectRule']) {
                        obj.importForm['routersList'] = [{ router_pid: '*', rule: '*' }];
                        obj.importForm['productsList'] = [{ product_id: '*', rule: '*' }];
                    }
                    let params = Object.assign(
                        {
                            // token: this.token
                        },
                        obj.importForm
                    );
                    console.log("params11111111111111",params)
                    let currentType = obj.inputType;
                    // params.release_time = params.release_time && params.release_time.Format('yyyy-MM-dd hh:mm:ss')
                    delete params.brand_id;
                    delete params.type_id;

                    let attrName = currentType === 2 ? 'product_id' : 'router_pid';
                    let ruleName = currentType === 2 ? 'productsList' : 'routersList';
                    if (params.selectRule) {
                        params.rules = params[ruleName].map(item => {
                            let arr = item.split('--');
                            return {
                                [attrName]: arr[0],
                                rule: arr[1]
                            };
                        });
                    } else {
                        params.rules = params[ruleName];
                    }
                    if (currentType !== 5) {
                        delete params.os_type;
                    }
                    switch (currentType) {
                        case 1:
                            params.os_type = this.os_type;
                            params.method = this.addEditFlag ? 'create_app_version' : 'update_app_version';
                            break;
                        case 2:
                            params.method = this.addEditFlag ? 'create_router_version' : 'update_router_version';
                            break;
                        case 3:
                            params.method = this.addEditFlag ? 'create_device_version' : 'update_device_version';
                            break;
                        case 5:
                            params.method = this.addEditFlag ? 'create_h5_version' : 'update_h5_version';
                            break;
                        case 7:
                            params.method = this.addEditFlag ? 'create_android_system_version' : 'update_android_system_version';
                            break;
                        case 8:
                            params.method = this.addEditFlag
                                ? 'create_device_android_system_version'
                                : 'update_device_android_system_version';
                            break;
                        default:
                            break;
                    }

                    if (currentType !== 3 && currentType !== 8 && currentType !== 5) {
                        delete params.product_id;
                    }
                    if (currentType !== 2) {
                        delete params.router_pid;
                    }
                    delete params.productsList;
                    delete params.routersList;
                    delete params.selectRule;

                    if (!this.addEditFlag) {
                        for (let attr in this.editData) {
                            params[attr] = this.editData[attr];
                        }
                    }
                    if (this.inputType === 1 && this.os_type === 'ios') {
                        params.size = 0;
                        params.download_file_md5 = 'default';
                    }
                    //处理问价上传
                    console.log("this.importForm.download_url_object",this.importForm.download_url_object)
                    // if(this.importForm.download_url_object.length!==0){
                    //     console.log(666,params)
                    //     params = Object.assign(
                    //         {
                    //             'download_url_object':this.importForm.download_url_object
                    //         },
                    //         params
                    //     );
                    // }
                    // console.log("params2222222",params)
                    obj.$emit('importSubmitParent', params);
                } else {
                    return false;
                }
            });
            console.log("submit",this.$refs.uploadFile)
        },
        routerPidChange(val) {
            if (!val) {
                return;
            }
            let param = {
                method: 'released_versions',
                router_pid: val,
                type: 2
            };
            const obj = this;
            API.getChoseList(param).then(result => {
                if (result.code === 0) {
                    obj.router = result.result.map(x => {
                        return {
                            label: x.title,
                            value: `${x.router_pid}--${x.version}`,
                            product_id: x.product_id
                        };
                    });
                }
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {},
        handleRemoveImg(file, fileList) {},
        handlePreviewImg(file) {},
        // getUploadData(val) {
        //     let data = val.result;
        //     this.importForm.download_url_object = data.object;
        //     this.importForm.download_file_md5 = data.md5;
        //     this.importForm.size = data.file_size;
        //     this.$refs['importForm'].validate(valid => {});
        // },
        getUploadDataImg(val) {
            let data = val.result;
            this.importForm.img_url_object = data.object;
            this.$refs['importForm'].validate(valid => {});
        },
        beforeAvatarUpload(file) {
            // const isRight = (file.type === 'application/zip' || file.type === 'application/rar');
            //const isLt2M = file.size / 1024 / 1024 < 100;
            //            if (!isRight) {
            //                this.$message.error('上传只能是 zip|rar 格式!');
            //            }
            //            if (!isLt2M) {
            //                this.$message.error('上传文件大小不能超过 100MB!');
            //            }
            //            return isLt2M;
        },
        beforeAvatarUploadImg(file) {
            //            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            //const isLt2M = file.size / 1024 / 1024 < 100;
            //            if (!isJPG) {
            //                this.$message.error('上传头像图片只能是 JPG|PNG 格式!');
            //            }
            //            if (!isLt2M) {
            //                this.$message.error('上传头像图片大小不能超过 100MB!');
            //            }
            //            return isLt2M;
        }
    },
    computed: {}
};
</script>
<style lang="less">
.newButtonStyle{
    border:1px solid red;
}
</style>