<template>
	<div class="cp-filterFormBox">
		<el-row v-if="(inputType!==2) && (inputType!==5)" class="cpf-line" :gutter="24">
			<el-col :span="4" style="text-align:right; padding-left: 0">
				<label>选择版本</label>
			</el-col>
			<el-col :span="12">
				<el-select style="width: 100%" v-model="filterForm.rules" multiple placeholder="选择版本">
					<el-option
							v-for="item in router"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row v-if="inputType===2 || inputType===5" class="cpf-line" :gutter="24">
			<el-col :span="5" style="text-align:right;">
				<label>选择子设备</label>
			</el-col>
			<el-col :span="6">
				<el-select v-model="filterForm.brand_id" placeholder="品牌">
					<el-option
							v-for="item in brandIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="6">
				<el-select v-model="filterForm.type_id" placeholder="类型">
					<el-option
							v-for="item in typeIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="5">
				<el-select v-model="filterForm.product_id" placeholder="产品" @change="productChange">
					<el-option
							v-for="item in productIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row v-if="inputType===2 || inputType===5" class="cpf-line" :gutter="24">
			<el-col :span="5" style="text-align:right;">
				<label>选择版本</label>
			</el-col>
			<el-col :span="17">
				<el-select style="width: 100%" multiple v-model="filterForm.rules" placeholder="版本">
					<el-option
							v-for="item in subsetProducts"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row class="cpf-line" :gutter="24">
			<el-col :span="24" style="text-align:right; padding-top: 20px">
				<el-button type="primary" size="" @click="submitFilter">查询</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import * as namespace from '../../../store/namespace';
import { mapGetters, mapActions } from 'vuex';
import API from '../../../service/index'
export default {
    props: ['brandIDOptions','typeIDOptions', 'type', 'productIDOptions','appIos',
		'router','inputType','product'],
	data () {
		return {
            brandIDOptionsChild: this.brandIDOptions,
            typeIDOptionsChild: this.typeIDOptions,
            productIDOptionsChild: this.productIDOptions,
            subsetProducts: [],
            filterForm: {
                method: 'list_versions',
                brand_id: '',
                product_id: '',
                type_id: '',
                page: 1,
                rules: [],
                limit: 10,
                level: 2,
                type: ''
            }
		}
	},
	watch: {
        'filterForm.brand_id' (curVal, oldVal) {
            this.filterForm.type_id = '';
            this.filterForm.product_id = '';
            this.filterForm.rules = [];
            this.typeIDOptionsChild = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
                return {
                    label: x.type_name,
                    value: x.type_id
                }
            });
        },
        'filterForm.type_id' (curVal, oldVal) {
            this.filterForm.product_id = '';
            this.filterForm.rules = [];
            const brandKey = this.filterForm.brand_id*1;
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
        resetFilterForm () {
            let currentForm = this.filterForm
            for (let attr in currentForm) {
                switch (attr) {
                    case 'method':
                        currentForm[attr] = 'list_versions'
                        break
                    case 'page':
                        currentForm[attr] = 1
                        break
                    case 'limit':
                        currentForm[attr] = 10
                        break
                    case 'rules':
                        currentForm[attr] = []
                        break
                    case 'level':
                        currentForm[attr] = 2
                        break
                    default:
                        currentForm[attr] = ''
                        break
                }
            }
        },
        ruleChange (val) {
            if (val) {
                this.rulesImport.productsList =  [
                    { required: true, message: '请选择支持版本' }
                ]
                this.rulesImport.routersList =  [
                    { required: true, message: '请选择支持版本' }
                ]
			} else {
                this.rulesImport.productsList =  [
                    { required: false }
                ]
                this.rulesImport.routersList =  [
                    { required: false }
                ]
			}
		},
        closeParentFlow () {
            this.$emit('closeFilterBox')
		},
		productChange (val) {
			let obj = this
            API.pubilcCorsAction({
                method: 'released_versions',
                type: 3,
                product_id: val
            }).then((res) => {
                if (res.code === 0) {
                    let list = res.result;
                    if (list && list.length) {
                        obj.currentProductId = val
                        obj.subsetProducts = list.map(x => {
                            return {
                                label: x.title,
								product_id: x.product_id,
                                value: `${x.version}--${x.product_id}`
                            }
                        })
                    } else {
                        obj.subsetProducts = [];
                    }
                }
			})
		},
        submitFilter () {
            if (this.inputType !== 2 && this.inputType !== 5 && !this.filterForm.rules.length) {
                this.$message.error('请选择路由版本')
                return
            } else if ((this.inputType === 2 || this.inputType === 5) && !this.filterForm.rules.length) {
                this.$message.error('请选择子设备版本')
                return
            }
            const obj = this
            obj.currentPage = 1
            let currentParam = Object.assign({}, obj.filterForm);
            currentParam.type = obj.inputType
            if (obj.inputType !== 2 &&  obj.inputType !== 5) {
                delete currentParam.product_id
            } else {
                currentParam.rules = currentParam.rules.map((item) => {
                    return item.split('-')[0]
                })
            }
            delete currentParam.brand_id
            delete currentParam.type_id
            obj.$emit('filterVersionsParent', currentParam)
		}
	},
    computed: {
    }
}
</script>
<style lang="less">
	.cp-filterFormBox{

	}

</style>