<template>
	<div class="page-content config-page">
		<el-popover ref="filterPopover" width="600" v-model="filterPopoverFlag" placement="bottom-start">
			<div class="cp-filterFormBox">
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="6" style="text-align:right;">
						<label>选择设备</label>
					</el-col>
					<el-col :span="6">
						<el-select v-model="filterForm.tab" placeholder="设备" @change="filterTypeChange" clearable @clear="filterClearAll">
							<el-option
						      v-for="item in filterTypeOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="6" v-show="filterForm.tab === 1">
						<el-select v-model="filterForm.system" placeholder="操作系统">
							<el-option
						      v-for="item in systemOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="20" v-show="filterForm.tab === 3">
					<el-col :span="6" style="text-align:right;">
						<label>选择product_id</label>
					</el-col>
					<el-col :span="6" >
						<el-select v-model="filterForm.brand_id" placeholder="品牌">
							<el-option
						      v-for="item in brandIDOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="filterForm.type_id" placeholder="类型">
							<el-option
						      v-for="item in typeIDOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="6">
						<el-select v-model="filterForm.product_id" placeholder="产品">
							<el-option
						      v-for="item in productIDOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>

				<el-row class="cpf-line" :gutter="20" v-show="filterForm.tab === 3 || filterForm.tab === 2">
					<el-col :span="6" style="text-align:right;">
						<label>选择版本</label>
					</el-col>
					<el-col :span="18">
						<el-select v-model="filterForm.version" placeholder="全部" clearable>
							<el-option
						      v-for="item in versionOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="20" v-show="filterForm.tab === 3 || filterForm.tab === 2">
					<el-col :span="6" style="text-align:right;">
						<label>查询支持设备</label>
					</el-col>
					<el-col :span="18">
						
						<el-radio-group v-model="filterForm.type">
							<el-radio :label="1" :disabled="filterForm.tab === 3">APP</el-radio>
							<el-radio :label="2" :disabled="filterForm.tab === 2">路由器</el-radio>
							<el-radio :label="3" :disabled="filterForm.tab === 3">子设备</el-radio>
						</el-radio-group>
					</el-col>
				</el-row>
				<el-row type="flex" justify="end">
					<el-col :span="4">
						<el-button @click="composeParams" type="primary">查询</el-button>
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
			
		</el-row>
		

		<p class="btitle">版本列表</p>

		<el-table :data="list" style="width: 100%">
			<el-table-column prop="title" label="产品名称"></el-table-column>
			<el-table-column prop="version" label="版本号"></el-table-column>
			<el-table-column prop="created_at" label="提交时间" width="175"></el-table-column>
			<el-table-column prop="release_time" label="发布时间" width="175"></el-table-column>
			<el-table-column prop="download_file_md5" label="download_file_md5" width="320"></el-table-column>
			<el-table-column prop="s" label="设备厂商"></el-table-column>
			<el-table-column prop="s" label="型号"></el-table-column>
			<el-table-column prop="s" label="品类"></el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button @click="rowChosed(scope)" type="text">版本详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page-line">
			<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="20" :current-page.sync="currentPage"></el-pagination>
		</div>


		
		<el-dialog title="版本详情" :visible.sync="infoBoxFlag">
			<el-row  class="infoBox" :gutter="20">
				<el-col :span="6" style="text-align:right;">名称：</el-col><el-col :span="18">{{info.title}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">描述：</el-col><el-col :span="18">{{info.description}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">备注：</el-col><el-col :span="18">&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">版本号：</el-col><el-col :span="18">{{info.version}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">设备类型：</el-col><el-col :span="18">{{info.type|typeToString}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">是否强制升级：</el-col><el-col :span="18">{{info.force|forceToString}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">限制规则：</el-col><el-col :span="18">{{info.rule}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">固件大小：</el-col><el-col :span="18">{{info.size}} B&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">图片地址：</el-col><el-col :span="18">{{info.img_url_object}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">下载链接：</el-col><el-col :span="18">{{info.download_url_object}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">版本状态：</el-col><el-col :span="18">{{info.status|statusToString}}&nbsp;</el-col>
				<el-col :span="6" style="text-align:right;">文件MD5值：</el-col><el-col :span="18">{{info.download_file_md5}}&nbsp;</el-col>
			</el-row>
		</el-dialog>

		<el-dialog title="录入版本" :visible.sync="importBoxFlag">
			<el-form :model="importForm" ref="importForm" label-width="8em" @submit.prevent="importSubmit">
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
				      format="yyyy-MM-dd" 
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="支持版本">
					<el-select style="width: 100%;" multiple v-model="importForm.routers" placeholder="路由" v-show="importForm.type !== 2">
						<el-option
					      v-for="item in routerOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
					<el-select style="width: 100%;" multiple v-model="importForm.products" placeholder="子设备" v-show="importForm.type === 2">
						<el-option
					      v-for="item in subsetOptions"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="object">
					 <el-input type="text" v-model="importForm.download_url_object" />
				</el-form-item>
				<el-form-item label="md5">
					 <el-input type="text" v-model="importForm.download_file_md5" />
				</el-form-item>
				<el-form-item label="file_size">
					 <el-input type="text" v-model="importForm.file_size" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="importSubmit" native-type="submit">确定</el-button>
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
			info: {},
			importBoxFlag: false,
			filterPopoverFlag: false,
			infoBoxFlag: false,
			totalItem: 20,
			currentPage: 1,

			importForm: {
				type: 1,
				system: '',
				version: '',
				release_tm: '',
				routers: [],
				products: [],
				download_url_object: '',
				download_file_md5: '',
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

			routerOptions: [],

			subsetOptions: [],

			brandIDOptions: [],

			typeIDOptions: [],

			productIDOptions: [],
			
			filterForm: {
				tab: '',
				system: '',
				brand_id: '',
				type_id: '',
				product_id: '',
				version: '',
				type: ''
			},

			filterParams: {
				token: '',
				page: 1,
			},

			versionOptions: []

		}
	},

	filters: {
		typeToString (x) {
			if (x*1 === 1) {
				return 'APP';
			} else if (x*1 === 2) {
				return '路由器';
			} else if (x*1 === 3) {
				return '子设备';
			} else {
				return '未知';
			}
		},
		forceToString (x) {
			return x ? '是': '否'; 
		},
		statusToString (x) {
			return x ? '启用': '停用';
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

		'filterForm.brand_id' (curVal, oldVal) {
			this.filterForm.type_id = '';
			this.filterForm.product_id = '';
			this.filterForm.version = '';
			this.typeIDOptions = this.type.filter(x => x.brand_ids.indexOf(curVal*1) >= 0).map(x => {
				return {
					label: x.type_name,
					value: x.type_id
				}
			});
		},

		'filterForm.type_id' (curVal, oldVal) {
			console.log('done');
			this.filterForm.product_id = '';
			this.filterForm.version = '';
			const brandKey = this.filterForm.brand_id*1;
			const typeKey = curVal*1;
			this.productIDOptions = this.product.filter(x => x.brand_id === brandKey && x.type_id === typeKey).map(x => {
				return {
					label: x.product_id,
					value: x.product_id
				}
			})
		},

		'filterForm.product_id' (curVal, oldVal) {
			this.filterForm.version = '';
			const productKey = curVal.split('-')[1];
			this.versionOptions = this.subset.filter(x => x.product_id === productKey).map(x => {
				const product_id = x.value.split('-')[1];
				return {
					label: x.label,
					value: product_id
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
				this.versionOptions = this.router;
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
		filterClearAll () {
			for (let name in this.filterForm) {
				this.filterForm[name] = '';
			}
		},
		rowChosed (scope) {
			this.infoBoxFlag = true;
			this.info = scope.row;
		},

		filterTypeChange () {
			if (this.filterForm.tab === 3) {
				this.filterForm.type = 2;
				this.filterForm.version = '';
			} else {
				this.filterForm.type = '';
				this.filterForm.version = '';
				this.versionOptions = this.router;
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
			
			this.routerOptions = this.router;
			this.subsetOptions = this.subset;
			
		},
		importSubmit () {
			let params = Object.assign({
				token: this.token
			}, this.importForm);
			params.release_tm = params.release_tm.Format('yyyy-MM-dd hh:mm:ss');
			if (params.type === 1) {
				delete params.products;
				delete params.brand_id;
				delete params.type_id;
				delete params.product_id;
			} else if (params.type === 2) {
				delete params.routers;
				delete params.brand_id;
				delete params.type_id;
				delete params.product_id;
				delete params.system;
				if (this.importForm.products.length) {
					params.products = this.importForm.products.map(x => {
						const values = x.split('-');
						return {
							version: values[0],
							product_id: values[1]
						}
					})
				} else {
					params.products = [];
				}
				
			} else if (params.type === 3) {
				delete params.system;
				delete params.products;
			}
			this.$http.post(PREFIX + 'version/input', params).then(x => {
				const json = x.data;
				if (json.code === 200) {
					this.$message.success('录入成功');
					if (this.importForm.type === 2) {
						this.$store.dispatch({
							type: namespace.GETROUTER,
							token: this.token
						});
					} else if(this.importForm.type === 3) {
						this.$store.dispatch({
							type: namespace.GETSUBSET,
							token: this.token
						});
					}
					this.importBoxFlag = false;
					this.importForm = {
						type: 1,
						system: '',
						version: '',
						release_tm: '',
						routers: [],
						products: [],
						download_url_object: '',
						download_file_md5: '',
						file_size: '',
						brand_id: '',
						type_id: '',
						product_id: '',
					};
					this.getVersionList(1);
				} else {
					this.$message.error(json.msg);
				}
			})

		},


		pageChange () {
			this.getVersionList(this.currentPage);
		},

		getVersionList(page) {
			this.filterParams.token = this.token;
			this.filterParams.page = page;
			this.$http.post(PREFIX + 'version/list', this.filterParams).then(res => {
				const json = res.data;
				if (json.code === 200) {
					this.list = json.result.list;
					this.totalItem = json.result.total;
					this.currentPage = json.result.current_page;
				} else {
					this.$message.error(json.msg);
				}
			})
		},

		composeParams () {
			this.filterPopoverFlag = false;
			this.filterParams = {};
			if (this.filterForm.type) {
				this.filterParams.type = this.filterForm.type;
			}
			if (this.filterForm.version) {
				this.filterParams.version = this.filterForm.version;
			}
			if (this.filterForm.tab === 3 && this.filterForm.product_id) {
				this.filterParams.product_id = this.filterForm.product_id;
			}
			this.getVersionList(1);
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
.infoBox{
	font-size: 1rem;
	>div{
		margin-bottom: 18px;
	}
}
</style>