<template>
	<div class="page-content config-page">
		<el-popover ref="filterPopover" width="600" v-model="filterPopoverFlag" placement="bottom-start">
			<div class="cp-filterFormBox">
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="6" style="text-align:right;">
						<label>选择设备</label>
					</el-col>
					<el-col :span="6">
						<el-select v-model="filterForm.type" placeholder="设备" @change="filterTypeChange">
							<el-option
						      v-for="item in filterTypeOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="6" v-show="filterForm.type === 1">
						<el-select v-model="filterForm.system" placeholder="操作系统">
							<el-option
						      v-for="item in systemOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="6" v-show="filterForm.type === 3">
						<el-select v-model="filterForm.brand_id" placeholder="品牌">
							<el-option
						      v-for="item in brandIDOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="6" v-show="filterForm.type === 3">
						<el-select v-model="importForm.type_id" placeholder="类型">
							<el-option
						      v-for="item in typeIDOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="6" style="text-align:right;">
						<label>选择版本</label>
					</el-col>
					<el-col :span="18">
						<el-select v-model="filterForm.version" placeholder="全部">
							<el-option
						      v-for="item in versionOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="6" style="text-align:right;">
						<label>查询支持设备</label>
					</el-col>
					<el-col :span="18">
						
						<el-radio-group v-model="filterForm.support">
							<el-radio :label="1" :disabled="filterForm.type === 3">APP</el-radio>
							<el-radio :label="2" :disabled="filterForm.type === 2">路由器</el-radio>
							<el-radio :label="3" :disabled="filterForm.type === 3">子设备</el-radio>
						</el-radio-group>
					</el-col>
				</el-row>
				<el-row type="flex" justify="end">
					<el-col :span="4">
						<el-button @click="filterPopoverFlag = false" type="primary">查询</el-button>
					</el-col>
				</el-row>
			</div>
		</el-popover>
		<el-row type="flex" justify="space-between">
			<el-col :span="12">
				<el-button-group>
					<el-button @click="importBoxShow">录入</el-button>
					<el-button v-popover:filterPopover >版本匹配搜索 <i class="el-icon-caret-bottom"></i></el-button>
				</el-button-group>
			</el-col>
			<el-col :span="12" style="text-align: right;">
				<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>
			</el-col>
		</el-row>
		

		<p class="btitle">版本列表</p>

		<el-table :data="list" v-show="!searchedFlag" style="width: 100%">
			<el-table-column prop="title" label="产品名称"></el-table-column>
			<el-table-column prop="version" label="版本号"></el-table-column>
			<el-table-column prop="s" label="提交时间" ></el-table-column>
			<el-table-column prop="s" label="发布时间"></el-table-column>
			<el-table-column prop="download_file_md5" label="url" width="320"></el-table-column>
			<el-table-column prop="s" label="设备厂商"></el-table-column>
			<el-table-column prop="s" label="型号"></el-table-column>
			<el-table-column prop="s" label="品类"></el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button @click="" type="text">版本详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		

		<el-dialog title="录入版本" :visible.sync="importBoxFlag">
			<el-form :model="importForm" ref="importForm" label-width="8em">
				<el-form-item label="版本类型" >
					<el-row>
						<el-col :span="8">
							<el-select v-model="importForm.type" placeholder="终端">
								<el-option
							      v-for="item in typeOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="7" :offset="1" v-show="importForm.type === 1">
							<el-select v-model="importForm.system" placeholder="操作系统">
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
				<el-form-item label="子设备" v-show="importForm.type === 3">
					<el-row>
						<el-col :span="8">
							<el-select v-model="importForm.brand_id" placeholder="品牌">
								<el-option
							      v-for="item in brandIDOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="7" :offset="1">
							<el-select v-model="importForm.type_id" placeholder="类型">
								<el-option
							      v-for="item in typeIDOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="7" :offset="1">
							<el-select v-model="importForm.product_id" placeholder="产品">
								<el-option
							      v-for="item in productIDOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="版本号">
					 <el-input type="text" v-model="importForm.version" />
				</el-form-item>
				<el-form-item label="发布时间">
					 <el-date-picker
				      v-model="importForm.release_tm"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="支持版本">
					<el-select multiple v-model="importForm.routers" placeholder="路由" v-show="importForm.type !== 2">
						<el-option
					      v-for="item in routerOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
					<el-select multiple v-model="importForm.products" placeholder="子设备" v-show="importForm.type === 2">
						<el-option
					      v-for="item in subsetOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>

				</el-form-item>
				<el-form-item label="object">
					 <el-input type="text" v-model="importForm.object" />
				</el-form-item>
				<el-form-item label="md5">
					 <el-input type="text" v-model="importForm.md5" />
				</el-form-item>
				<el-form-item label="file_size">
					 <el-input type="text" v-model="importForm.file_size" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">确定</el-button>
					<el-button @click="importBoxFlag = false;">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
	</div>
</template>
<script>
import * as namespace from '../store/namespace';
import { mapGetters } from 'vuex';
import { PREFIX } from '../lib/util.js';
export default {
	data () {
		return {
			list: [],
			importBoxFlag: false,
			filterPopoverFlag: false,

			importForm: {
				type: 1,
				system: '',
				version: '',
				release_tm: '',
				routers: [],
				products: [],
				object: '',
				md5: '',
				file_size: '',
				brand_id: '',
				type_id: '',
				product_id: '',
			},
			filterTypeOptions: [
				{
					value: 2,
					label: '路由器'
				},
				{
					value: 3,
					label: '子设备'
				}
			],
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

			routerOptions: [
				{
					value: '1',
					label: '选项一'
				},
				{
					value: '2',
					label: '选项二'
				}
			],

			subsetOptions: [],

			brandIDOptions: [],

			typeIDOptions: [],

			productIDOptions: [],
			
			filterForm: {
				type: 2,
				system: '',
				brand_id: '',
				type_id: '',
				support: ''
			},

			versionOptions: [ ]

		}
	},
	watch: {
		'importForm.brand_id' (curVal, oldVal) {
			this.importForm.type_id = '';
			this.importForm.product_id = '';
			this.typeIDOptions = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
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
			this.productIDOptions = this.product.filter(x => x.brand_id === brandKey && x.type_id === typeKey).map(x => {
				return {
					label: x.product_id,
					value: x.product_id
				}
			})
		},

		'filterPopoverFlag' (curVal, oldVal) {
			if (curVal) {
				if (!this.brandIDOptions.length) {
					this.brandIDOptions = this.brand.map(x => {
						return {
							label: x.brand_name,
							value: x.brand_id
						}
					});
				}
			}
		},

		'filterForm.brand_id' (curVal, oldVal) {
			this.filterForm.type_id = '';
			this.typeIDOptions = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
				return {
					label: x.type_name,
					value: x.type_id
				}
			});
		}
	},
	mounted () {

		this.$store.dispatch({
			type: namespace.INITSUBSET,
			token: this.token
		});

		this.$store.dispatch({
			type: namespace.INITROUTER,
			token: this.token
		});

		this.$store.dispatch({
			type: namespace.INITPRODUCT,
			token: this.token
		});

		this.getVersionList(1);
	},
	methods: {
		rowChosed (row, event) {
			console.log(row);
		},

		filterTypeChange () {
			if (this.filterForm.type === 3) {
				this.filterForm.support = 2;
			} else {
				this.filterForm.support = '';
			}
		},

		importBoxShow() {
			this.importBoxFlag = true;
			this.filterPopoverFlag = false;
			if (!this.brandIDOptions.length) {
				this.brandIDOptions = this.brand.map(x => {
					return {
						label: x.brand_name,
						value: x.brand_id
					}
				});
			}
			if (!this.routerOptions.length) {
				this.routerOptions = this.router;
			}
			if (!this.subsetOptions.length) {
				this.subsetOptions = this.subset;
			}
		},

		getVersionList(page) {
			this.$http.post(PREFIX + 'version/list', {
				token: this.token,
				page: page
			}).then(res => {
				const json = res.data;
				if (json.code === 200) {
					this.list = json.result.list;
				} else {
					this.$message.error(json.msg);
				}
			})
		}
	},
	computed: {
		...mapGetters({
			brand: namespace.BRAND,
			type: namespace.TYPE,
			product: namespace.PRODUCT,
			router: namespace.ROUTER,
			subset: namespace.SUBSET,
            token: namespace.TOKEN
        })
	}
}
</script>
<style lang="less">
.cpsr-line{
	margin-bottom: 80px;
}
.cp-filterFormBox{
	padding: 20px;
	label{
		line-height: 36px;
	}
	.cpf-line{
		margin-bottom: 20px;
	}
}
</style>