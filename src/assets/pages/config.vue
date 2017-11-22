<template>
	<div class="page-content config-page">
		<el-popover ref="filterPopover" width="600" v-model="filterPopoverFlag" placement="bottom-start">
			<div class="cp-filterFormBox">
				<el-row class="cpf-line" :gutter="24">
					<el-col :span="4" style="text-align:right;">
						<label>选择设备</label>
					</el-col>
					<el-col :span="8">
						<el-select v-model="filterForm.tab" placeholder="设备" @change="filterTypeChange" clearable @clear="filterClearAll">
							<el-option
						      v-for="item in filterTypeOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="4" style="text-align:right;">
						<label>选择版本</label>
					</el-col>
					<el-col :span="8">
						<el-select v-model="filterForm.tab" placeholder="版本" @change="filterTypeChange" clearable @clear="filterClearAll">
							<el-option
									v-for="item in filterTypeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="24">
					<el-col :span="4" style="text-align:right;">
						<label>查询支持设备</label>
					</el-col>
					<el-col :span="20" style="text-align:left;">
						<el-checkbox-group v-model="checkList">
							<el-checkbox label="设备一"></el-checkbox>
							<el-checkbox label="设备二"></el-checkbox>
							<el-checkbox label="设备三"></el-checkbox>
						</el-checkbox-group>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="24">
					<el-col :span="24" style="text-align:right; padding-top: 20px">
						<el-button type="primary" size="">查询</el-button>
					</el-col>
				</el-row>
			</div>
		</el-popover>
		<el-row type="flex" justify="space-between">
			<el-col :span="12">
				<el-button-group>
					<el-button @click="importBoxShow">录入 <i class="el-icon-caret-bottom"></i></el-button>
					<el-button v-popover:filterPopover >版本匹配搜索 <i class="el-icon-caret-bottom"></i></el-button>
					<el-button @click="pushBoxFlag = true">推送升级 <i class="el-icon-caret-bottom"></i></el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<p class="btitle">版本列表</p>
		<el-table
				:data="versionList.tableData"
				style="width: 100%">
			<el-table-column v-for="item in versionList.tableColumn" :key="item.prop"
							 :prop="item.prop"
							 :label="item.label"
							 :width="'auto'"
			>
				<template scope="scope">
					<div v-if="item.prop == 'type'" >{{getTypeText(scope.row.type)}}</div>
					<div v-else-if="item.prop == 'status'" >{{getStatusText(scope.row.status)}}</div>
					<div v-else-if="item.prop == 'force'" >{{getForceText(scope.row.force)}}</div>
					<div v-else>{{scope.row[item.prop]}}</div>
				</template>
			</el-table-column>
			<el-table-column
					width="180"
					label="操作">
				<template scope="scope">
					<el-button  type="text" size="small" @click="infoBoxFlag=true">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page-line">
			<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="20" :current-page.sync="currentPage"></el-pagination>
		</div>
		<el-dialog title="版本详情" :visible.sync="infoBoxFlag">
			<div class="edit_form">
				<el-form :model="ruleFormDetail" :rules="rulesDetail" ref="ruleFormDetail" label-width="100px" >
					<el-row>
						<el-col :span="12">
							<el-form-item label="版本Title" prop="title">
								<el-input v-model="ruleFormDetail.title" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="版本号" prop="version">
								<el-input v-model="ruleFormDetail.version" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="概略描述" prop="description">
								<el-input v-model="ruleFormDetail.description" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="详细事项" prop="description">
								<el-input v-model="ruleFormDetail.description" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="是否强制升级" prop="force">
								<el-select v-model="pushForm.force" placeholder="终端">
									<el-option label="是" value="1"></el-option>
									<el-option label="否" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="版本状态" prop="status">
								<el-select v-model="pushForm.status" placeholder="版本状态">
									<el-option label="启用" value="1"></el-option>
									<el-option label="停用" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="限制规则" prop="description">
						<el-input v-model="ruleFormDetail.description" placeholder=""></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="固件大小" prop="size">
								<el-input v-model="ruleFormDetail.size" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="下载url" prop="download_url_object">
								<el-input v-model="ruleFormDetail.download_url_object" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="图标url" prop="img_url_object">
								<el-input v-model="ruleFormDetail.img_url_object" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发布时间" prop="release_tm">
								<el-input v-model="ruleFormDetail.release_tm" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="下载md5" prop="download_file_md5">
								<el-input v-model="ruleFormDetail.download_file_md5" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="创建时间" prop="created_at">
								<el-input v-model="ruleFormDetail.created_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="更新时间" prop="updated_at">
								<el-input v-model="ruleFormDetail.updated_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="删除时间" prop="delete_at">
								<el-input v-model="ruleFormDetail.delete_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div style="text-align: right; margin: 0">
				<el-button type="primary" size="mini" @click="submitDetailForm('ruleFormDetail')" >保存</el-button>
				<el-button size="mini" type="text" @click="infoBoxFlag=false">取消</el-button>
			</div>
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
					<el-button type="primary" @click="importSubmit">确定</el-button>
					<el-button @click="importBoxFlag = false;">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog title="推送升级" :visible.sync="pushBoxFlag">
			<el-form :model="pushForm" ref="pushForm" label-width="8em">
				<el-form-item label="设备类型" >
					<el-row>
						<el-col :span="7">
							<el-select v-model="pushForm.terminal" placeholder="终端">
								<el-option
										v-for="item in terminalOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="7" :offset="1">
							<el-select v-model="pushForm.os" placeholder="操作系统">
								<el-option
										v-for="item in osOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="8"  :offset="1">
							<el-select v-model="pushForm.version" placeholder="版本号">
								<el-option
										v-for="item in versionOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item label="版本号">
					<el-input type="text" v-model="pushForm.number" />
				</el-form-item>
				<el-form-item label="推送时间">
					<el-date-picker
							v-model="pushForm.time"
							type="datetime"
							placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">确定</el-button>
					<el-button @click="pushBoxFlag = false;">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
import * as namespace from '../store/namespace';
import { mapGetters, mapActions } from 'vuex';
import { PREFIX } from '../lib/util.js';
export default {
	data () {
		return {
            pushBoxFlag: false,
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
//				tab: '',
//				system: '',
//				brand_id: '',
//				product_id: '',
				support: '',
                type_id: '',
				version: '',
				type: ''
			},
			filterParams: {
				token: '',
				page: 1,
			},
			versionOptions: [],
            pushForm: {
                terminal: '',
                os: '',
                version: '',
                number: '',
                time: '',
            },
            terminalOptions: [
                {
                    value: '1',
                    lable: '选项一'
                }
            ],
            versionOptions: [
                {
                    value: '1',
                    lable: '选项一'
                }
            ],
            osOptions: [
                {
                    value: '1',
                    lable: '选项一'
                }
            ],
            versionList: {},
            ruleFormDetail: {
                title: '',
				description: '',
				version: '',
				type: '',
				force: '',
				size: '',
				status: '',
                download_file_md5: '',
                download_url_object: '',
                img_url_object: '',
                created_at: '',
                updated_at: '',
                delete_at: ''
			},
            rulesDetail: {}
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
		})
		this.$store.dispatch({
			type: namespace.INITROUTER,
			token: this.token
		})
		this.$store.dispatch({
			type: namespace.INITPRODUCT,
			token: this.token
		})
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
			params.release_tm = params.release_tm && params.release_tm.Format('yyyy-MM-dd hh:mm:ss');
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
			this.getVersionList(this.currentPage)
		},
		getVersionList(page) {
			this.filterParams.token = this.token
			this.filterParams.page = page
			const obj  = this
            obj.$store.dispatch('getVersions', obj.filterParams).then((result) => {
                obj.versionList = result.data
                obj.totalItem = result.data.total
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
		},
        getTypeText (type) {
		    let text = ''
		    switch(type) {
				case 1:
				    text = 'app'
					break
                case 2:
                    text = '路由器'
                    break
                default:
                    text = '子设备'
                    break
			}
			return text
		},
        getStatusText (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '有效'
                    break
                case 0:
                    text = '无效'
                    break
                default:
                    break
            }
            return text
        },
        getForceText (type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '强制升级'
                    break
                case 0:
                    text = '不强制'
                    break
                default:
                    break
            }
            return text
        },
        submitDetailForm (formName) {
            let obj = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
//                    obj.$store.dispatch('', obj.ruleFormDetail).then((result) => {
//                        if (result.data.code === 0) {
//                            obj.editDialogVisible = false
//                            obj.search()
//                        }
//                    })
					obj.infoBoxFlag = false
                } else {
                    return false
                }
            })
		},
        // 重置表单
        resetForm (formName) {
            if (this.$refs[formName] !== undefined) {
                this.$refs[formName].resetFields()
            }
        },
	},
    ...mapActions([
        'getVersions'
    ]),
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
.edit_form{
	.el-form-item__label{
		width: 80px;
	}
	.el-select{
		width: 100%;
	}
}
</style>