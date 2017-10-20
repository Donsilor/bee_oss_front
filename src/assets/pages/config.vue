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
						<label>设备厂商</label>
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
						<label>自设版本号</label>
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
						<el-button @click="searchedFlag = true; filterPopoverFlag = false" type="primary">查询</el-button>
					</el-col>
				</el-row>
			</div>
		</el-popover>
		<el-row type="flex" justify="space-between">
			<el-col :span="12">
				<el-button-group>
					<el-button @click="typeBoxFlag = true">录入</el-button>
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
		
		<div class="cp-searchResult" v-show="searchedFlag">
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
		</div>

		<el-dialog title="录入版本" :visible.sync="typeBoxFlag">
			<el-form :model="typeForm" ref="typeForm" label-width="8em">
				<el-form-item label="版本类型" >
					<el-row>
						<el-col :span="7">
							<el-select v-model="typeForm.terminal" placeholder="终端">
								<el-option
							      v-for="item in terminalOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="7" :offset="1">
							<el-select v-model="typeForm.os" placeholder="操作系统">
								<el-option
							      v-for="item in osOptions"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
							</el-select>
						</el-col>
						<el-col :span="8"  :offset="1">
							<el-select v-model="typeForm.version" placeholder="版本号">
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
					 <el-input type="text" v-model="typeForm.number" />
				</el-form-item>
				<el-form-item label="发布时间">
					 <el-date-picker
				      v-model="typeForm.publishTime"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item label="支持版本">
					<el-row>
						<el-col :span="11">
					 		<el-input type="text" v-model="typeForm.child" placeholder="子设备版本" />
					 	</el-col>
					 	<el-col :span="12"  :offset="1">
					 		<el-input type="text" v-model="typeForm.app" placeholder="APP版本" />
					 	</el-col>
					 </el-row>
				</el-form-item>
				<el-form-item label="版本包所在URL">
					 <el-input type="text" v-model="typeForm.url" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" native-type="submit">确定</el-button>
					<el-button @click="typeBoxFlag = false;">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		
	</div>
</template>
<script>

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
			typeBoxFlag: false,
			filterPopoverFlag: false,
			searchedFlag: false,
			terminalOptions: [
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
			versionOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			typeForm: {
				terminal: '',
				os: '',
				version: '',
				number: '',
				publishTime: '',
				child: '',
				app: '',
				url: ''
			},
			filterForm: {
				platform: '',
				firm: '',
				app: '',
				child: '',
				router: '',
				self: ''
			},
			platformOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			firmOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			appOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			childOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			routerOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],
			selfOptions: [
				{
					value: '1',
					lable: '选项一'
				}
			],

		}
	},
	mounted () {},
	methods: {
		rowChosed (row, event) {
			console.log(row);
		}
	},
	components: {
		
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