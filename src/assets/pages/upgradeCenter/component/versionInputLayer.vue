<template>
	<el-form :model="importForm" ref="importForm" :rules="rulesImport" label-width="8em">
		<el-form-item label="版本title" prop="title">
			<el-input type="text" v-model="importForm.title" />
		</el-form-item>
		<el-form-item label="是否限制规则"  v-if="!releasedFlag">
			<el-radio-group v-model="importForm.selectRule" @change="ruleChange">
				<el-radio :label="1">是</el-radio>
				<el-radio :label="0">否</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="子设备" prop="product_id" v-if="inputType !== 1  && inputType !== 4 && !releasedFlag">
			<el-row>
				<el-col :span="8">
					<el-select v-model="importForm.brand_id" placeholder="品牌">
						<el-option
								v-for="item in brandIDOptionsChild"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7" :offset="1">
					<el-select v-model="importForm.type_id" placeholder="类型">
						<el-option
								v-for="item in typeIDOptionsChild"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="7" :offset="1">
					<el-select v-model="importForm.product_id" @change="productChange" placeholder="产品">
						<el-option
								v-for="item in productIDOptionsChild"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item label="支持版本" prop="productsList" v-if="(inputType === 2  || inputType === 5) && !releasedFlag && importForm.selectRule">
			<el-select style="width: 100%;" multiple v-model="importForm.productsList" placeholder="子设备">
				<el-option
						v-for="item in subsetProduct"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="支持路由" prop="routersList" v-if="inputType !== 2 && inputType !== 5 && !releasedFlag && importForm.selectRule">
			<el-select style="width: 100%;" multiple v-model="importForm.routersList" placeholder="路由">
				<el-option
						v-for="item in router"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="版本号" prop="version" v-if="!releasedFlag">
			<el-input type="text" v-model="importForm.version" />
		</el-form-item>
		<el-form-item label="概要描述" prop="description">
			<el-input type="text" v-model="importForm.description" />
		</el-form-item>
		<el-form-item label="详细事项" prop="note">
			<el-input type="text" v-model="importForm.note" />
		</el-form-item>
		<el-form-item label="备注" prop="extra_note">
			<el-input type="text" v-model="importForm.extra_note" />
		</el-form-item>
		<el-form-item label="发布时间" prop="release_time" v-if="!releasedFlag">
			<el-date-picker
					v-model="importForm.release_time"
					type="date"
					format="yyyy-MM-dd"
					placeholder="选择日期">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="appstore链接" prop="download_url_object" v-if="inputType === 4 && !releasedFlag">
			<el-input type="text" v-model="importForm.download_url_object" />
		</el-form-item>
		<el-form-item label="上传固件包" prop="download_url_object" v-if="inputType !== 4 && !releasedFlag">
			<!--<el-input type="text" v-model="importForm.download_url_object" />-->
			<el-upload
					ref="uploadFile"
					class="upload-demo"
					:action="corsUrls"
					:data="uploadObj"
					:before-upload="beforeAvatarUpload"
					:on-success="getUploadData"
					:on-preview="handlePreview"
					:limit="1"
					:file-list="fileListObj"
					:on-remove="handleRemove"
					>
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</el-form-item>
		<el-form-item label="上传img图片" prop="img_url_object">
			<el-upload
					ref="uploadFileImg"
					class="upload-demo"
					:action="corsUrls"
					:before-upload="beforeAvatarUploadImg"
					:on-success="getUploadDataImg"
					:data="uploadObj"
					:on-preview="handlePreviewImg"
					:limit="1"
					:file-list="fileListImg"
					:on-remove="handleRemoveImg"
					>
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</el-form-item>
		<el-form-item label="是否强制升级" prop="force">
			<el-select style="width: 100%;" v-model="importForm.force" placeholder="请选择">
				<el-option label="否" :value="0"></el-option>
				<el-option label="是" :value="1"></el-option>
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
import getCorsUrl from '../../../lib/corsconfig'
export default {
    props: ['brandIDOptions','type','typeIDOptions','productIDOptions','appIos',
		'router','inputType','product','addEditFlag','editDataObj', 'releasedFlag', 'deviceProductId'],
	data () {
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
                method: '',
                title: '',
                version: '',
                release_time: '',
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
                selectRule: 1
            },
            rulesImport: {
				version: [
                    { required: true, message: '请输入版本号' }
                ],
                title: [
                    { required: true, message: '请输入版本标题' }
                ],
                description: [
                    { required: true, message: '请输入概要描述' }
                ],
                note: [
                    { required: true, message: '请输入详细事项' }
                ],
                extra_note: [
                    { required: false, message: '请输入详细事项' }
                ],
                product_id: [
                    { required: false, message: '请输入子设备' }
                ],
                release_time: [
                    { required: true, message: '请选择发布时间' }
                ],
                routersList: [
                    { required: true, message: '请选择支持版本' }
                ],
                productsList: [
                    { required: true, message: '请选择支持版本' }
                ],
                download_url_object: [
                    { required: true, message: '请上传固件包' }
                ],
                img_url_object: [
                    { required: true, message: '请上传img图片' }
                ],
                force: [
                    { required: true, message: '请选择是否强制升级' }
                ]
			},
            subsetProduct: [],
			corsUrls: getCorsUrl() + '/oss_file_upload'
		}
	},
	watch: {
        'importForm.brand_id' (curVal, oldVal) {
            this.importForm.type_id = '';
            this.importForm.product_id = '';
            this.typeIDOptionsChild = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
                return {
                    label: x.type_name,
                    value: x.type_id
                }
            });
        },
        'importForm.type_id' (curVal, oldVal) {
            this.importForm.product_id = '';
            const brandKey = this.importForm.brand_id*1;
            const typeKey = curVal*1;
            this.productIDOptionsChild = this.product.filter(x => x.brand_id === brandKey && x.type_id === typeKey).map(x => {
                return {
                    label: x.product_id,
                    value: x.product_id
                }
            })
        }
	},
	mounted () {
	},
	methods: {
        ruleChange (val) {
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
        renderEditData () {
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
            }
            let thisForm = this.importForm
            for (let attr in attrObj) {
                thisForm[attr] = this.editDataObj[attr]
            }
            thisForm['release_time'] = new Date(this.editDataObj['release_time']*1000)
            let imgName = this.editDataObj['img_url_object']
            this.fileListImg = [{name: imgName, url: imgName}]
            if (this.inputType !== 4) {
                let objName = this.editDataObj['download_url_object']
                this.fileListObj = [{name: objName, url: objName}]
			}

			if (this.inputType === 2 || this.inputType === 5) {
                let currentProducts = this.editDataObj['products']
                if (currentProducts.length ===1 && currentProducts[0].version === '*') {
                    thisForm['selectRule'] = 0
				} else {
                    currentProducts.forEach((item) => {
                        thisForm['productsList'].push(item.version + '--' + item.product_id)
					})
				}
			} else {
                let currentRouters = this.editDataObj['routers']
				if (currentRouters.length === 1 && currentRouters[0] === '*') {
                    thisForm['selectRule'] = 0
				} else {
                    thisForm['routersList'] = currentRouters
				}
			}

		},
        resetImportForm () {
            if (this.inputType === 3) {
                this.rulesImport.product_id = [
                    { required: true, message: '请输入子设备' }
                ]
			} else {
                this.rulesImport.product_id = [
                    { required: false, message: '请输入子设备' }
                ]
			}
            this.$refs['importForm'].resetFields()
			if (this.inputType !== 4 && !this.releasedFlag) {
                this.$refs['uploadFile'].clearFiles()
			}
            this.$refs['uploadFileImg'].clearFiles()
            let form = this.importForm
			for (let attr in form) {
                switch (attr){
                    case 'routersList':
                    case 'productsList':
                        form[attr] = []
                        break
                    case 'force':
                        form[attr] = 0
                        break
                    case 'selectRule':
                        form[attr] = 1
                        break
                    case 'product_id':
                        if (this.inputType === 3) {
                            form[attr] = this.deviceProductId
						} else {
                            form[attr] = ''
						}
                        break
                    default:
                        form[attr] = ''
                        break
				}
			}
		},
        closeParentFlow () {
            this.$emit('closeImportBox')
		},
		productChange (val) {
			let obj = this
			if (this.inputType === 3) {
			    return
			}
            obj.$store.dispatch('pubilcCorsAction',{
                method: 'released_versions',
                type: 3,
                product_id: val
            }).then((res) => {
                if (res.code === 0) {
                    let list = res.result;
                    if (list && list.length) {
                        obj.currentProductId = val
                        obj.subsetProduct = list.map(x => {
                            return {
                                label: x.title,
								product_id: x.product_id,
                                value: `${x.version}--${x.product_id}`
                            }
                        })
                    } else {
                        obj.subsetProduct = [];
                    }
                }
			})
		},
        typeChangeEvent (val) {
//            if (val === 1) {
//                this.rulesImport.product_id = [
//                    { required: false }
//                ]
//            } else {
//                this.rulesImport.product_id = [
//                    { required: true, message: '请选择产品类型' }
//                ]
//			}
        },
        importSubmitForm (formName) {
            const obj = this
            obj.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!obj.importForm['selectRule']) {
                        obj.importForm['routersList'] = ['*']
                        obj.importForm['productsList'] = [{product_id: "", version: "*"}]
					}
                    obj.$emit('importSubmitParent',obj.importForm)
                } else {
                    return false
                }
            })
		},
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleRemoveImg(file, fileList) {
            console.log(file, fileList);
        },
        handlePreviewImg(file) {
            console.log(file);
        },
        getUploadData (val) {
		    let data = val.result
		    this.importForm.download_url_object = data.object
            this.importForm.download_file_md5 = data.md5
            this.importForm.size = data.file_size
            this.$refs['importForm'].validate((valid) => {})
		},
        getUploadDataImg (val) {
            let data = val.result
            this.importForm.img_url_object = data.object
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
        beforeAvatarUploadImg (file) {
//            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 100;

//            if (!isJPG) {
//                this.$message.error('上传头像图片只能是 JPG|PNG 格式!');
//            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 100MB!');
            }
            return isLt2M;
		}
	},
    computed: {
    }
}
</script>
<style lang="less">
</style>