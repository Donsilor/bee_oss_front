<template>
	<el-form :model="pushForm" ref="pushForm" :rules="rules"  label-width="8em">
		<el-row>
			<el-col :span="12" style="padding-right: 27px">
				<el-form-item label="推送类型" prop="push_type">
					<el-select v-model="pushForm.push_type"  placeholder="选择类型" @change="pushTypeChangeEvent">
						<el-option label="全量升级" :value="1"></el-option>
						<el-option label="灰度升级" :value="2"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="7" :offset="1"  v-if="pushForm.push_type===2" style="margin-left: -15px">
				<el-form-item label="" prop="list_type" label-width="0">
					<el-select v-model="pushForm.list_type"  placeholder="请选择">
						<el-option label="白名单" :value="1"></el-option>
						<el-option label="黑名单" :value="2"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label="uuid" prop="uuid">
			<el-row :gutter="24">
				<el-col :span="17" style="padding-left:0">
					<el-input  v-model="pushForm.uuid"></el-input>
				</el-col>
			</el-row>
			<el-row>
				<span style="font-size: 12px; color: #999">可输入多个uuid，用逗号隔开</span>
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
export default {
    props: ['brandIDOptions','typeIDOptions',
		'productIDOptions','router','subset',
		'type','product', 'appAndroid', 'appIos','inputType','pushDataObj'],
	data () {
		return {
            brandIDOptionsChild: this.brandIDOptions,
            typeIDOptionsChild: this.typeIDOptions,
            productIDOptionsChild: this.productIDOptions,
            typeOptions: [
                {
                    value: 1,
                    label: '安卓'
                },
                {
                    value: 2,
                    label: '路由器'
                },
                {
                    value: 4,
                    label: 'IOS'
                }
            ],
            pushForm: {
                push_type: '',
                list_type: '',
                product_id: '',
                brand_id: '',
                type_id: '',
                uuid: ''
            },
            rules: {
                push_type: [
                    { required: true, message: '请选择推送类型' }
                ],
                list_type: [
                    { required: false, message: '请选择类型' }
                ],
                product_id: [
                    { required: false, message: '请选择产品类型' }
                ],
                uuid: [
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
		}
	},
	watch: {
        'pushForm.brand_id' (curVal, oldVal) {
            this.pushForm.type_id = '';
            this.pushForm.product_id = '';
            this.typeIDOptionsChild = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
                return {
                    label: x.type_name,
                    value: x.type_id
                }
            });
        },
        'pushForm.type_id' (curVal, oldVal) {
            this.pushForm.product_id = '';
            const brandKey = this.pushForm.brand_id*1;
            const typeKey = curVal*1;
            this.productIDOptionsChild = this.product.filter(x => x.brand_id === brandKey && x.type_id === typeKey).map(x => {
                return {
                    label: x.product_id,
                    value: x.product_id
                }
            })
        },
        'pushForm.product_id' (curVal, oldVal) {
            this.$store.dispatch({
                type: namespace.INITSUBSET,
                token: this.token,
                product_id: curVal
            })
        },
	},
	mounted () {
	},
	methods: {
        pushTypeChangeEvent (val) {
            if (val === 2) {
				this.rules.list_type = [
                    { required: true, message: '请选择类型' }
                ]
				this.rules.uuid =  [
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
                this.rules.uuid =  [
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
                    case 'routersList':
                    case 'productsList':
					case 'uuid':
                        form[attr] = ''
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
		}
	},
	computed: {
	}
}
</script>
<style lang="less">
</style>