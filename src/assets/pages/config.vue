<template>
	<div class="page-content config-page">
		<el-popover ref="filterPopover" width="440" v-model="filterPopoverFlag" placement="bottom-start">
			<div class="cp-filterFormBox">
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="5">
						<label>平台版本</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.platform" placeholder="全部">
							<el-option
						      v-for="item in platformOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<label>品牌</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.firm" placeholder="全部">
							<el-option
						      v-for="item in firmOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="5">
						<label>APP版本</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.app" placeholder="全部">
							<el-option
						      v-for="item in appOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<label>子设备</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.child" placeholder="全部">
							<el-option
						      v-for="item in childOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row class="cpf-line" :gutter="20">
					<el-col :span="5">
						<label>路由器版本</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.router" placeholder="全部">
							<el-option
						      v-for="item in routerOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<label>子设备版本</label>
					</el-col>
					<el-col :span="7">
						<el-select v-model="filterForm.self" placeholder="全部">
							<el-option
						      v-for="item in selfOptions"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
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
					<el-button @click="importBoxFlag = true">录入</el-button>
					<el-button v-popover:filterPopover >版本匹配搜索 <i class="el-icon-caret-bottom"></i></el-button>
				</el-button-group>
			</el-col>
			<el-col :span="12" style="text-align: right;">
				<el-button v-show="searchedFlag" @click="searchedFlag = false">返回</el-button>
			</el-col>
		</el-row>
		

		<p class="btitle">版本列表</p>

		<el-table :data="list" v-show="!searchedFlag" style="width: 100%" height="500">
			<el-table-column prop="name" label="产品名称"></el-table-column>
			<el-table-column prop="version" label="版本号"></el-table-column>
			<el-table-column prop="submitTime" label="提交时间" width="180"></el-table-column>
			<el-table-column prop="publishTime" label="发布时间" width="180"></el-table-column>
			<el-table-column prop="url" label="url" width="200"></el-table-column>
			<el-table-column prop="firm" label="设备厂商"></el-table-column>
			<el-table-column prop="type" label="型号"></el-table-column>
			<el-table-column prop="class" label="品类"></el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button @click="console.log(scope.row)" type="text">版本详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!--<div class="cp-searchResult" v-show="searchedFlag">
			<p class="btitle">支持的APP版本</p>
			<el-row class="cpsr-line" :gutter="20">
				<el-col :span="2" v-for="item in supportVersionList">
					<span>{{item}}</span>
				</el-col>
			</el-row>
			<p class="btitle">支持的子设备版本</p>
			<el-row  class="cpsr-line" :gutter="20">
				<el-col :span="4" v-for="item in suprrortChildList">
					<span>{{item}}</span>
				</el-col>
			</el-row>
		</div>-->

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
				<el-form-item label="版本包所在URL">
					 <el-input type="text" v-model="importForm.download_url_object" />
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
			list: [
				{
					name: '路由器',
					version: 'V1.2',
					submitTime: '2017-12-18 12:00:00',
					publishTime: '2017-12-18 12:00:00',
					url: 'https://www.baidu.com/',
					firm: '',
					type: '',
					class: ''
				}
			],
			supportVersionList: ["V1.0", "V1.1", "V1.2"],
			suprrortChildList: ["空调V1.0", "可视门铃V1.0", "电灯V1.1", "智能开关V1.1"],
			importBoxFlag: false,
			filterPopoverFlag: false,
			searchedFlag: false,

			importForm: {
				type: 1,
				system: '',
				version: '',
				release_tm: '',
				routers: [],
				products: [],
				download_url_object: '',
				brand_id: '',
				type_id: '',
				product_id: '',
			},
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

			subsetOptions: [
				{
					value: '1',
					label: '选项一'
				},
				{
					value: '2',
					label: '选项二'
				}
			],

			brandIDOptions: [
				{
					value: '1',
					label: '选项一'
				},
				{
					value: '2',
					label: '选项二'
				}
			],

			typeIDOptions: [
				{
					value: '1',
					label: '选项一'
				},
				{
					value: '2',
					label: '选项二'
				}
			],

			productIDOptions: [
				{
					value: '1',
					label: '选项一'
				},
				{
					value: '2',
					label: '选项二'
				}
			],
			
			
			filterForm: {
				platform: '',
				firm: '',
				app: '',
				child: '',
				router: '',
				self: ''
			},
			versionOptions: [
				{
					value: '1',
					label: '选项一'
				}
			],
			
			childOptions: [
				{
					value: '1',
					label: '选项一'
				},
				{
					value: '2',
					label: '选项二'
				}
			],
			platformOptions: [
				{
					value: '1',
					label: '选项一'
				}
			],
			firmOptions: [
				{
					value: '1',
					label: '选项一'
				}
			],
			appOptions: [
				{
					value: '1',
					label: '选项一'
				}
			],
			selfOptions: [
				{
					value: '1',
					label: '选项一'
				}
			],

		}
	},
	mounted () {

		this.$store.dispatch({
			type: namespace.INITAPP,
			token: this.token
		});
	},
	methods: {
		rowChosed (row, event) {
			console.log(row);
		}
	},
	components: {
		...mapGetters({
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