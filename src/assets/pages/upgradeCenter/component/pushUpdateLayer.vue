<template>
	<el-form :model="pushForm" ref="pushForm" :rules="rules"  label-width="8em">
		<el-row>
			<el-col :span="12" style="padding-right: 27px">
				<el-form-item label="推送类型" prop="push_type">
					<el-select v-model="pushForm.push_type"  placeholder="选择类型" @change="pushTypeChangeEvent">
						<el-option label="全量升级" :value="0"></el-option>
						<el-option label="灰度升级" :value="1"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="7" :offset="1"  v-if="pushForm.push_type===1" style="margin-left: -15px">
				<el-form-item label="" prop="is_black" label-width="0">
					<el-select v-model="pushForm.is_black"  placeholder="请选择">
						<el-option label="白名单" :value="0"></el-option>
						<el-option label="黑名单" :value="1"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row v-if="pushForm.push_type">
			<el-form-item label="推送客户端" prop="push_type">
				<el-radio-group v-model="pushForm.terminal_type">
					<el-radio :label="1">输入uuid</el-radio>
					<el-radio :label="0">上传csv压缩包</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-row>
		<el-form-item label="uuid_list" prop="uuid_list" v-if="pushForm.terminal_type && pushForm.push_type">
			<el-row :gutter="24">
				<el-col :span="17" style="padding-left:0">
					<el-input  v-model="pushForm.uuid_list"></el-input>
				</el-col>
			</el-row>
			<el-row>
				<span style="font-size: 12px; color: #999">可输入多个uuid，用逗号隔开</span>
			</el-row>
		</el-form-item>
		<el-form-item label="uuid_csv" prop="uuid_csv" v-if="!pushForm.terminal_type && pushForm.push_type">
			<el-row :gutter="24">
				<el-col :span="17" style="padding-left:0">
					<el-upload
							ref="uploadFile"
							class="upload-demo"
							:action="corsUrls"
							:data="uploadObj"
							:before-upload="beforeAvatarUpload"
							:on-success="getUploadData"
							:limit="1"
					>
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary"@click="pushUpdateForm('pushForm')">确定</el-button>
			<el-button @click="closeParentFlow">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import * as namespace from '../../../store/namespace';
import getCorsUrl from '../../../lib/corsconfig'
export default {
    props: ['type','inputType','pushDataObj'],
	data () {
		return {
            uploadObj: {
                token: JSON.parse(localStorage.getItem('localData')).user.info.token
            },
            pushForm: {
                method: 'push_version',
                push_type: 0,
				type: '',
                is_black: '',
                product_id: '',
                uuid_list: '',
                uuid_csv: '',
                terminal_type: 1
            },
            rules: {
                is_black: [
                    { required: false, message: '请选择类型' }
                ],
                product_id: [
                    { required: false, message: '请选择产品类型' }
                ],
                uuid_csv: [
                    { required: true, message: '请输入uuid_csv' }
                ],
                uuid_list: [
                    { required: false, message: '请输入uuid' },
                    {
                        validator: (rule, value, callback) => {
							let reg = /[\;|\"|\。]+/
							if (reg.test(value)) {
                                callback(new Error('uuid规则不符'));
							} else {
                                callback();
							}

                        },
                        trigger: 'blur'
                    }
                ]
            },
            corsUrls: getCorsUrl() + '/oss_file_upload'
		}
	},
	watch: {},
	mounted () {
	},
	methods: {
        pushTypeChangeEvent (val) {
            if (val === 1) {
				this.rules.is_black = [
                    { required: true, message: '请选择类型' }
                ]
				this.rules.uuid_list =  [
                    { required: true, message: '请输入uuid' },
                    {
                        validator: (rule, value, callback) => {
                            let reg = /[\;|\"|\。]+/
                            if (reg.test(value)) {
                                callback(new Error('uuid规则不符'));
                            } else {
                                callback();
                            }

                        },
                        trigger: 'blur'
                    }
                ]
            } else {
                this.rules.uuid_list =  [
                    { required: false, message: '请输入uuid' },
                    {
                        validator: (rule, value, callback) => {
                            let reg = /[\;|\"|\。]+/
                            if (reg.test(value)) {
                                callback(new Error('uuid规则不符'));
                            } else {
                                callback();
                            }

                        },
                        trigger: 'blur'
                    }
                ]
			}
        },
        resetPushForm () {
            let form = this.pushForm
            this.$refs['pushForm'].resetFields()
			for (let attr in form) {
                switch (attr){
                    case 'terminal_type':
                        form[attr] = 1
                        break
                    case 'method':
                        form[attr] = 'push_version'
                        break
                    case 'push_type':
                        form[attr] = 0
                        break
                    default:
                        form[attr] = ''
                        break
				}
			}
		},
        closeParentFlow () {
            this.$emit('closePushBox')
		},
        pushUpdateForm (formName) {
            const obj = this
            obj.$refs[formName].validate((valid) => {
                if (valid) {
                    obj.$emit('pushUpdateParent',obj.pushForm)
                } else {
                    return false
                }
            })
		},
        getUploadData (val) {
            this.pushForm.uuid_csv = val.result
            this.$refs['pushForm'].validate((valid) => {})
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
	computed: {
	}
}
</script>
<style lang="less">
</style>