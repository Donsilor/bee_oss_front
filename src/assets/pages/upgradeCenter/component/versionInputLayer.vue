<template>
	<el-form :model="importForm" ref="importForm" :rules="rulesImport" label-width="8em">
		<el-form-item label="版本title" prop="title">
			<el-input type="text" v-model="importForm.title" />
		</el-form-item>
		<!--<el-form-item label="版本类型" prop="type">-->
			<!--<el-row>-->
				<!--<el-col :span="8">-->
					<!--<el-select v-model="importForm.type" placeholder="终端" @change="typeChangeEvent">-->
						<!--<el-option-->
								<!--v-for="item in typeOptions"-->
								<!--:key="item.value"-->
								<!--:label="item.label"-->
								<!--:value="item.value">-->
						<!--</el-option>-->
					<!--</el-select>-->
				<!--</el-col>-->
				<!--<el-col :span="7" :offset="1" v-if="importForm.type === 1">-->
					<!--<el-select v-model="importForm.system" placeholder="操作系统">-->
						<!--<el-option-->
								<!--v-for="item in systemOptions"-->
								<!--:key="item.value"-->
								<!--:label="item.label"-->
								<!--:value="item.value">-->
						<!--</el-option>-->
					<!--</el-select>-->
				<!--</el-col>-->
			<!--</el-row>-->
		<!--</el-form-item>-->
		<el-form-item label="子设备" prop="product_id" v-if="inputType !== 1 && inputType !== 4">
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
		<el-form-item label="版本号" prop="version">
			<el-input type="text" v-model="importForm.version" />
		</el-form-item>
		<el-form-item label="概要描述" prop="description">
			<el-input type="text" v-model="importForm.description" />
		</el-form-item>
		<el-form-item label="详细事项" prop="note">
			<el-input type="text" v-model="importForm.note" />
		</el-form-item>
		<el-form-item label="发布时间" prop="release_tm">
			<el-date-picker
					v-model="importForm.release_tm"
					type="date"
					format="yyyy-MM-dd"
					placeholder="选择日期">
			</el-date-picker>
		</el-form-item>
		<el-form-item label="支持路由" prop="routersList" v-if="inputType === 1 || inputType === 4">
			<el-select style="width: 100%;" multiple v-model="importForm.routersList" placeholder="路由">
				<el-option
						v-for="item in router"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="支持子设备" prop="productsList" v-if="inputType === 2">
			<el-select style="width: 100%;" multiple v-model="importForm.productsList" placeholder="子设备">
				<el-option
						v-for="item in subset"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="支持路由" prop="productsList" v-if="inputType === 3 || inputType === 5">
			<el-select style="width: 100%;" multiple v-model="importForm.routersList" placeholder="路由">
				<el-option
						v-for="item in router"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="appstore链接" prop="download_url_object" v-if="inputType === 4">
			<el-input type="text" v-model="importForm.download_url_object" />
		</el-form-item>
		<el-form-item label="上传固件包" prop="download_url_object" v-if="inputType !== 4">
			<!--<el-input type="text" v-model="importForm.download_url_object" />-->
			<el-upload
					ref="uploadFile"
					class="upload-demo"
					action="/api/index.php/version/upload"
					:data="uploadObj"
					:before-upload="beforeAvatarUpload"
					:on-success="getUploadData"
					:on-preview="handlePreview"
					:limit="1"
					:on-remove="handleRemove"
					>
				<el-button size="small" type="primary">点击上传</el-button>
			</el-upload>
		</el-form-item>
		<el-form-item label="上传img图片" prop="img_url_object">
			<el-upload
					ref="uploadFileImg"
					class="upload-demo"
					action="/api/index.php/version/upload"
					:before-upload="beforeAvatarUploadImg"
					:on-success="getUploadDataImg"
					:data="uploadObj"
					:on-preview="handlePreviewImg"
					:limit="1"
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
export default {
    props: ['brandIDOptions','type','typeIDOptions','productIDOptions','appIos','router','inputType','product'],
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
            importForm: {
                title: '',
                version: '',
                release_tm: '',
                routersList: [],
                productsList: [],
                download_url_object: '',
                img_url_object: '',
                download_file_md5: '',
                file_size: '',
                force: 0,
                brand_id: '',
                type_id: '',
                product_id: '',
                description: '',
                note: ''
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
                product_id: [
                    { required: false, message: '请输入子设备' }
                ],
                release_tm: [
                    { required: true, message: '请选择发布时间' }
                ],
                routersList: [
                    { required: false, message: '请选择支持版本' }
                ],
                productsList: [
                    { required: false, message: '请选择支持版本' }
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
			}
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
        resetImportForm () {
            this.$refs['importForm'].resetFields()
			if (this.inputType !== 4) {
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
            this.$store.dispatch({
                type: namespace.GETSUBSET,
                product_id: val
            })
		},
        typeChangeEvent (val) {
            if (val === 1) {
                this.rulesImport.product_id = [
                    { required: false }
                ]
            } else {
                this.rulesImport.product_id = [
                    { required: true, message: '请选择产品类型' }
                ]
			}
        },
        importSubmitForm (formName) {
            const obj = this
            obj.$refs[formName].validate((valid) => {
                if (valid) {
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
            this.importForm.file_size = data.file_size
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
        ...mapGetters({
            subset: namespace.SUBSET
        })
    }
}
</script>
<style lang="less">
</style>