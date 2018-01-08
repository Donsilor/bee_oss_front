<template>
	<div class="cp-filterFormBox">
		<el-row v-if="(inputType!==2) && (inputType!==5)" class="cpf-line" :gutter="24">
			<el-col :span="4" style="text-align:right; padding-left: 0">
				<label>选择版本</label>
			</el-col>
			<el-col :span="14">
				<el-select v-model="filterForm.version" placeholder="选择版本">
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
			<el-col :span="8">
				<el-select v-model="filterForm.brand_id" placeholder="品牌">
					<el-option
							v-for="item in brandIDOptionsChild"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="5" style="padding: 0">
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
			<el-col :span="16">
				<el-select multiple v-model="filterForm.versions" placeholder="版本">
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
                version: '',
                versions: [],
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
            this.filterForm.versions = [];
            this.typeIDOptionsChild = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
                return {
                    label: x.type_name,
                    value: x.type_id
                }
            });
        },
        'filterForm.type_id' (curVal, oldVal) {
            this.filterForm.product_id = '';
            this.filterForm.versions = [];
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
                    case 'versions':
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
        renderEditData () {
            let attrObj = {
                title: '',
                download_file_md5: '',
                force: '',
                version: '',
                description: '',
                img_url_object: '',
                note: '',
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
            this.$refs['importForm'].resetFields()
			if (this.inputType !== 4 && !this.releasedFlag) {
                this.$refs['uploadFile'].clearFiles()
			}
            this.$refs['uploadFileImg'].clearFiles()
            this.importForm['selectRule'] = 1

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
                    default:
                        form[attr] = ''
                        break
				}
			}
		},
        closeParentFlow () {
            this.$emit('closeFilterBox')
		},
		productChange (val) {
			let obj = this
            obj.$store.dispatch('pubilcCorsAction',{
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
            if (this.inputType !== 2 && this.inputType !== 5 && !this.filterForm.version) {
                this.$message.error('请选择路由版本')
                return
            } else if ((this.inputType === 2 || this.inputType === 5) && !this.filterForm.versions) {
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
                currentParam.version = currentParam.versions.map((item) => {
                    return item.split('-')[0]
                })
            }
            delete currentParam.versions
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
</style>