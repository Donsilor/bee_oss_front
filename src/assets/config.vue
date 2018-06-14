<template>
	<div class="page-content config-page">
		<!--顶部tab-->
		<el-row type="flex" justify="space-between">
			<el-col :span="12">
				<el-button-group>
					<el-button @click="openImportLayer">录入 <i class="el-icon-caret-bottom"></i></el-button>
					<el-button @click="filterPopoverFlag=true" >版本匹配搜索 <i class="el-icon-caret-bottom"></i></el-button>
					<el-button @click="openPushLayer">推送升级 <i class="el-icon-caret-bottom"></i></el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<div class="p-r">
			<el-tabs v-model="activeName" @tab-click="tabClick" style="margin:10px 0 15px">
				<el-tab-pane label="版本列表" name="first"></el-tab-pane>
				<el-tab-pane label="推送历史记录" name="second"></el-tab-pane>
			</el-tabs>
			<el-button type="text" v-if="!firstTableShow" @click="backToList" class="btn-back">返回列表</el-button>
		</div>
		<!--版本列表-->
		<div v-if="activeName==='first'">
			<!--固定版本列表-->
			<el-table
					v-if="firstTableShow"
					:data="versionsFirst.tableData"
					style="width: 100%">
				<el-table-column v-for="item in versionsFirst.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template slot-scope="scope">
						<div v-if="item.prop === 'type'" >{{getTypeText(scope.row.type)}}</div>
						<div v-else-if="item.prop === 'status'" >{{getStatusText(scope.row.status)}}</div>
						<div v-else-if="item.prop === 'force'" >{{getForceText(scope.row.force)}}</div>
						<div v-else-if="item.prop === 'release_time'" >{{formatTime(scope.row['release_time'])}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template slot-scope="scope">
						<el-button  type="text" size="small" @click="getVersionHistory(scope.row)">查看版本历史</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--子设备列表-->
			<el-table
					:show-header="childTableHeaderShow"
					:data="versionList.tableData"
					style="width: 100%; border-top:0 none">
				<el-table-column v-for="item in versionList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template slot-scope="scope">
						<div v-if="item.prop == 'type'" >{{getTypeText(scope.row.type)}}</div>
						<div v-else-if="item.prop == 'status'" >{{getStatusText(scope.row.status)}}</div>
						<div v-else-if="item.prop == 'force'" >{{getForceText(scope.row.force)}}</div>
						<div v-else-if="item.prop === 'release_time'" >{{formatTime(scope.row['release_time'])}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template slot-scope="scope">
						<el-button v-if="!firstTableShow" type="text" size="small" @click="getVersionDetail(scope.row)">查看详情</el-button>
						<el-button v-if="firstTableShow" type="text" size="small" @click="getVersionHistory(scope.row)">查看历史版本</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--子设备翻页-->
			<div class="page-line">
				<el-pagination small layout="prev, pager, next" :total="totalItem" @current-change="pageChange" :page-size="20" :current-page.sync="currentPage"></el-pagination>
			</div>
		</div>
		<!--推送历史记录-->
		<div v-if="activeName==='second'">
			<el-table
					:data="pushHistoryList.tableData"
					style="width: 100%; border-top:0 none">
				<el-table-column v-for="item in pushHistoryList.tableColumn" :key="item.prop"
								 :prop="item.prop"
								 :label="item.label"
								 :width="'auto'"
				>
					<template slot-scope="scope">
						<div v-if="item.prop == 'type'" >{{getTypeText(scope.row.type)}}</div>
						<div v-else-if="item.prop == 'status'" >{{getStatusTextPush(scope.row.status)}}</div>
						<div v-else>{{scope.row[item.prop]}}</div>
					</template>
				</el-table-column>
				<el-table-column
						width="180"
						label="操作">
					<template slot-scope="scope">
						<el-button  type="text" size="small" @click="getVersionDetail(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--版本匹配搜索-->
		<el-dialog title="版本匹配搜索" :visible.sync="filterPopoverFlag">
			<div class="cp-filterFormBox">
				<el-row class="cpf-line" :gutter="24">
					<el-col :span="5" style="text-align:right;">
						<label>选择设备</label>
					</el-col>
					<el-col :span="8">
						<el-select v-model="filterForm.tab" placeholder="设备">
							<el-option
									v-for="item in filterTypeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="4" style="text-align:right; padding-left: 0" v-if="filterForm.tab===2">
						<label>选择版本</label>
					</el-col>
					<el-col :span="7" v-if="filterForm.tab===2">
						<el-select v-model="filterForm.version" placeholder="选择版本" clearable @clear="filterClearAll">
							<el-option
									v-for="item in router"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row v-if="filterForm.tab===3" class="cpf-line" :gutter="24">
					<el-col :span="5" style="text-align:right;">
						<label>选择子设备</label>
					</el-col>
					<el-col :span="8">
						<el-select v-model="filterForm.brand_id" placeholder="品牌">
							<el-option
									v-for="item in brandIDOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5" style="padding: 0">
						<el-select v-model="filterForm.type_id" placeholder="类型">
							<el-option
									v-for="item in typeIDOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
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
				<el-row v-if="filterForm.tab===3" class="cpf-line" :gutter="24">
					<el-col :span="5" style="text-align:right;">
						<label>选择版本</label>
					</el-col>
					<el-col :span="8">
						<el-select v-model="filterForm.version" placeholder="版本">
							<el-option
									v-for="item in subset"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="24">
					<el-col :span="5" style="text-align:right;">
						<label>查询支持设备</label>
					</el-col>
					<el-col :span="19" style="text-align:left;">
						<el-radio-group v-model="filterForm.type">
							<el-radio :label="2" v-if="filterForm.tab===3">路由器</el-radio>
							<el-radio :label="1" v-if="filterForm.tab===2">APP</el-radio>
							<el-radio :label="3" v-if="filterForm.tab===2">子设备</el-radio>
						</el-radio-group>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="24">
					<el-col :span="24" style="text-align:right; padding-top: 20px">
						<el-button type="primary" size="" @click="filterVersions">查询</el-button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>
		<!--版本详情-->
		<el-dialog title="版本详情" :visible.sync="infoBoxFlag">
			<div class="edit_form">
				<el-form :model="ruleFormDetail" :rules="rulesDetail" ref="ruleFormDetail" label-width="100px" >
					<el-row>
						<el-col :span="12">
							<el-form-item label="版本Title" prop="title">
								<el-input :disabled="true" v-model="ruleFormDetail.title" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="版本号" prop="version">
								<el-input :disabled="true" v-model="ruleFormDetail.version" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="概略描述" prop="description">
								<el-input :disabled="true" v-model="ruleFormDetail.description" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="详细事项" prop="description">
								<el-input :disabled="true" v-model="ruleFormDetail.description" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="是否强制升级" prop="force">
								<el-select :disabled="true" v-model="ruleFormDetail.force" placeholder="请选择">
									<el-option label="是" :value="1"></el-option>
									<el-option label="否" :value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="版本状态" prop="status">
								<el-select :disabled="true" v-model="ruleFormDetail.status" placeholder="请选择">
									<el-option label="启用" :value="1"></el-option>
									<el-option label="停用" :value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="限制规则" prop="description">
						<el-input :disabled="true" v-model="ruleFormDetail.description" placeholder=""></el-input>
					</el-form-item>
					<el-row>
						<el-col :span="12">
							<el-form-item label="固件大小" prop="size">
								<el-input :disabled="true" v-model="ruleFormDetail.size" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="下载url" prop="download_url_object">
								<el-input :disabled="true" v-model="ruleFormDetail.download_url_object" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="图标url" prop="img_url_object">
								<el-input :disabled="true" v-model="ruleFormDetail.img_url_object" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="发布时间" prop="release_tm">
								<el-input :disabled="true" v-model="ruleFormDetail.release_tm" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="下载md5" prop="download_file_md5">
								<el-input :disabled="true" v-model="ruleFormDetail.download_file_md5" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="创建时间" prop="created_at">
								<el-input :disabled="true" v-model="ruleFormDetail.created_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="更新时间" prop="updated_at">
								<el-input :disabled="true" v-model="ruleFormDetail.updated_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="删除时间" prop="delete_at">
								<el-input :disabled="true" v-model="ruleFormDetail.delete_at" placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div style="text-align: right; margin: 0">
				<el-button type="primary"  @click="infoBoxFlag=false" >确定</el-button>
			</div>
		</el-dialog>
		<!--版本录入-->
		<el-dialog title="录入版本" :visible.sync="importBoxFlag">
			<version-input
					ref="versionInputs"
					@importSubmitParent="importSubmit"
					@closeImportBox="importBoxFlag = false;"
					:brandIDOptions="brandIDOptions"
					:typeIDOptions="typeIDOptions"
					:productIDOptions="productIDOptions"
					:type="type"
					:product="product"
					:appIos="appIos"
					:router="router"
					:subset="subset"
			>
			</version-input>
		</el-dialog>
		<!--推送升级-->
		<el-dialog title="推送升级" :visible.sync="pushBoxFlag">
			<push-update
					ref="pushUpdates"
					@pushUpdateParent="pushUpdate"
					@closePushBox="pushBoxFlag = false;"
					:brandIDOptions="brandIDOptions"
					:typeIDOptions="typeIDOptions"
					:productIDOptions="productIDOptions"
					:type="type"
					:product="product"
					:router="router"
					:appIos="appIos"
					:appAndroid="appAndroid"
			>
			</push-update>
		</el-dialog>
	</div>
</template>
<script>
import * as namespace from '../../store/namespace';
import { mapGetters, mapActions } from 'vuex';
import '../lib/util.js';
import version_first_json from '../../json/versions.json'
import versions_children_json from '../../json/versionsChildren.json'
import push_history_json from '../../json/pushHistory.json'
import version_input from '../../components/versionInputLayer.vue'
import push_update from '../../components/pushUpdateLayer.vue'
export default {
    components: {
        'version-input': version_input,
		'push-update': push_update
	},
	data () {
		return {
            firstTableShow: true,
            childTableHeaderShow: false,
		    activeName: 'first',
            pushBoxFlag: false,
			info: {},
			importBoxFlag: false,
			filterPopoverFlag: false,
			infoBoxFlag: false,
			totalItem: 20,
			currentPage: 1,
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
			brandIDOptions: [],
			typeIDOptions: [],
			productIDOptions: [],
			filterForm: {
				tab: 2,
				//system: '',
				brand_id: '',
				product_id: '',
                type_id: '',
				version: '',
				type: ''
			},
			listParams: {
                method: 'list_versions',
                page: 1,
                limit: 5,
                level: 1
			},
			filterParams: {
				// token: '',
				page: 1,
                version: '',
                product_id: '',
                type: 2
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
			versionsFirst: {},
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
            rulesDetail: {},
            suportDevice: [],
            pushHistoryList: {}
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
            this.$store.dispatch({
                type: namespace.INITSUBSET,
                token: this.token,
                product_id: curVal
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
		},
	},
	mounted () {
        this.$store.dispatch({
            type: namespace.INITAPPIOS
        })
        this.$store.dispatch({
            type: namespace.INITAPPANDROID
        })
		this.$store.dispatch({
			type: namespace.INITROUTER
		})
		this.$store.dispatch({
			type: namespace.INITPRODUCT
			// token: this.token
		})
		this.getVersionList(1);
	},
	methods: {
        formatTime (val) {
            if (!val) {
                return '------'
			} else {
                let date = new Date(val*1000)
                return date.Format('yyyy-MM-dd hh:mm:ss')
			}
		},
        getVersionDetail (dataObj) {
            this.infoBoxFlag = true
			let param = {
                type: dataObj.type,
                version: dataObj.version,
                product_id: dataObj.product_id
			}
			let obj = this
            obj.$store.dispatch('getVersionDetailAction', param).then((result) => {
                let datas = result.result
				let form = obj.ruleFormDetail
				for (let attr in form) {
                    form[attr] = datas[attr]
				}
            })
		},
        tabClick () {
            if (this.activeName === 'second') {
                if (!this.pushHistoryList.tableData) {
                    this.$store.dispatch('getPushHistoryList', {}).then((result) => {
                        let datas = result.result
                        push_history_json.tableData = datas.items
						this.pushHistoryList = push_history_json
						// 翻页效果
                    })
				}
			}
		},
		filterClearAll () {
			for (let name in this.filterForm) {
				this.filterForm[name] = '';
			}
		},
		rowChosed (scope) {
			this.infoBoxFlag = true;
			this.info = scope.row;
		},
		initBrandIDOptions () {
            if (!this.brandIDOptions.length) {
                this.brandIDOptions = this.brand.map(x => {
                    return {
                        label: x.brand_name,
                        value: x.brand_id
                    }
                });
            }
		},
		openImportLayer() {
            this.initBrandIDOptions()
			this.importBoxFlag = true;
			this.filterPopoverFlag = false;
            this.$nextTick(() => {
                this.$refs['versionInputs'].resetImportForm()
            })

		},
		openPushLayer () {
            this.initBrandIDOptions()
            this.pushBoxFlag = true
            this.$nextTick(() => {
                this.$refs['pushUpdates'].resetPushForm()
            })
		},
		// 版本录入
        importSubmit (dataObj) {
            let params = Object.assign({
                // token: this.token
            }, dataObj);
            params.release_tm = params.release_tm && params.release_tm.Format('yyyy-MM-dd hh:mm:ss')
            delete params.brand_id
            delete params.type_id
            if (params.type === 1) {
                params.routers = params.routersList
                delete params.products
                delete params.product_id
            } else if (params.type === 2) {
                delete params.system
                params.products = params.productsList
                if (params.products.length) {
					params.products = params.products.map(x => {
					    let product_id = ''
//					    this.router.forEach(y => {
//					        if (y.value === x) {
//                                product_id = y.product_id
//							}
//						})
						return {
							version: x,
							product_id: params.product_id
						}
					})
                }
            } else if (params.type === 3) {
                delete params.system
                params.routers = params.routersList
            }
            delete params.productsList
            delete params.routersList

            this.$store.dispatch('importSubmitAction', params).then((result) => {
                if (result.code === 200) {
                    this.$message.success('录入成功');
                    this.importBoxFlag = false;
                    this.getVersionList(1);
                }
            })
        },
		// 推送升级
        pushUpdate (dataObj) {
            let params = Object.assign({
            }, dataObj);
            params.uuid = params.uuid.split(',')
            if (params.push_type === 1) {
                delete params.list_type
			}
            delete params.brand_id
            delete params.type_id
            delete params.productsList
            delete params.routersList
            delete params.tab

            this.$store.dispatch('pushUpdateAction', params).then((result) => {
                if (result.code === 200) {
                    this.$message.success('推送成功');
                    this.pushBoxFlag = false;
                    this.getVersionList(1);
                }
            })
		},
		pageChange () {
			this.getVersionList(this.currentPage)
		},
		// 版本匹配搜索
        filterVersions () {
            if (!this.filterForm.version) {
                this.$message.error('请选择版本')
                return
			}
            if (!this.filterForm.type) {
                this.$message.error('请选择支持设备')
                return
            }
            if (this.filterForm.tab === 3 && !this.filterForm.product_id) {
                this.$message.error('请选择子设备')
                return
            }
		    const obj = this
			obj.currentPage = 1
            let currentParam =  obj.filterParams
			for (let attr in currentParam) {
		        if(attr !== 'page') {
                    currentParam[attr] = obj.filterForm[attr]
				}
			}
			if (obj.filterForm.tab === 2) {
                // delete currentParam.product_id
			}
            obj.$store.dispatch('selectVersion', currentParam).then((result) => {
		        if (result.code === 200) {
                    obj.filterPopoverFlag = false
                    obj.firstTableShow = false
                    obj.childTableHeaderShow = true
                    let currentData = result.result
                    versions_children_json.tableData = currentData.items
                    obj.versionList = versions_children_json
                    obj.totalItem = currentData.page.total
				}
            })
        },
        // 获取所有版本列表
		getVersionList(page) {
			// this.filterParams.token = this.token
			this.listParams.page = page
			const obj  = this
            obj.$store.dispatch('getVersions', obj.listParams).then((result) => {
                if (result.code === 0) {
                    obj.firstTableShow = true
                    obj.childTableHeaderShow = false
                    let currentData = result.result
                    if(!(obj.versionsFirst.tableData && obj.versionsFirst.tableData.length)) {
                        obj.setFirstVersionList(currentData)
                    }
                    versions_children_json.tableData = currentData.device_version.data.items
                    obj.versionList = versions_children_json
                    obj.totalItem = currentData.device_version.data.page.total
				}
            })
		},
		// 渲染固定的四行表格
        setFirstVersionList (dataObj) {
            version_first_json.tableData = []
		    for (let attr in dataObj) {
		        if(attr !== 'device_version') {
                    version_first_json.tableData.push(dataObj[attr])
				}
			}
		    this.versionsFirst = version_first_json
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
                case 3:
                    text = '子设备'
                    break
                case 4:
                    text = 'IOS APP'
                    break
                default:
                    text = 'H5'
                    break
			}
			return text
		},
        getStatusTextPush(type) {
            let text = ''
            switch(type) {
                case 1:
                    text = '成功'
                    break
                case 0:
                    text = '失败'
                    break
                default:
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
		// 获取详情
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
        // 历史版本
        getVersionHistoryList(page, type, product_id) {
            // this.filterParams.token = this.token
            this.listParams.page = page
			let param = {
                page: page,
                level: 2,
                type: type,
				product_id: product_id || ''
			}
            const obj  = this
            obj.$store.dispatch('getVersions', param).then((result) => {
                if (result.code === 200) {
                    let currentData = result.result
                    obj.firstTableShow = false
                    obj.childTableHeaderShow = true
                    versions_children_json.tableData = currentData.items
                    obj.versionList = versions_children_json
                    obj.totalItem = currentData.page.total
				}
            })
        },
        getVersionHistory (dataObj) {
            this.getVersionHistoryList(1, dataObj.type, dataObj.product_id)
		},
		backToList () {
            this.getVersionList(1)
		}
	},
    ...mapActions([
        'getVersions',
        'selectVersion',
		'importSubmitAction',
		'pushUpdateAction',
		'getPushHistoryList',
		'getVersionDetailAction'
    ]),
	computed: {
		...mapGetters({
			brand: namespace.BRAND,
			type: namespace.TYPE,
			product: namespace.PRODUCT,
			router: namespace.ROUTER,
			subset: namespace.SUBSET,
			appIos: namespace.APPIOS,
            appAndroid: namespace.APPANDROID
        })
	}
}
</script>
<style lang="less">
	.cp-filterFormBox{
		padding: 20px;
		label{
			line-height: 36px;
		}
		.cpf-line{
			margin-bottom: 20px;
		}
	}
.config-page{
	.el-tabs__active-bar{
		height: 2px;
	}
	.h3_pp{
		height: 30px;
		line-height: 30px;
		margin:30px 0 15px;
	}
	.cpsr-line{
		margin-bottom: 80px;
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
	.el-input.is-disabled .el-input__inner{
		color: #333;
	}
	.p-r{
		position: relative;
	}
	.btn-back{
		position: absolute;
		right: 10px;
		top: 10px;
	}
}
</style>