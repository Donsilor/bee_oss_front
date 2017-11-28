<template>
	<el-form :model="pushForm" ref="pushForm" label-width="8em">
		<el-form-item label="产品类型" >
			<el-row :gutter="24" >
				<el-col :span="8" style="padding: 0">
					<el-select v-model="pushForm.tab" placeholder="选择类型">
						<el-option
								v-for="item in typeOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="8" v-if="pushForm.tab===1">
					<el-select v-model="pushForm.system" placeholder="操作系统">
						<el-option
								v-for="item in systemOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</el-form-item>
		<el-row class="cpf-line" :gutter="24" v-if="pushForm.tab===3">
			<el-col :span="4" style="text-align:right;">
				<label>选择子设备</label>
			</el-col>
			<el-col :span="7" style="padding:0; margin-bottom: 20px">
				<el-select v-model="pushForm.brand_id" placeholder="品牌">
					<el-option
							v-for="item in brandIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="6" style="padding-right: 0">
				<el-select v-model="pushForm.type_id" placeholder="类型">
					<el-option
							v-for="item in typeIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="5" style="padding-right: 0">
				<el-select v-model="pushForm.product_id" placeholder="产品">
					<el-option
							v-for="item in productIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-form-item label="推送类型" >
			<el-row>
				<el-col :span="8">
					<el-select v-model="pushForm.push_type" placeholder="选择类型">
						<el-option label="全量升级" :value="1"></el-option>
						<el-option label="灰度升级" :value="2"></el-option>
					</el-select>
				</el-col>
				<el-col :span="8" :offset="1" v-if="pushForm.push_type===2">
					<el-select v-model="pushForm.list_type" placeholder="请选择">
						<el-option label="白名单" :value="1"></el-option>
						<el-option label="黑名单" :value="2"></el-option>
					</el-select>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item label="uuid">
			<el-row class="cpf-line" :gutter="24">
				<el-col :span="12" style="padding-left: 0">
					<el-select multiple v-model="pushForm.routersList" placeholder="路由" v-if="pushForm.tab !== 3">
						<el-option
								v-for="item in router"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
					<el-select multiple v-model="pushForm.productsList" placeholder="子设备" v-if="pushForm.tab === 3">
						<el-option
								v-for="item in subset"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary"@click="pushUpdateForm">确定</el-button>
			<el-button @click="closeParentFlow">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
import * as namespace from '../store/namespace';
export default {
    props: ['brandIDOptions','typeIDOptions','productIDOptions','router','subset','type','product'],
	data () {
		return {
            pushForm: {
                tab: 1,
                system: 'Android',
				type: 1,
                push_type: '',
                list_type: '',
                version: '',
				product_id: '',
				brand_id: '',
				type_id: '',
                routersList: [],
                productsList: [],
                uuid: []
            },
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
            ]
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
        resetPushForm () {
            let form = this.pushForm
			for (let attr in form) {
                switch (attr){
                    case 'tab':
					case 'type':
                        form[attr] = 1
                        break
                    case 'system':
                        form[attr] = 'Android'
                        break
                    case 'routersList':
                    case 'productsList':
					case 'uuid':
                        form[attr] = []
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
        pushUpdateForm () {
            this.$emit('pushUpdateParent',this.pushForm)
		}
	},
	computed: {
	}
}
</script>
<style lang="less">
</style>